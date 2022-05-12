import { Router, Request, Response } from 'express';
import { commentsController } from './comments.controller'

export const router = Router({
  mergeParams: true,
});

router.get('/', commentsController.getTweetComments);
router.post('/', commentsController.create);
router.delete('/:commentId', commentsController.delete)
