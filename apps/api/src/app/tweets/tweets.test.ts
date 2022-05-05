import faker from '@faker-js/faker';
import { prisma } from '../prisma';
import {
  cleanup,
  createTweet,
  createTweets,
  createUser,
  deleteLikeTweet,
  getTweets,
  login,
  postLikeTweet,
  postTweet,
  signUp,
} from '../test.utils';

afterEach(cleanup);

describe('Tweets', () => {
  describe('get tweets', () => {
    test('should not return tweets when not logged in', async () => {
      const response = await getTweets();

      expect(response.statusCode).toEqual(401);
    });
    test('should return tweets when logged in', async () => {
      await createTweets();
      const loginResponse = await login();
      const tweetsResponsse = await getTweets(loginResponse.body.token);

      expect(tweetsResponsse.statusCode).toEqual(200);
      expect(tweetsResponsse.body.tweets).not.toHaveLength(0);
    });

    test('returns first page of tweets', async () => {
      await createTweets();
      const loginResponse = await login();
      const response = await getTweets(loginResponse.body.token);

      expect(response.body.tweets).toHaveLength(10);
    });

    test('returns second page of tweets', async () => {
      await createTweets(30);
      const loginResponse = await login();
      const response = await getTweets(loginResponse.body.token, {
        page: 2,
      });
      const tweetsFromDb = await prisma.tweet.findMany({
        take: 10,
        skip: 10,
      });
      expect(response.body.tweets[0]).toMatchObject(
        JSON.parse(JSON.stringify(tweetsFromDb[0]))
      );
    });
  });
  describe('post tweet', () => {
    test('returns 401 when trying to create tweet without token', async () => {
      const response = await postTweet({ text: 'Example tweet' });

      expect(response.statusCode).toBe(401);
    });
    test('returns 200 when creating tweet with token', async () => {
      await signUp();
      const loginResponse = await login();
      const token = loginResponse.body.token;
      const response = await postTweet({ text: 'Example tweet' }, token);
      const keys = new Set(Object.keys(response.body));
      const user = await prisma.user.findFirst();

      expect(response.statusCode).toBe(200);
      expect(keys).toEqual(new Set(['id', 'userId', 'createdAt', 'text']));
      expect(response.body.userId).toBe(user.id);
    });
    test('Cannot create tweet with empty text', async () => {
      await signUp();
      const loginResponse = await login();
      const token = loginResponse.body.token;
      const response = await postTweet({ text: '' }, token);

      expect(response.statusCode).toBe(400);
      expect(response.body.errors).toHaveLength(1);
      expect(response.body.errors[0]).toBe('tweet is a required field');
    });

    test('Cannot create tweet longer than 160 characters', async () => {
      await signUp();
      const loginResponse = await login();
      const token = loginResponse.body.token;
      const response = await postTweet(
        { text: faker.lorem.sentences(20) },
        token
      );

      expect(response.statusCode).toBe(400);
      expect(response.body.errors).toHaveLength(1);
      expect(response.body.errors[0]).toBe(
        'tweet must be at most 160 characters'
      );
    });
  });

  describe('liking tweet', () => {
    let user, tweet, token;
    beforeEach(async () => {
      user = await createUser();
      const loginResponse = await login();
      token = loginResponse.body.token;
      tweet = await createTweet(user.id, 'Tweet 1');
    });
    test('should return 401 when trying to like tweet without token', async () => {
      const response = await postLikeTweet(tweet.id);

      expect(response.statusCode).toBe(401);
    });
    test('should return 200 when liking tweet with token', async () => {
      const response = await postLikeTweet(tweet.id, token);

      expect(response.statusCode).toBe(200);
    });
    test('should not be able to like tweet more than once', async () => {
      await postLikeTweet(tweet.id, token);
      await postLikeTweet(tweet.id, token);
      await postLikeTweet(tweet.id, token);
      const response = await postLikeTweet(tweet.id, token);

      const tweetsResponse = await getTweets(token);
      const tweetAfterLikes = tweetsResponse.body.tweets.find(
        (t) => t.id === tweet.id
      );

      expect(response.statusCode).toBe(200);
      expect(tweetAfterLikes).toHaveProperty('likedBy');
      expect(tweetAfterLikes.likedBy).toHaveLength(1);
    });

    test('should return 401 when trying to unlike tweet without token', async () => {
      const response = await deleteLikeTweet(tweet.id);

      expect(response.statusCode).toBe(401);
    });
    test('should return 200 when unliking tweet with token', async () => {
      const response = await deleteLikeTweet(tweet.id, token);

      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe('Tweet unliked');
    });
  });
});
