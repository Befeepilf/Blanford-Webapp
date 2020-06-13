import withCors from '../../backend/withCors.js';
import withAuth from '../../backend/withAuth.js';
import withA0M from '../../backend/withA0M.js';
import withStripe from '../../backend/withStripe.js';

export default withCors(withAuth(withA0M(withStripe((req, res, stripe, A0M) => {
  if(req.method === 'PATCH') {
    A0M.getAppMetadata(req.user.sub, res, (error, body) => {
      if(error) {
        res.end(JSON.stringify({error, result: null}));
      }
      else {
        const stripePromises = [];
        if(req.body.name) {
          stripePromises.push(new Promise((resolve, reject) => {
            stripe.customers.update(body.app_metadata.stripeId, {name: req.body.name}, (error2, customer) => {
              if(error) {
                reject(error);
              }
              else {
                resolve();
              }
            });
          }));
        }
        if(req.body.address) {
          stripePromises.push(new Promise((resolve, reject) => {
            stripe.customers.update(body.app_metadata.stripeId, {address: req.body.address}, (error2, customer) => {
              if(error) {
                reject(error);
              }
              else {
                resolve();
              }
            });
          }));
        }
        if(req.body.phoneNumber) {
          stripePromises.push(new Promise((resolve, reject) => {
            stripe.customers.update(body.app_metadata.stripeId, {phone: req.body.phoneNumber}, (error2, customer) => {
              if(error) {
                reject(error);
              }
              else {
                resolve();
              }
            });
          }));
        }

        Promise.all(stripePromises).then(() => {
          A0M.setUserMetadata(req.user.sub, req.body, res, (error, result) => {
            res.end(JSON.stringify({error, result}));
          });
        }).catch((error2) => {
          console.error("[Stripe]", error2);
          res.end(JSON.stringify({error: error2, result: null}));
        });
      }
    });
  }
}))));
