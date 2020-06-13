import withCors from '../../../backend/withCors.js';
import withAuth from '../../../backend/withAuth.js';
import withStripe from '../../../backend/withStripe.js';

export default withCors(withAuth(withStripe((req, res, stripe) => {
  if(req.method === 'GET') {
    stripe.products.list({}, (error, products) => {
      if(error) {
        console.error("\n", error, "\n");
        res.status(error.statusCode || 500).json({error, result: null});
      }
      else {
        console.log("[Stripe]", "Successfully retrieved products");
        const promises = products.data.map(async (product) => {
          product.plans = await new Promise((resolve2, reject2) => {
            stripe.plans.list({product: product.id}, (error2, plans) => {
              if(error2) {
                reject2(error2);
              }
              else {
                resolve2(plans);
              }
            });
          });
          product.plans = product.plans.data;
          return product;
        });

        Promise.all(promises).then((data) => {
          res.json({error: null, result: Object.assign(products, {data})});
        }).catch((error2) => {
          res.json({error: error2, result: null});
        });
      }
    });
  }
})));
