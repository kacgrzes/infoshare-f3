import * as jwt from 'jsonwebtoken';

export function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, 's3cr3t', (err: any, user: any) => {
    if (err) return res.sendStatus(403);

    req.user = user;

    next();
  });
}
