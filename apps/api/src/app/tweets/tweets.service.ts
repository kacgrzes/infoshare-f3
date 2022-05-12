import { prisma } from '../prisma';

export const tweetsService = {
  getPage: async (page: number, user) => {
    const tweets = await prisma.tweet.findMany({
      take: 10,
      skip: (page - 1) * 10,
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

    const mapperdTweets = tweets.map((tweet) => {
      const { author, id, createdAt, text } = tweet;
      return {
        author,
        id,
        createdAt,
        text,
        liked: Boolean(
          tweet.likedBy.find((liked) => liked.userId === user.id)
        ),
        likedCount: tweet.likedBy.length,
        replyCount: tweet.comments.length,
      };
    });

    return mapperdTweets;
  },
  delete: async (tweetId: string) => {
    await prisma.tweet.delete({
      where: {
        id: tweetId,
      },
    });
  },
  findUnique: async (tweetId: string) => {
    return await prisma.tweet.findUnique({
      where: {
        id: tweetId,
      },
      select: {
        authorId: true,
      },
    });
  },
  create: async ({ text, authorId }: { text: string; authorId: string }) => {
    const newTweet = await prisma.tweet.create({
      data: {
        text,
        authorId,
      },
    });

    return newTweet;
  },
  like: async ({ userId, tweetId }) => {
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

    return tweet;
  },
  unlike: async ({ tweetId, userId }) => {
    return await prisma.like.delete({
      where: {
        likeId: {
          tweetId,
          userId,
        },
      },
    });
  }
};
