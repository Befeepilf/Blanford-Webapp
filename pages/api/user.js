import withCors from '../../backend/withCors.js';
import withAuth from '../../backend/withAuth.js';
import withA0M from '../../backend/withA0M.js';

export default withCors(withAuth(withA0M((req, res, A0M) => {
  if(req.method === 'GET') {
    A0M.getUser(req.user.sub, res, (error, result) => {
      res.json({error, result});
    });
  }
})));
