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
        stripe.customers.retrieve(body.app_metadata.stripeId, (error2, customer) => {
          if(error2) {
            console.error("\n", error2, "\n");
            res.status(error2.statusCode || 500).json({error: error2, result: null});
          }
          else {
            Promise.all((customer.subscriptions ? customer.subscriptions.data : []).map((subscription) => new Promise((resolve, reject) => {
              stripe.products.retrieve(subscription.plan.product, (error3, product) => {
                if(error3) {
                  reject(error3);
                }
                else {
                  subscription.plan.product = product;
                  resolve(product);
                }
              });
            }))).then((products) => {
              console.log("[Stripe]", "Successfully fetched customer data of " + req.user.sub);
              res.json({error: null, result: customer});
            }).catch((error3) => {
              console.error("\n", error3, "\n");
              res.status(error3.statusCode || 500).json({error: error3, result: null});
            })
          }
        });
      }
    });
  }
}))));
