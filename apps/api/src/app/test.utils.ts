import * as supertest from 'supertest';
import * as bcrypt from 'bcrypt';
import app from './index';
import { prisma } from './prisma';

const agent = supertest(app);

export const signUp = async (username = 'user1', password = 'password1') => {
  return await agent.post('/api/1.0/users').send({
    username,
    password,
  });
};

export const login = async (username = 'user1', password = 'password1') => {
  return await agent.post('/auth/login').send({
    username,
    password,
  });
};

export const getAllUsers = async () => {
  return await agent.get('/api/1.0/users');
};

export const getTweets = async (
  token?: string,
  queryParams?: { page: number }
) => {
  const { page } = queryParams || {};
  const tweetsRequest = agent.get('/api/1.0/tweets').query({ page });
  if (token) {
    tweetsRequest.set('Authorization', `Bearer ${token}`);
  }
  return await tweetsRequest;
};

export const cleanup = async () => {
  await prisma.$transaction([
    prisma.tweet.deleteMany(),
    prisma.comment.deleteMany(),
    prisma.user.deleteMany(),
  ]);
};

export const createUser = async () => {
  const hashedPassword = await bcrypt.hash('password1', 10);
  return await prisma.user.create({
    data: {
      username: 'user1',
      password: hashedPassword,
    },
  });
};

export const createTweets = async (tweetsNumber = 20) => {
  const user = await createUser();
  return await prisma.$transaction(
    new Array(tweetsNumber).fill(null).map((_, index) => {
      return prisma.tweet.create({
        data: {
          text: `Tweet ${index}`,
          userId: user.id,
        },
      });
    })
  );
};

export const postTweet = async (token?: string) => {
  const createTweetRequest = agent.post('/api/1.0/tweets').send({
    text: 'Example tweet',
  });
  if (token) {
    createTweetRequest.set('Authorization', `Bearer ${token}`);
  }
  return await createTweetRequest;
};
