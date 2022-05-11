import * as supertest from 'supertest';
import * as bcrypt from 'bcrypt';
import app from './index';
import { prisma } from './prisma';
import { Role } from '@infoshare-f3/types'

const agent = supertest(app);

export const cleanup = async () => {
  await prisma.$transaction([
    prisma.like.deleteMany(),
    prisma.comment.deleteMany(),
    prisma.tweet.deleteMany(),
    prisma.user.deleteMany(),
  ]);
};

type CreateUserType = {
  username?: string,
  password?: string,
  role?: Role,
}



export const createUser = async (data: CreateUserType = {}) => {
  const {
    username = 'user1',
    password = 'password1',
    role = 'user',
  } = data
  const hashedPassword = await bcrypt.hash(password, 10);
  return await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
      name: 'John Doe',
      role,
    },
  });
};

export const createTweet = (authorId, text) => {
  return prisma.tweet.create({
    data: {
      text,
      authorId,
    },
  });
};

export const createTweets = async (tweetsNumber = 20) => {
  const user = await createUser();
  return await prisma.$transaction(
    new Array(tweetsNumber)
      .fill(null)
      .map((_, index) => createTweet(user.id, `Tweet ${index}`))
  );
};

export const createComment = async ({ authorId, tweetId, text }) => {
  return prisma.comment.create({
    data: {
      text,
      authorId,
      tweetId,
    },
  });
};

export const signUp = async (
  username = 'user1',
  password = 'password1',
  name = 'John Doe'
) => {
  return await agent.post('/api/1.0/users').send({
    username,
    password,
    name,
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

export const deleteUser = async (userId: string, token?: string) => {
  const deleteUserRequest = agent.delete(`/api/1.0/users/${userId}`);
  if (token) {
    deleteUserRequest.set('Authorization', `Bearer ${token}`);
  }
  return await deleteUserRequest;
}

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

export const postTweet = async ({ text }: { text: string }, token?: string) => {
  const createTweetRequest = agent.post('/api/1.0/tweets').send({
    text,
  });
  if (token) {
    createTweetRequest.set('Authorization', `Bearer ${token}`);
  }
  return await createTweetRequest;
};

export const deleteTweet = async (
  { tweetId }: { tweetId: string },
  token?: string
) => {
  const deleteTweetRequest = agent.delete(`/api/1.0/tweets/${tweetId}`);
  if (token) {
    deleteTweetRequest.set('Authorization', `Bearer ${token}`);
  }
  return await deleteTweetRequest;
};

export const getComments = async (tweetId: number, token?: string) => {
  const getCommentsRequest = agent.get(`/api/1.0/tweets/${tweetId}/comments`);
  if (token) {
    getCommentsRequest.set('Authorization', `Bearer ${token}`);
  }
  return await getCommentsRequest;
};

export const postComment = async ({ tweetId, text }, token?: string) => {
  const postCommentRequest = agent
    .post(`/api/1.0/tweets/${tweetId}/comments`)
    .send({
      text,
    });
  if (token) {
    postCommentRequest.set('Authorization', `Bearer ${token}`);
  }
  return await postCommentRequest;
};

export const deleteComment = async ({
  tweetId,
  commentId
}: {
  tweetId: string,
  commentId: string,
}, token?: string) => {
  const deleteCommentRequest = agent
    .delete(`/api/1.0/tweets/${tweetId}/comments/${commentId}`)
  if (token) {
    deleteCommentRequest.set('Authorization', `Bearer ${token}`);
  }
  return await deleteCommentRequest;
}

export const postLikeTweet = async (tweetId: number, token?: string) => {
  const postLikeTweetRequest = agent.post(`/api/1.0/tweets/${tweetId}/likes`);
  if (token) {
    postLikeTweetRequest.set('Authorization', `Bearer ${token}`);
  }
  return await postLikeTweetRequest;
};

export const deleteLikeTweet = async (tweetId: number, token?: string) => {
  const deleteLikeTweetRequest = agent.delete(
    `/api/1.0/tweets/${tweetId}/likes`
  );
  if (token) {
    deleteLikeTweetRequest.set('Authorization', `Bearer ${token}`);
  }
  return await deleteLikeTweetRequest;
};
