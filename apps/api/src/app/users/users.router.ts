import { Router } from 'express';
import { usersController } from './users.controller';

export const router = Router();

router.post('/users', usersController.signUp);
router.get('/users', usersController.getAll);
