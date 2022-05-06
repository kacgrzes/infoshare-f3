import { Request, Response } from 'express';
import { prisma } from '../prisma';

export const tweetsController = {
  getAll: async (req: Request, res: Response) => {
    const { page = '1' } = req.query;
    const parsedPage = Number(page);
    const tweets = await prisma.tweet.findMany({
      take: 10,
      skip: (parsedPage - 1) * 10,
      include: {
        likedBy: {
          select: {
            id: true,
            userId: true,
          },
        },
        author: {
          select: {
            id: true,
            username: true,
            profileImageUrl: true,
          },
        },
        comments: {
          select: {
            id: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return res.status(200).json({
      tweets: tweets.map((tweet) => {
        const { author, id, createdAt, text } = tweet;
        return {
          author,
          id,
          createdAt,
          text,
          liked: Boolean(
            tweet.likedBy.find((liked) => liked.userId === req.user.id)
          ),
          likedCount: tweet.likedBy.length,
          replyCount: tweet.comments.length,
        };
      }),
    });
  },
  create: async (req: Request, res: Response) => {
    const { text } = req.body;
    const newTweet = await prisma.tweet.create({
      data: {
        text,
        authorId: req.user.id,
      },
    });
    return res.status(200).json(newTweet);
  },
  like: async (req: Request, res: Response) => {
    const tweetId = req.params.tweetId;
    const userId = req.user.id;

    await prisma.like.upsert({
      create: {
        userId,
        tweetId,
      },
      update: {
        tweetId,
        userId,
      },
      where: {
        likeId: {
          tweetId,
          userId,
        },
      },
    });
    const tweet = await prisma.tweet.findUnique({
      where: {
        id: tweetId,
      },
      include: {
        likedBy: {
          select: {
            id: true,
          },
        },
      },
    });
    return res.status(200).json({
      tweet,
    });
  },
  unlike: async (req: Request, res: Response) => {
    const tweetId = req.params.tweetId;
    const userId = req.user.id;

    try {
      await prisma.like.delete({
        where: {
          likeId: {
            tweetId,
            userId,
          },
        },
      });
    } catch (err) {
      // console.log(JSON.stringify(err.meta.cause));
    }

    return res.status(200).json({
      message: 'Tweet unliked',
    });
  },
};
