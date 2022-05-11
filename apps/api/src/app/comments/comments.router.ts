import { Router, Request, Response } from 'express';
import { prisma } from '../prisma';

export const router = Router({
  mergeParams: true,
});

router.get('/', async (req: Request, res: Response) => {
  const comments = await prisma.comment.findMany({
    include: {
      author: {
        select: {
          id: true,
          username: true,
          profileImageUrl: true,
          name: true,
        },
      },
    },
    where: {
      tweetId: req.params.tweetId,
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
  res.status(200).json({
    comments,
  });
});

router.post('/', async (req: Request, res: Response) => {
  const tweetId = req.params.tweetId;
  const { text } = req.body;
  const author = req.user;

  const comment = await prisma.comment.create({
    data: {
      text,
      tweetId,
      authorId: author.id,
    },
    select: {
      createdAt: true,
      id: true,
      text: true,
      tweetId: true,
      authorId: true,
    },
  });

  return res.status(200).json(comment);
});

router.delete('/:commentId', async (req: Request, res: Response) => {
  const { user } = req
  const commentId = req.params.commentId;

  const comment = await prisma.comment.findUnique({
    where: {
      id: commentId,
    },
    select: {
      authorId: true,
    },
  })
  
  if (user.role === "user" && comment.authorId !== user.id) {
    return res.status(401).json({
      message: 'You are not the author of this comment',
    });
  }

  await prisma.comment.delete({
    where: {
      id: commentId
    }
  })

  return res.status(200).json({
    message: 'Comment deleted',
  });
})
