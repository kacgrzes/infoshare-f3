import { Router } from 'express';
import { authController } from './auth.controller';

export const router = Router();

router.post('/auth/login', authController.login);
