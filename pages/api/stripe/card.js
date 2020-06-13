import withCors from '../../../backend/withCors.js';
import withAuth from '../../../backend/withAuth.js';
import withA0M from '../../../backend/withA0M.js';
import withStripe from '../../../backend/withStripe.js';

export default withCors(withAuth(withA0M(withStripe((req, res, stripe, A0M) => {
  if(req.method === 'PATCH') {
    A0M.getAppMetadata(req.user.sub, res, (error, body) => {
      if(error) {
        res.end(JSON.stringify({error, result: null}));
      }
      else {
        const promises = [];

        if(Object.keys(req.body.payload).length) {
          promises.push(new Promise((resolve, reject) => {
            // stripe.customers.updateSource(body.app_metadata.stripeId, req.body.cardId, req.body.payload, (error2, card) => {
            //   if(error2) {
            //     reject(error2);
            //   }
            //   else {
            //     resolve(card);
            //   }
            // });

            stripe.paymentMethods.update(req.body.cardId, {card: req.body.card}, (error2, card) => {
              if(error2) {
                reject(error2);
              }
              else {
                resolve(card);
              }
            });
          }));
        }

        if(typeof req.body.makeDefault === 'boolean') {
          promises.push(new Promise((resolve, reject) => {
            stripe.customers.update(body.app_metadata.stripeId, {default_source: req.body.cardId}, (error2, customer) => {
              if(error2) {
                reject(error2);
              }
              else {
                resolve(customer);
              }
            });
          }));
        }

        Promise.all(promises).then((result) => {
          console.log("[Stripe]", `The source ${req.body.sourceId} of ${req.user.sub} has been successfully updated`);
          // if makeDefault = true and additional properties have been changed two promises will resolve. in this case return the customer object from second promise.
          // otherwise return whatever the single promise returns
          res.end(JSON.stringify({error: null, result: result.length === 2 ? result[1] : result[0]}));
        }).catch((error2) => {
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

          res.end(JSON.stringify({error: error2, result: null}));
        });
      }
    });
  }
  else if(req.method === 'DELETE') {
    A0M.getAppMetadata(req.user.sub, res, (error, body) => {
      if(error) {
        res.end(JSON.stringify({error, result: null}));
      }
      else {
        stripe.customers.deleteCard(body.app_metadata.stripeId, req.body.cardId, (error2, result) => {
          if(error2) {
            console.error("\n", error2, "\n");
            res.statusCode = error2.statusCode || 500;
          }
          else {
            console.log("[Stripe]", `Card ${req.body.cardId} has been successfully removed from ${req.user.sub}`);
          }
          res.end(JSON.stringify({error: error2, result}));
        });
      }
    });
  }
}))));
