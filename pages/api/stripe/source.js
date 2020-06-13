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
        stripe.customers.createSource(body.app_metadata.stripeId, {source: req.body.sourceId}, (error2, source) => {
          if(error2) {
            console.error("\n", error2, "\n");
            res.statusCode = error2.statusCode || 500;

            if(error2.code === 'card_declined') {
              const c = error2.raw ? error2.raw.decline_code : null;
              // see: https://stripe.com/docs/declines/codes
              // do not give user information if a card was reported stolen, lost or blacklisted
              // affected codes:
              // stolen_card, merchant_blacklist, lost_card, fraudulent, restricted_card, pickup_card
              if(c === 'stolen_card' || c === 'merchant_blacklist' || c === 'lost_card' || c === 'fraudulent' || c === 'restricted_card' || c === 'pickup_card') {
                error2.raw.decline_code = 'generic_decline';
              }
            }
          }
          else {
            console.log("[Stripe]", "A payment method has been successfully added to " + req.user.sub);
          }

          res.end(JSON.stringify({error: error2, result: source}));
        });
      }
    });
  }
}))));
