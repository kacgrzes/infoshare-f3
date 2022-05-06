import { Router } from 'express';
import { tweetsController } from './tweets.controller';
import { authenticateToken, validate } from '../middlewares';
import { router as commentsRouter } from '../comments';
import { createTweetSchemaExpress } from '@infoshare-f3/schemas';

export const router = Router();

router.get('/tweets', authenticateToken, tweetsController.getAll);
router.post(
  '/tweets',
  authenticateToken,
  validate(createTweetSchemaExpress),
  tweetsController.create
);
router.use('/tweets/:tweetId/comments', authenticateToken, commentsRouter);
router.post('/tweets/:tweetId/likes', authenticateToken, tweetsController.like);
router.delete(
  '/tweets/:tweetId/likes',
  authenticateToken,
  tweetsController.unlike
);
