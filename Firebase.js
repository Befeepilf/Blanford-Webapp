import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import * as Sentry from '@sentry/browser';
import Storage from './Storage.js';
import {objectType} from './Util.js';

export default class Firebase {
  constructor(accessToken, Store) {
    this.config = {
      apiKey: 'AIzaSyB3WwTssoZ5vK3RQfVc9aiQjp3OV5JAQlg',
      authDomain: 'blanford-76441.firebaseapp.com',
      databaseURL: 'https://blanford-76441.firebaseio.com',
      projectId: 'blanford-76441',
      storageBucket: 'blanford-76441.appspot.com',
      messagingSenderId: '336532328980',
      appId: '1:336532328980:web:4179a82b18c75bf6'
    };
    this.accessToken = accessToken || Storage.getItem('firebase_access_token');
    this.unsubscriptions = {};

    this.Store = Store;
    this.Store.dispatch({type: 'SET', data: {firebase: this}});

    // prevent duplicated app creation during development due to HOT reloading
    try {
      firebase.app();
    }
    catch(_) {
      this.app = firebase.initializeApp(this.config);
    }

    this.login();
  }

  logout() {
    this.loggedIn = false;
    Object.keys(this.unsubscriptions).forEach((key) => {
      if(objectType(this.unsubscriptions[key]) === 'array') {
        this.unsubscriptions[key].forEach((obj) => {
          obj.unsubscribeTextData();
          obj.unsubscribeChartData();
        });
      }
      else {
        this.unsubscriptions[key]();
      }
    });
    this.unsubscriptions = {};
    return firebase.auth().signOut();
  }


  isAuthenticated() {
    try {
      const expiresAt = JSON.parse(Storage.getItem('expires_at'));
      return new Date().getTime() < expiresAt;
    }
    catch(_) {
      return false;
    }
  }

  login() {
    const isAuthenticated = this.isAuthenticated();
    const isUser = this.accessToken && isAuthenticated;
    const signInPromise = isUser ? firebase.auth().signInWithCustomToken(this.accessToken) : firebase.auth().signInAnonymously();
    signInPromise.then(() => {
      this.loggedIn = true;
      this.firestore = firebase.firestore();
      this.firestorage = firebase.storage();

      this.subscribeAll(isUser);
      this.Store.dispatch({type: 'SET', data: {firestore: this.firestore, firestorage: this.firestorage}});
    }).catch((error) => {
      // if app is deleted a new login process was initiated (see Auth.js)
      if(error.message !== 'app-deleted') {
        this.Store.dispatch({type: 'SET', data: {firestore: null, firestorage: null}}); // important for loading indicators
        Sentry.captureException(error);
        console.error("[Firebase]", error);
      }
    });
  }

  subscribe(id, c, i = 0, parentDocs = []) {
    let s = this.firestore.collection(c.slice(0, i + 1).map(entry => entry.path).reduce((a, b) => a + '/' + b));

    if(c[i].where) {
      s = s.where(...c[i].where);
    }
    if(c[i].orderBy) {
      s = s.orderBy(...c[i].orderBy);
    }

    this.unsubscriptions[id] = s.onSnapshot(snapshot => {
      if(c[i].stopOnChangeType ? snapshot.docChanges().every((change) => c[i].stopOnChangeType.indexOf(change.type) === -1) : true) {
        const docs = [];
        snapshot.docs.map(doc => {
          doc = Object.assign(doc.data(), {id: doc.id});
          if(typeof c[i].includeDoc === 'function' ? c[i].includeDoc(doc) : true) {
            if(i < c.length - 1) {
              const newC = [];
              c.forEach((entry, j) => {
                if(!(j === i + 1 && entry.skipIf && entry.skipIf(doc))) {
                  newC.push(Object.assign({}, entry, {path: entry.path + (j === i ? '/' + doc.id : '')}));
                }
              });

              this.subscribe(id, newC, i + 1, parentDocs.concat([doc]));
            }
            docs.push(doc);
          }
        });
        this.Store.dispatch(typeof c[i].getDispatchObj === 'function' ? c[i].getDispatchObj(parentDocs, docs) : {type: 'SET', data: {[id]: docs}});
      }
      else if(typeof c[i].onStop === 'function') {
        c[i].onStop(snapshot.docChanges());
      }
    }, (error) => {
      Sentry.captureException(error);
      console.error(`[Firebase.${id}]`, error);
    });
  }

