import { Request, Response } from 'express';
import { tweetsService } from './tweets.service';

export const tweetsController = {
  getAll: async (req: Request, res: Response) => {
    const { page = '1' } = req.query;
    const parsedPage = Number(page);

    const tweets = await tweetsService.getPage(parsedPage, req.user);

    return res.status(200).json({
      tweets,
    });
  },
  delete: async (req: Request, res: Response) => {
    const { tweetId } = req.params;
    const { user } = req;
    const tweet = await tweetsService.findUnique(tweetId);

    if (user.role === 'user' && tweet.authorId !== user.id) {
      return res.status(401).json({
        message: 'You are not the author of this tweet',
      });
    }

    await tweetsService.delete(tweetId);

    return res.status(200).json({
      message: 'Tweet deleted',
    });
  },
  create: async (req: Request, res: Response) => {
    const { text } = req.body;
    const authorId = req.user.id;

    const newTweet = await tweetsService.create({ authorId, text });

    return res.status(200).json(newTweet);
  },
  like: async (req: Request, res: Response) => {
    const tweetId = req.params.tweetId;
    const userId = req.user.id;

    try {
      const tweet = await tweetsService.like({ tweetId, userId });
      return res.status(200).json({
        tweet,
      });
    } catch (error) {
      return res.status(400).json({
        message: 'Something went wrong',
      });
    }
  },
  unlike: async (req: Request, res: Response) => {
    const tweetId = req.params.tweetId;
    const userId = req.user.id;

    try {
      await tweetsService.unlike({ tweetId, userId })
    } catch (err) {
      // console.log(JSON.stringify(err.meta.cause));
    }

    return res.status(200).json({
      message: 'Tweet unliked',
    });
  },
};
