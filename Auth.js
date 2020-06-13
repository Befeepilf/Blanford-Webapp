import auth0 from 'auth0-js';
import Storage from './Storage.js';
import {getUser} from './API.js';
import Firebase from './Firebase.js';
import Stripe from './Stripe.js';

export default class Auth {
  constructor(Store) {
    this.webauth = new auth0.WebAuth({
      domain: 'auth.blanford.de',
      clientID: 'yIqCq4C1m1StLqWDIgDxmcJLG2fIX4Tq',
      redirectUri: process.env.NODE_ENV === 'production' ? `https://showcase.blanford.de/login` : 'http://127.0.0.1:3000/login',
      audience: 'marketing',
      responseType: 'token id_token',
      scope: 'read:users'
    });

    this.Store = Store;
    this.Store.dispatch({type: 'SET', data: {auth: this}});
    if(Store.getState().isBrowser && this.isAuthenticated()) {
      this.scheduleRenewSession(Storage.getItem('expires_at'));
      this.getUser().then();
      this.afterLogin();
    }
  }

  scheduleRenewSession(expiresAt) {
    const delay = expiresAt - new Date().getTime() - 60000; // do it one minute before expiration because rendering is faster than the process of renewing session
    console.log("[Auth]", "Renewing session at", new Date(new Date().getTime() + delay));
    this.renewSessionTimeout = setTimeout(() => {
      this.renewSession();
    }, delay);
  }

  renewSession() {
    console.log("[Auth]", "Renewing session...");
    this.webauth.checkSession({}, (error, result) => {
      if(error) {
        console.error("[Auth]", error);
      }
      else {
        this.setSession(result);
        console.log("[Auth]", "Session has been renewed.")
      }
    });
  }

  getItem(key) {
    const cookies = this.Store.getState().cookies;
    if(cookies) {
      return cookies[key];
    }
    else {
      return Storage.getItem(key);
    }
  }

  login() {
    this.webauth.authorize();
  }

  afterLogin() {
    const stripe = new Stripe(this.Store);
    stripe.getCustomer();
    stripe.getInvoices();
    stripe.getProducts();
  }

  clearSessionData() {
    Storage.removeItem('access_token');
    Storage.removeItem('id_token');
    Storage.removeItem('expires_at');
    Storage.removeItem('user_id');
    Storage.removeItem('firebase_access_token');
    Storage.removeItem('profile');
    Storage.removeItem('admin');
  }

  logout() {
    return new Promise((resolve, reject) => {
      clearTimeout(this.renewSessionTimeout);
      this.clearSessionData();
      resolve();
    });
  }

  getUser() {
    return new Promise((resolve, reject) => {
      if(this.Store.getState().cookies) {
        const profile = this.getItem('profile');
        this.Store.dispatch({type: 'SET', data: {profile}});
        resolve();
      }
      else {
        getUser((error, profile) => {
          console.warn(error)
          if(error) {
            reject(error);
          }
          else {
            this.Store.dispatch({type: 'SET', data: {profile}});
            Storage.setItem('profile', profile);
            resolve();
          }
        });
      }
    });
  }

  handleAuthentication(cb) {
    this.webauth.parseHash((error, result) => {
      if(error) {
        cb(error);
      }
      else if(result && result.accessToken && result.idToken) {
        this.setSession(result);
        this.afterLogin();
        this.getUser().then(() => {cb()}).catch(cb);
      }
    });
  }

  setSession(data) {
    const expiresAt = (data.expiresIn * 1000) + new Date().getTime();
    Storage.setItem('access_token', data.accessToken);
    Storage.setItem('id_token', data.idToken);
    Storage.setItem('expires_at', expiresAt);
    Storage.setItem('user_id', data.idTokenPayload.sub);
    Storage.setItem('firebase_access_token', data.idTokenPayload['https://firebase.access.token']);
    Storage.setItem('profile', data.idTokenPayload['https://auth0.profile']);
    Storage.setItem('admin', data.idTokenPayload['https://auth0.profile'].app_metadata.admin);

    this.Store.dispatch({type: 'SET', data: {profile: {user_id: data.idTokenPayload.sub}}});

    // when login create Firebase instance after the idToken has been received because it contains the firebase_access_token;
    // default redux state gets created before setSession() is called, therefore the firebase_access_token isn't available there when logging in
    // when refreshing the firebase_access_token will already be stored inside a cookie
    this.Store.getState().firebase.app.delete().then(() => {
      const firebase = new Firebase(data.idTokenPayload['https://firebase.access.token'], this.Store);
    });

    this.scheduleRenewSession(expiresAt);
  }

  isAuthenticated() {
    let isAuthenticated;
    try {
      const expiresAt = JSON.parse(this.getItem('expires_at'));
      isAuthenticated = new Date().getTime() < expiresAt;
    }
    catch(_) {
      isAuthenticated = false;
    }

    if(!isAuthenticated) {
      this.clearSessionData();
    }

    return isAuthenticated;
  }
}
