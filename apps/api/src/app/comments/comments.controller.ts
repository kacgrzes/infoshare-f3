import { Request, Response } from 'express'
import { commentsService } from './comments.service'

export const commentsController = {
  getTweetComments: async (req: Request, res: Response) => {
    const comments = commentsService.getTweetComments(req.params.tweetId)

    res.status(200).json({
      comments,
    });
  },
  create: async (req: Request, res: Response) => {
    const tweetId = req.params.tweetId;
    const { text } = req.body;
    const authorId = req.user.id;
  
    const comment = await commentsService.create({ tweetId, authorId, text })
  
    return res.status(200).json(comment);
  },
  delete: async (req: Request, res: Response) => {
    const { user } = req
    const commentId = req.params.commentId;
  
    const comment = await commentsService.findUnique({ commentId })
    
    if (user.role === "user" && comment.authorId !== user.id) {
      return res.status(401).json({
        message: 'You are not the author of this comment',
      });
    }
  
    await commentsService.delete({ commentId })
  
    return res.status(200).json({
      message: 'Comment deleted',
    });
  }
}