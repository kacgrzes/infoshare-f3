import axios from 'axios';
import { User } from '@infoshare-f3/types';

const instance = axios.create({
  baseURL: 'http://localhost:3333/',
});

export const client = {
  auth: {
    login: async ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => {
      const response = await instance.post('/auth/login', {
        username,
        password,
      });
      instance.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${response.data.token}`;
      return response;
    },
    logout: () => {
      delete instance.defaults.headers.common['Authorization'];
    },
  },
  tweets: {
    getAll: async ({ page = 1 }: { page: number }) => {
      const response = await instance.get('/api/1.0/tweets', {
        params: { page },
      });
      return response;
    },
    create: async ({ text }: { text: string }) => {
      const response = await instance.post('/api/1.0/tweets', { text });
      return response;
    },
    delete: async ({ tweetId }: { tweetId: string }) => {
      const response = await instance.delete(`/api/1.0/tweets/${tweetId}`);
      return response;
    },
    like: async ({ tweetId }: { tweetId: string }) => {
      const response = await instance.post(`/api/1.0/tweets/${tweetId}/likes`);
      return response;
    },
    unlike: async ({ tweetId }: { tweetId: string }) => {
      const response = await instance.delete(
        `/api/1.0/tweets/${tweetId}/likes`
      );
      return response;
    },
  },
  comments: {
    getAll: async ({ tweetId }: { tweetId: string }) => {
      const response = await instance.get(
        `/api/1.0/tweets/${tweetId}/comments`
      );
      return response;
    },
    create: async ({ tweetId, text }: { tweetId: string; text: string }) => {
      const response = await instance.post(
        `/api/1.0/tweets/${tweetId}/comments`,
        { text }
      );
      return response;
    },
  },
  users: {
    getAll: async () => {
      const response = await instance.get<{ users: User[] }>(`/api/1.0/users`);
      return response;
    },
    delete: async (userId: string) => {
      const response = await instance.delete(`/api/1.0/users/${userId}`);
      return response;
    },
  },
};
