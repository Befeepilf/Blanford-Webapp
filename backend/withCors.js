import Cors from 'micro-cors';

const cors = Cors({
  allowedMethods: ['GET', 'POST', 'PATCH'],
  origin: 'https://showcase.blanford.de'
});

export default function withCors(route) {
  return cors(route);
};
