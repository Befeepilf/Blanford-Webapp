const stripe = require('stripe')(process.env.STRIPE_SECRET);

export default function withStripe(route) {
  return (req, res, ...props) => {
    route(req, res, stripe, ...props);
  }
}
