import withCors from '../../backend/withCors.js';
import withAuth from '../../backend/withAuth.js';
import withA0M from '../../backend/withA0M.js';

export default withCors(withAuth(withA0M((req, res, A0M) => {
  if(req.method === 'PATCH') {
    let error;
    if(typeof req.body.email === 'string') {
      if(req.body.email.match(/.+@.+\.\w+/i)) {
        A0M.getEmail(req.user.sub, res, (error0, result0) => {
          if(error) {
            res.json({error: error0, result: result0});
          }
          else {
            A0M.request({url: '/users/' + req.user.sub, method: 'PATCH', json: true, body: {
              email: req.body.email,
              connection: 'Marketing-Users',
              client_id: A0M.clientId,
              app_metadata: {oldEmail: result0.email, changedEmailAt: new Date().getTime()}}
            }, res, (error1, result1) => {
              if(error1) {
                res.json({error: error1, result: result1});
              }
              else {
                const promises = [];

                promises.push(new Promise((resolve, reject) => {
                  A0M.request({url: '/jobs/verification-email', method: 'POST', json: true, body: {user_id: req.user.sub, client_id: A0M.clientId}}, res, (error2, result2) => {
                    if(error2) {
                      reject(error2);
                    }
                    else {
                      resolve();
                    }
                  });
                }));

                promises.push(new Promise((resolve, reject) => {
                  stripe.customers.update(result1.app_metadata.stripeId, {email: result1.email}, (error2, customer) => {
                    if(error2) {
                      console.error("[Stripe]", error2);
                      reject(error2);
                    }
                    else {
                      resolve();
                    }
                  });
                }));

                Promise.all(promises).then(() => {
                  res.json({error: null, result: null});
                }).catch((error2) => {
                  res.json({error: error2, result: null});
                });
              }
            });
          }
        });
      }
      else {
        res.status(400).json({error: "Invalid format of the email address", result: null});
      }
    }
    else {
      res.status(400).json({error: "Please provide an email address inside the body", result: null});
    }
  }
})));
