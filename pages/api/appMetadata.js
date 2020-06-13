import withCors from '../../backend/withCors.js';
import withAuth from '../../backend/withAuth.js';
import withA0M from '../../backend/withA0M.js';

export default withCors(withAuth(withA0M((req, res, A0M) => {
  if(req.method === 'PATCH') {
    if(req.user.scope && req.user.scope.includes('update:current_app_metadata')) {
      A0M.setAppMetadata(req.body.userId, req.body.app_metadata, res, (error, result) => {
        res.json({error, result});
      });
    }
    else {
      res.status(403).end();
    }
  }
})));
