import { Router } from 'express';
import { usersController } from './users.controller';
import { validate, authenticate } from '../middlewares';
import { createUserSchemaExpress } from '@infoshare-f3/schemas';

export const router = Router();

router.post(
  '/users',
  validate(createUserSchemaExpress),
  usersController.signUp
);
router.get('/users', authenticate, usersController.getAll);
router.delete('/users/:userId', authenticate, usersController.delete);
