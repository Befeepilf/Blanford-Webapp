// TODO: edit node_modules/auth0-js/src/helper/storage/handler.js line 6 to prevent error thrown by chrome when localStorage is disabled
import Cookies from 'js-cookie';

export default {
  getType() {
    if(typeof window !== 'undefined' && ({}).toString.call(window) === '[object Window]') {
      // try {
      //   localStorage.setItem('test', 0);
      //   localStorage.removeItem('test', 0);
      //   return 'localStorage';
      // }
      // catch(error) {
      //   try {
      //     sessionStorage.setItem('test', 0);
      //     sessionStorage.removeItem('test');
      //     return 'sessionStorage';
      //   }
      //   catch(error2) {
      //     // try {
      //     //   const indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;
      //     //   console.log(indexedDB)
      //     //   this.type = 'indexedDB'
      //     // }
      //     // catch(error3) {
      //
      //     return 'cookie';
      //     //}
      //   }
      // }
      return 'cookie';
    }
    else {
      return null;
    }
  },

  setItem(name, content) {
    const type = this.getType();
    if(type === 'localStorage') {
      localStorage.setItem(name, content);
    }
    else if(type === 'sessionStorage') {
      sessionStorage.setItem(name, content);
    }
    else if(type === 'cookie') {
      Cookies.set(name, content);
    }
  },
  removeItem(name) {
    const type = this.getType();
    if(type === 'localStorage') {
      localStorage.removeItem(name);
    }
    else if(type === 'sessionStorage') {
      sessionStorage.removeItem(name);
    }
    else if(type === 'cookie') {
      Cookies.remove(name);
    }
  },

  getItem(name) {
    const type = this.getType();
    if(type === 'localStorage') {
      return localStorage.getItem(name);
    }
    else if(type === 'sessionStorage') {
      return sessionStorage.getItem(name);
    }
    else if(type === 'cookie') {
      return Cookies.get(name);
    }
    else {
      return undefined;
    }
  }
};