  subscribeAll(isUser) {
    const snapshotErrorHandler = (type, fbError) => {
      Sentry.captureException(fbError);
      console.error(`[Firebase.${type}]`, fbError);
    };

    this.subscribe('blogArticles', [{
      path: 'blogArticles',
      where: ['visibility', '==', 'public'],
      orderBy: ['timestamp', 'desc'],
      includeDoc: (doc) => objectType(doc.content) === 'array' && doc.content.length && objectType(doc.content[0].content) === 'array' && doc.content[0].content.length
    }]);

    if(isUser) {
      if(Storage.getItem('admin') !== 'undefined') {
        this.subscribe('betaProgramInvitationList', [{path: 'betaProgramInvitationList'}]);

        let currentState;
        const unsubscribeRedux = this.Store.subscribe(() => {
          const prevState = currentState || {users: []};
          currentState = this.Store.getState();
          if(prevState.users.length !== currentState.users.length) {
            unsubscribeRedux();
            currentState.users.forEach((user) => {
              [
                ['answers'],
                ['images'],
                ['events'],
                ['funnel', ['stepNumber']]
              ].forEach(entry => {
                this.subscribe(entry[0], [Object.assign({
                  path: 'users/' + user.user_id + '/' + entry[0],
                  getDispatchObj: (_, docs) => ({type: 'SET_USER', userId: user.user_id, data: {[entry[0]]: docs}})
                }, entry[1] ? {orderBy: entry[1]} : {})]);
              });

              this.subscribe('channels', [
                {path: 'users/' + user.user_id + '/channels', getDispatchObj: (_, channels) => ({
                  type: 'SET_USER',
                  userId: user.user_id,
                  data: {channels},
                })},
                {path: 'threads', orderBy: ['updatedAt'], stopOnChangeType: ['modified'], getDispatchObj: (parentDocs, threads) => ({
                  type: 'SET_USER_CHANNEL_THREADS',
                  userId: user.user_id,
                  channelId: parentDocs[0].id,
                  threads
                })},
                {path: 'messages', orderBy: ['timestamp'], getDispatchObj: (parentDocs, messages) => ({
                  type: 'SET_USER_CHANNEL_THREAD_MESSAGES',
                  userId: user.user_id,
                  channelId: parentDocs[0].id,
                  threadId: parentDocs[1].id,
                  messages
                })}
              ]);
            });
          }
        });
      }

      this.subscribe('channels', [
        {path: 'users/' + Storage.getItem('user_id') + '/channels'},
        {path: 'threads', skipIf: channel => !channel.hasThreads, orderBy: ['updatedAt', 'desc'], stopOnChangeType: ['modified'], getDispatchObj: (parentDocs, threads) => ({type: 'SET_CHANNEL_THREADS', channelId: parentDocs[0].id, threads})},
        {path: 'messages', orderBy: ['timestamp'], getDispatchObj: (parentDocs, messages) => {
          if(parentDocs.length === 2) {
            return {type: 'SET_CHANNEL_THREAD_MESSAGES', channelId: parentDocs[0].id, threadId: parentDocs[1].id, messages};
          }
          return {type: 'SET_CHANNEL_MESSAGES', channelId: parentDocs[0].id, messages}
        }}
      ]);

      this.subscribe('todos', [
        {path: 'users/' + Storage.getItem('user_id') + '/todos', orderBy: ['updatedAt']},
        {
          path: 'tasks',
          orderBy: ['createdAt'],
          stopOnChangeType: ['modified'],
          onStop: (docChanges) => {docChanges.forEach(change => this.Store.dispatch({type: 'UPDATE_TODOS_TASK', doc: change.doc}))},
          getDispatchObj: (parentDocs, tasks) => ({type: 'SET_TODOS_TASKS', categoryId: parentDocs[0].id, tasks})
        },
        {path: 'attachments', getDispatchObj: (parentDocs, attachments) => ({type: 'SET_TODOS_TASK_ATTACHMENTS', categoryId: parentDocs[0].id, taskId: parentDocs[1].id, attachments})}
      ]);

      [
        ['funnel', ['stepNumber']],
        ['ads', ['timestamp']],
        ['images', ['timestamp', 'desc']],
        ['events', ['timestamp']]
      ].forEach(entry => {
        this.subscribe(entry[0], [{path: 'users/' + Storage.getItem('user_id') + '/' + entry[0], orderBy: entry[1]}]);
      });

      this.subscribe('answers', [{
        path: 'users/' + Storage.getItem('user_id') + '/answers',
        getDispatchObj: (_, answers) => ({type: 'SET', data: {answers}})
      }]);

      this.subscribe('busyData', [{path: 'busyData'}]);

      this.subscribe('appointments', [{path: 'appointments', where: ['uid', '==', Storage.getItem('user_id')], getDispatchObj: (_, appointments) => ({type: 'SET', data: {appointments}})}]);
    }
  }
}
