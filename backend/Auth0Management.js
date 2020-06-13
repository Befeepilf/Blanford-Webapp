let clientSecret;
export default class Auth0Management {
  constructor(clientId, _clientSecret) {
    this.clientId = clientId;
    clientSecret = _clientSecret;
    this.baseUrl = 'https://befeepilf.eu.auth0.com';
    this.req = require('request').defaults({baseUrl: this.baseUrl});
    this.logTag = "[Auth0Management]";
    this.requests = []; // queue requests if currently an accessToken renewal process is taking place
    this.ready = false;
    this.renewingAccessToken = false;
    this.getAccessToken();
  }

  log(...msgs) {
    console.log(this.logTag, ...msgs);
  }

  error(...msgs) {
    console.error(this.logTag, ...msgs);
  }

  getAccessToken() {
    this.renewingAccessToken = true;
    this.log("Getting new accessToken...");
    this.req({
      url: '/oauth/token',
      method: 'POST',
      json: true,
      body: {
        grant_type: 'client_credentials',
        client_id: this.clientId,
        client_secret: clientSecret,
        audience: this.baseUrl + '/api/v2/'
      }
    }, (error, response, body) => {
      const defaultError = "Error getting accessToken";
      if(error) {
        this.error(defaultError, error);
        setTimeout(() => {
          this.ready = false;
          this.getAccessToken();
        }, 2000);
      }
      else if(response && response.statusCode !== 200) {
        this.error(defaultError, "Statuscode:", response.statusCode);
        setTimeout(() => {
          this.ready = false;
          this.getAccessToken();
        }, 2000);
      }
      else if(body && body.access_token && body.expires_in && body.token_type === 'Bearer') {
        this.accessToken = body.access_token;
        const expiresIn = body.expires_in * 1000
        this.expiresAt = expiresIn + new Date().getTime();
        setTimeout(() => {
          this.ready = false;
          this.getAccessToken();
        }, expiresIn);
        this.ready = true;

        // process queue
        for(let req of this.requests) {
          this.request(req.options, req.res, req.cb);
        }
      }
      else {
        this.log(defaultError);
      }
      this.renewingAccessToken = false;
    });
  }

  getUser(userId, res, cb) {
    this.request({
      url: '/users/' + userId,
      method: 'GET',
      json: true,
      qs: {fields: 'app_metadata,created_at,email,email_verified,logins_count,user_id,user_metadata'}
    }, res, cb);
  }

  getEmail(userId, res, cb) {
    this.request({
      url: '/users/' + userId,
      method: 'GET',
      qs: {fields: 'email'}
    }, res, cb);
  }

  getUserMetadata(userId, res, cb) {
    this.request({
      url: '/users/' + userId,
      method: 'GET',
      qs: {fields: 'user_metadata'}
    }, res, (error, body) => {cb(error, body ? Object.assign(body, {user_metadata: body.user_metadata || {}}) : null)});
  }

  setUserMetadata(userId, user_metadata, res, cb) {
    this.request({
      url: '/users/' + userId,
      method: 'PATCH',
      json: true,
      body: {user_metadata}
    }, res, cb);
  }

  getAppMetadata(userId, res, cb) {
    this.request({
      url: '/users/' + userId,
      method: 'GET',
      qs: {fields: 'app_metadata'}
    }, res, (error, body) => {cb(error, body ? Object.assign(body, {app_metadata: body.app_metadata || {}}) : null)});
  }

  setAppMetadata(userId, app_metadata, res, cb) {
    this.request({
      url: '/users/' + userId,
      method: 'PATCH',
      json: true,
      body: {app_metadata}
    }, res, cb);
  }

  request(options, res, cb) {
    if(this.ready && this.accessToken) {
      this.req(Object.assign(Object.assign({}, options, {url: '/api/v2' + options.url}), {auth: {bearer: this.accessToken}}), (error, response, body) => {
        const defaultLog = options.method + " request to /api/v2" + options.url;
        if(typeof body === 'string') {
          try {
            body = JSON.parse(body);
          }
          catch(_) {}
        }

        if(error) {
          this.error(defaultLog, error);
        }
        else if(response && response.statusCode >= 400) {
          error = body || {statusCode: response.statusCode};
          body = null;
          this.error(defaultLog, error);
        }
        else if(body && body.statusCode && body.statusCode >= 400) {
          error = body;
          body = null;
          this.error(defaultLog, error);
        }
        else {
          this.log(defaultLog, "successful");
        }

        if(error && error.statusCode && res) {
          res.statusCode = error.statusCode;
        }

        if(typeof cb === 'function') {
          cb(error, body);
        }
      });
    }
    else {
      this.log("Adding to queue...");
      this.requests.push({options, res, cb});
      if(this.renwingAccessToken) {
        this.error("Class not ready. Renewing accessToken...");
      }
      else if(this.acessToken) {
        this.error("Class not ready. The accessToken has expired.");
      }
      else {
        this.error("Class not ready. No accessToken.");
      }
    }
  }
}
