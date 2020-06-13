import Auth0Management from './Auth0Management.js';
const A0M = new Auth0Management(process.env.AUTH0_MANAGEMENT_ID, process.env.AUTH0_MANAGEMENT_SECRET);

export default function withA0M(route) {
  return (req, res, ...props) => {
    route(req, res, A0M, ...props);
  }
};
