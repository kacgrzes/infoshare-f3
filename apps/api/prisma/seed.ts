import { PrismaClient } from '@prisma/client';
import { users, tweets, comments } from '@infoshare-f3/shared-test-data';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const main = async () => {
  await prisma.$transaction([
    prisma.comment.deleteMany(),
    prisma.tweet.deleteMany(),
    prisma.user.deleteMany(),
  ]);
  await prisma.$transaction(
    users.map((user) => {
      return prisma.user.create({
        data: {
          id: user.id,
          username: user.username,
          password: bcrypt.hashSync(user.password, 10),
        },
      });
    })
  );
  await prisma.$transaction(
    tweets.map((tweet) => {
      return prisma.tweet.create({
        data: {
          id: tweet.id,
          text: tweet.text,
          createdAt: tweet.createdAt,
          userId: tweet.authorId,
        },
      });
    })
  );
  await prisma.$transaction(
    comments.map((comment) => {
      return prisma.comment.create({
        data: {
          id: comment.id,
          authorId: comment.authorId,
          tweetId: comment.tweetId,
          text: comment.text,
        },
      });
    })
  );
};

main();
