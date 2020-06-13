import withCors from '../../../backend/withCors.js';
import withAuth from '../../../backend/withAuth.js';
import withA0M from '../../../backend/withA0M.js';
import withStripe from '../../../backend/withStripe.js';

export default withCors(withAuth(withA0M(withStripe((req, res, stripe, A0M) => {
  if(req.method === 'GET') {
    A0M.getAppMetadata(req.user.sub, res, (error, body) => {
      if(error) {
        res.json({error, result: null});
      }
      else {
        stripe.invoices.list({customer: body.app_metadata.stripeId, ending_before: req.body.ending_before, limit: req.body.limit}, (error2, invoices) => {
          if(error2) {
            console.error("\n", error2, "\n");
            res.status(error2.statusCode || 500).json({error: error2, result: null});
          }
          else {
            invoices.data = invoices.data.filter((invoice) => invoice.billing_reason !== 'subscription_create');
            const promises = [];

            invoices.data.forEach((invoice) => {
              if(typeof invoice.charge === 'string') {
                promises.push(new Promise((resolve, reject) => {
                  stripe.charges.retrieve(invoice.charge, (error3, charge) => {
                    if(error3) {
                      reject(error3);
                    }
                    else {
                      invoice.charge  = charge;
                      resolve(charge);
                    }
                  });
                }));
              }

              invoice.lines.data.forEach((line) => {
                if(line.plan) {
                  promises.push(new Promise((resolve, reject) => {
                    stripe.products.retrieve(line.plan.product, (error3, product) => {
                      if(error3) {
                        if(error3.code === 'resource_missing') {
                          line.plan.product = null;
                          resolve();
                        }
                        else {
                          reject(error3);
                        }
                      }
                      else {
                        line.plan.product  = product;
                        resolve(product);
                      }
                    });
                  }));
                }
                if(line.subscription) {
                  promises.push(new Promise((resolve, reject) => {
                    stripe.subscriptions.retrieve(line.subscription, (error3, subscription) => {
                      if(error3) {
                        reject(error3);
                      }
                      else {
                        line.subscription  = subscription;
                        resolve(subscription);
                      }
                    });
                  }));
                }
              });
            });

            Promise.all(promises).then((result) => {
              console.log("[Stripe]", "Successfully fetched invoices of " + req.user.sub);
              res.json({error: null, result: invoices});
            }).catch((error3) => {
              console.error("\n", error3, "\n");
              res.status(error3.statusCode || 500).json({error: error3, result: null});
            });

          }
        });
      }
    });
  }
}))));
