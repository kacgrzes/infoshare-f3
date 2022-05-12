import { Request, Response, NextFunction } from 'express';
import { AnyObjectSchema } from 'yup';
import * as jwt from 'jsonwebtoken';
import { User } from '@infoshare-f3/types'

export { json } from 'body-parser';
export * as cors from 'cors';

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, 's3cr3t', (err, user: User) => {
    if (err) return res.sendStatus(403);

    req.user = user;

    next();
  });
}

export const validate =
  (schema: AnyObjectSchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate({
        body: req.body,
        params: req.params,
        query: req.query,
      });
      next();
    } catch (error) {
      return res.status(400).json({
        errors: error.errors,
      });
    }
  };

export const delay = (ms: number) => (req: Request, res: Response, next: NextFunction) => {
  return setTimeout(next, ms)
}