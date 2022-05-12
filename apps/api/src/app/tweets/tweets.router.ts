import { Router } from 'express';
import { tweetsController } from './tweets.controller';
import { validate } from '../middlewares';
import { router as commentsRouter } from '../comments';
import { createTweetSchemaExpress } from '@infoshare-f3/schemas';

export const router = Router();

router.get('/tweets', tweetsController.getAll);
router.post(
  '/tweets',
  validate(createTweetSchemaExpress),
  tweetsController.create
);
router.delete('/tweets/:tweetId', tweetsController.delete);
router.use('/tweets/:tweetId/comments', commentsRouter);
router.post('/tweets/:tweetId/likes', tweetsController.like);
router.delete('/tweets/:tweetId/likes', tweetsController.unlike);
