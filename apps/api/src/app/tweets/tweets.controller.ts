import { Request, Response } from 'express';
import { prisma } from '../prisma';

export const tweetsController = {
  getAll: async (req: Request, res: Response) => {
    const { page = '1' } = req.query;
    const parsedPage = Number(page);
    const tweets = await prisma.tweet.findMany({
      take: 10,
      skip: (parsedPage - 1) * 10,
    });
    return res.status(200).json({
      tweets,
    });
  },
  create: async (req: Request, res: Response) => {
    const { text } = req.body;
    const newTweet = await prisma.tweet.create({
      data: {
        text,
        userId: req.user.id,
      },
    });
    res.status(200).json(newTweet);
  },
};
