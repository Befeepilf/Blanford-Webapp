const jwt = require('jsonwebtoken');
const jwks = require('jwks-rsa');

export default function withAuth(route) {
  return (req, res, ...props) => {
    const authHeader = req.headers.authorization ? req.headers.authorization.split(' ') : [];
    const accessToken = authHeader[0] === 'Bearer' ? authHeader[1] : req.cookies ? req.cookies.access_token : 'e30=';

    const jwksClient = jwks({
      caching: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: 'https://befeepilf.eu.auth0.com/.well-known/jwks.json'
    });

    jwksClient.getSigningKey(Buffer.from(accessToken, 'base64').toString().match(/"kid":"([\w\d]+)"/)[1], (error, key) => {
      if(error) {
        console.error("[JWT]", error);
        res.status(500).json({error: "The server couldn't verify your identity."});
      }
      else {
        jwt.verify(accessToken, key.publicKey || key.rsaPublicKey, {
          audience: 'marketing',
          issuer: 'https://auth.blanford.de/',
          algorithms: ['RS256']
        }, (error2, decoded) => {
          if(error2) {
            console.error("[JWT]", error2);
            res.status(401).json({error: error2});
          }
          else {
            req.user = decoded;
            route(req, res, ...props);
          }
        });
      }
    });
  };
};
