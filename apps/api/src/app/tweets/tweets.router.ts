import { Router } from 'express';
import { tweetsController } from './tweets.controller';
import { authenticateToken } from '../middlewares';

export const router = Router();

router.get('/tweets', authenticateToken, tweetsController.getAll);
router.post('/tweets', authenticateToken, tweetsController.create);
