import withCors from '../../backend/withCors.js';
import withAuth from '../../backend/withAuth.js';
import withA0M from '../../backend/withA0M.js';

export default withCors(withAuth(withA0M((req, res, A0M) => {
  if(req.method === 'POST') {
    A0M.setAppMetadata(req.user.sub, {hideWelcomeDialog: true}, res, (error, result) => {
      res.json({error, result});
    });
  }
})));
