import withCors from '../../../backend/withCors.js';
import withAuth from '../../../backend/withAuth.js';
import withA0M from '../../../backend/withA0M.js';
import withStripe from '../../../backend/withStripe.js';

export default withCors(withAuth(withA0M(withStripe((req, res, stripe, A0M) => {
  if(req.method === 'POST') {
    A0M.getAppMetadata(req.user.sub, res, (error, body) => {
      if(error) {
        res.end(JSON.stringify({error, result: null}));
      }
      else {
        stripe.subscriptions.create({customer: body.app_metadata.stripeId, items: [{plan: body.app_metadata.defaultPlans[req.body.productId]}]}, (error2, subscription) => {
          if(error2) {
            console.error("\n", error2, "\n");
            res.statusCode = error2.statusCode || 500;
            res.end(JSON.stringify({error: error2, result: null}));
          }
          else {
            if(body.app_metadata.defaultPlans[req.body.productId] === 'plan_F4WWyow8u0KJdi') {
              (async function() {
                await new Promise((resolve, reject) => {
                  A0M.setAppMetadata(req.user.sub, {isBetaTester: true}, res, (error3, body2) => {
                    resolve();
                  });
                });
              }())
            }
            stripe.products.retrieve(subscription.plan.product, (error3, product) => {
              if(error3) {
                console.error("\n", error3, "\n");
                res.statusCode = error3.statusCode || 500;
              }
              else {
                subscription.plan.product = product;
              }
              res.end(JSON.stringify({error: error3, result: subscription}));
              console.log("[Stripe]", `A subscription of plan ${req.body.planId} has been successfully created for ${req.user.sub}`);
            });
          }
        });
      }
    });
  }
}))));
