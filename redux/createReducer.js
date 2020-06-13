import Storage from '../Storage.js';


export default function createReducer() {
  const isBrowser = typeof window !== 'undefined' && ({}).toString.call(window) === '[object Window]'; // https://stackoverflow.com/a/38815760

  let useragent;
  let intersectionObserver = {observe: (element) => {return false;}};
  if(isBrowser) {
    const UAParser = require('ua-parser-js');
    useragent = new UAParser().getResult();

    // for lazy loading; reuse intersectionObserver
    // intersectionObserver = new IntersectionObserver((entries) => {
    //   entries.forEach((entry) => {
    //     if(entry.target.classList.contains('lazy') && entry.isIntersecting) {
    //       entry.target.classList.remove('lazy');
    //       Array.from(entry.target.children).forEach((child) => {
    //         if(child.tagName === 'SOURCE') {
    //           child.setAttribute('srcSet', child.dataset.src);
    //         }
    //         else if(child.tagName === 'IMG') {
    //           child.setAttribute('src', child.dataset.src);
    //         }
    //       });
    //     }
    //     // else if(entry.target.tagName === 'HEADER' && document.getElementById('Homepage').scrollHeight > 4000) {
    //     //   if(entry.intersectionRatio < 1) {
    //     //     document.getElementById('collapsedHeader').classList.toggle('show');
    //     //   }
    //     // }
    //   });
    // }, {});
  }

  let profile = {app_metadata: {hasSetup: true}, user_metadata: {}};
  try {
    profile = Object.assign(profile, JSON.parse(Storage.getItem('profile')));
  }
  catch(_) {}

  const userId = Storage.getItem('user_id');
  if(userId) {
    profile.user_id = userId;
  }

  const defaultState = {
    isBrowser,
    useragent,
    intersectionObserver,
    isTouch: typeof document !== 'undefined' && 'ontouchstart' in document.documentElement,
    scrollCallbacks: [],
    profile,
    users: [],
    chat: [],
    ads: [],
    events: [],
    ui: {} // do not remove; see Hint.jsx
  };

  return (state = defaultState, action) => {
    switch(action.type) {
      case 'SCROLL': {
        return Object.assign({}, state);
      }
      case 'ONSCROLL': {
        return Object.assign({}, state, {scrollCallbacks: state.scrollCallbacks.concat([action.cb])});
      }
      case 'SET_USER': {
        return Object.assign({}, state, {users: state.users.map((user) => {
          user = Object.assign({}, user);
          if(user.user_id === action.userId) {
            user = Object.assign(user, action.data);
          }
          return user;
        })});
      }
      case 'SET_USER_CHANNEL_THREADS': {
        return Object.assign({}, state, {users: state.users.map((user) => {
          user = Object.assign({}, user);
          if(user.user_id === action.userId) {
            user = Object.assign(user, {
              channels: user.channels.map(channel => Object.assign({}, channel, {threads: channel.id === action.channelId ? action.threads : channel.threads}))
            });
          }
          return user;
        })});
      }
      case 'SET_USER_CHANNEL_THREAD_MESSAGES': {
        return Object.assign({}, state, {users: state.users.map((user) => {
          user = Object.assign({}, user);
          if(user.user_id === action.userId) {
            const initial = !(((user.channels.find(channel => channel.id === action.channelId) || {threads: []}).threads).find((thread) => thread.id === action.threadId) || {}).messages;
            user = Object.assign(user, {
              channels: user.channels.map(channel => Object.assign({}, channel, {
                threads: (channel.threads || []).map(thread => Object.assign({}, thread, {
                  updatedAt: initial || thread.id !== action.threadId ? thread.updatedAt : new Date().getTime(),
                  messages: channel.id === action.channelId && thread.id === action.threadId ? action.messages : thread.messages
                }))
              }))
            });
          }
          return user;
        })});
      }
      case 'SET_CHANNEL_THREADS': {
        return Object.assign({}, state, {
          channels: state.channels.map(channel => Object.assign({}, channel, {threads: channel.id === action.channelId ? action.threads : channel.threads}))
        });
      }
      case 'SET_CHANNEL_MESSAGES': {
        return Object.assign({}, state, {
          channels: state.channels.map(channel => Object.assign({}, channel, {messages: channel.id === action.channelId ? action.messages : channel.messages}))
        });
      }
      case 'SET_CHANNEL_THREAD_MESSAGES': {
        const initial = !(((state.channels.find(channel => channel.id === action.channelId) || {threads: []}).threads).find((thread) => thread.id === action.threadId) || {}).messages;
        return Object.assign({}, state, {
          channels: state.channels.map(channel => Object.assign({}, channel, {
            threads: (channel.threads || []).map(thread => Object.assign({}, thread, {
              updatedAt: initial || thread.id !== action.threadId ? thread.updatedAt : new Date().getTime(),
              messages: channel.id === action.channelId && thread.id === action.threadId ? action.messages : thread.messages
            }))
          }))
        });
      }
      case 'SET_TODOS_TASKS': {
        const initial = (!state.todos.find((category) => category.id === action.categoryId) || {}).tasks;
        return Object.assign({}, state, {todos: state.todos.map((category) => Object.assign({}, category, {updatedAt: initial || category.id !== action.categoryId ? category.updatedAt : new Date().getTime(), tasks: category.id === action.categoryId ? action.tasks : category.tasks}))});
      }
      case 'SET_TODOS_TASK_ATTACHMENTS': {
        const initial = !((state.todos.find((category) => category.id === action.categoryId) || {tasks: []}).tasks.find((task) => task.id === action.taskId) || {}).attachments;
        return Object.assign({}, state, {
          todos: state.todos.map((category) => Object.assign({}, category, {
            updatedAt: initial || category.id !== action.categoryId ? category.updatedAt : new Date().getTime(),
            tasks: category.tasks.map((task) => Object.assign({}, task, {
              attachments: task.id === action.taskId ? action.attachments : task.attachments
            }))
          }))
        });
      }
      case 'UPDATE_TODOS_TASK': {
        const id = action.doc.id;
        const categoryId = action.doc.ref.parent.parent.id;
        const {description, dueAt, priority, title, threadId} = action.doc.data();
        return Object.assign({}, state, {
          todos: state.todos.map((category) => Object.assign({}, category, {
            tasks: (category.tasks || []).map((task) => Object.assign({}, task, category.id === categoryId && task.id === id ? {
              title,
              description,
              priority,
              dueAt,
              threadId
            } : {}))
          }))
        });
      }
      case 'SET': {
        let changedProfile = false;
        const iterate = (obj, original) => {
          const newObj = {};
          Object.keys(obj).forEach((key) => {
            if(key === 'profile') {
              changedProfile = true;
            }
            if(obj[key] && obj[key].constructor == Object && original[key]) {
              newObj[key] = iterate(obj[key], original[key]);
            }
            else {
              newObj[key] = obj[key];
            }
          });

          return Object.assign({}, original, newObj);
        };

        const newState = iterate(action.data, state);

        if(changedProfile) {
          Storage.setItem('profile', JSON.stringify(newState.profile));
        }

        return newState;
      }
      case 'ADD_BUSY_INTERVAL': {
        const busyData = (state.busyData || []).slice();
        busyData.push(action.data);
        return Object.assign({}, state, {busyData});
      }
      case 'ADD_PAYMENT_METHOD': {
        const paymentMethods = state.stripeCustomer.sources.data;
        paymentMethods.push(action.paymentMethod);

        return Object.assign({}, state, {stripeCustomer: Object.assign({}, state.stripeCustomer, {
          sources: Object.assign({}, state.stripeCustomer.sources, {
            data: paymentMethods,
            total_count: state.stripeCustomer.sources.total_count + 1
          }),
          default_source: paymentMethods.length === 1 ? action.paymentMethod.id : state.stripeCustomer.default_source
        })});
      }
      case 'ADD_SUBSCRIPTION': {
        const subscriptions = state.stripeCustomer.subscriptions.data;
        subscriptions.push(action.subscription);

        return Object.assign({}, state, {stripeCustomer: Object.assign({}, state.stripeCustomer, {
          subscriptions: Object.assign({}, state.stripeCustomer.subscriptions, {
            data: subscriptions,
            total_count: state.stripeCustomer.subscriptions.total_count + 1
          })
        })});
      }
      case 'UPDATE_PAYMENT_METHOD': {
        return Object.assign({}, state, {stripeCustomer: Object.assign({}, state.stripeCustomer, {
          sources: Object.assign({}, state.stripeCustomer.sources, {
            data: state.stripeCustomer.sources.data.map((method) => method.id === action.method.id ? action.method : method)
          })
        })});
      }
      case 'REMOVE_PAYMENT_METHOD': {
        const paymentMethods = state.stripeCustomer.sources.data.filter((method) => method.id !== action.id);
        return Object.assign({}, state, {stripeCustomer: Object.assign({}, state.stripeCustomer, {
          default_source: paymentMethods.length ? paymentMethods[0].id : null,
          sources: Object.assign({}, state.stripeCustomer.sources, {
            data: paymentMethods
          })
        })});
      }
      case 'REVOKE_REVERSAL': {
        const app_metadata = state.profile ? state.profile.app_metadata || {} : {};
        delete app_metadata.reversal;
        return Object.assign({}, state, {profile: Object.assign({}, state.profile || {}, {app_metadata})});
      }
      case 'FULLSCREEN': {
        let origin;
        if(action.element) {
          const {width, height} = action.element;
          const {top, left} = action.element.getBoundingClientRect();
          origin = (left + (width / 2)) + 'px ' + (top + (height / 2)) + 'px';
          action.element = action.element.cloneNode();
          action.element.classList.add('fullscreenElement');
        }
        return Object.assign({}, state, {fullscreenElement: action.element, fullscreenOrigin: origin || state.fullscreenOrigin});
      }
      default:
        return state;
    };
  }
}
