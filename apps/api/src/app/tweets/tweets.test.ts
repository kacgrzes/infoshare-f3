import faker from '@faker-js/faker';
import { prisma } from '../prisma';
import {
  cleanup,
  createTweet,
  createTweets,
  createUser,
  deleteLikeTweet,
  deleteTweet,
  getTweets,
  login,
  postLikeTweet,
  postTweet,
  signUp,
  postComment,
  getComments,
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
        orderBy: {
          createdAt: 'desc',
        },
      });
      expect(response.body.tweets[0].id).toBe(
        JSON.parse(JSON.stringify(tweetsFromDb[0].id))
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
      expect(keys).toEqual(new Set(['id', 'authorId', 'createdAt', 'text']));
      expect(response.body.authorId).toBe(user.id);
    });
    test('Cannot create tweet with empty text', async () => {
      await signUp();
      const loginResponse = await login();
      const token = loginResponse.body.token;
      const response = await postTweet({ text: '' }, token);

      expect(response.statusCode).toBe(400);
      expect(response.body.errors).toHaveLength(1);
      expect(response.body.errors[0]).toBe('text is a required field');
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
        'text must be at most 160 characters'
      );
    });
  });

  describe('delete tweet', () => {
    let token, tweet, me;
    beforeEach(async () => {
      await signUp();
      const loginResponse = await login();
      token = loginResponse.body.token;
      const tweetResponse = await postTweet({ text: 'Example tweet' }, token);
      tweet = tweetResponse.body;
    });

    it('returns 401 when trying to delete tweet without token', async () => {
      const response = await deleteTweet({ tweetId: tweet.id });

      expect(response.status).toBe(401);
    });

    it('returns 200 when trying to delete tweet with token', async () => {
      const response = await deleteTweet({ tweetId: tweet.id }, token);

      expect(response.status).toBe(200);
    });

    it('returns 200 when deleting tweet with comments', async () => {
      await postComment(
        {
          text: 'Example comment #1',
          tweetId: tweet.id,
        },
        token
      );
      await postComment(
        {
          text: 'Example comment #1',
          tweetId: tweet.id,
        },
        token
      );
      let response = await getComments(tweet.id, token);
      expect(response.body.comments).toHaveLength(2);
      response = await deleteTweet({ tweetId: tweet.id }, token);
      expect(response.statusCode).toBe(200);
      response = await getComments(tweet.id, token);
      expect(response.body.comments).toHaveLength(0);
    });

    it('returns 401 when trying to delete not my tweet', async () => {
      await signUp('username2', 'password2');
      const loginResponse = await login('username2', 'password2');
      const response = await deleteTweet(
        { tweetId: tweet.id },
        loginResponse.body.token
      );

      expect(response.status).toBe(401);
      expect(response.body.message).toBe(
        'You are not the author of this tweet'
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
      expect(tweetAfterLikes).toHaveProperty('likedCount');
      expect(tweetAfterLikes.likedCount).toBe(1);
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
