import * as Sentry from '@sentry/browser';
import Storage from './Storage.js';

function request(endpoint, method, options, cb) {
  require('request')(Object.assign({
    url: window.location.origin + '/api' + endpoint,
    method,
    auth: {
      bearer: Storage.getItem('access_token')
    }
  }, options), (error, response, body) => {
    let result;
    if(typeof body === 'string') {
      try {
        body = JSON.parse(body);
      }
      catch(exception) {
        error = body;
      }
    }

    result = body && Object.keys(body).indexOf('result') !== -1 ? body.result : body;


    if(!error && body && body.error) {
      error = body.error;
    }

    if(!error && response.statusCode !== 200) {
      error = "Unbekannt";
    }

    if(error) {
      try {
        error = JSON.parse(error);
      }
      catch(_) {}

      Sentry.captureException(error);
      console.error("[API]", endpoint, error);
    }
    if(cb) {
      cb(error, result);
    }
  });
}

function sendEmail(address, subject, body, cb) {
  request('/email', 'POST', {json: true, body: {address, subject, body}}, cb);
}

function getUser(cb) {
  request('/user', 'GET', {json: true}, cb);
}

function getUsers(cb) {
  request('/users', 'GET', {json: true}, cb);
}

function patchUserMetadata(body, cb) {
  request('/userMetadata', 'PATCH', {json: true, body}, cb);
}

export {request, sendEmail, getUser, getUsers, patchUserMetadata};
