import { Router } from 'express';
import { usersController } from './users.controller';
import { validate, authenticateToken } from '../middlewares';
import { createUserSchemaExpress } from '@infoshare-f3/schemas';

export const router = Router();

router.post(
  '/users',
  validate(createUserSchemaExpress),
  usersController.signUp
);
router.get('/users', usersController.getAll);
router.delete('/users/:userId', authenticateToken, usersController.delete)
