import { prisma } from '../prisma';
import {
  cleanup,
  createTweets,
  getTweets,
  login,
  postTweet,
  signUp,
} from '../test.utils';

beforeEach(async () => {
  await cleanup();
});

describe('Tweets', () => {
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
  test('returns 401 when trying to create tweet without token', async () => {
    const response = await postTweet();

    expect(response.statusCode).toBe(401);
  });
  test('returns 200 when creating tweet with token', async () => {
    await signUp();
    const loginResponse = await login();
    const token = loginResponse.body.token;
    const response = await postTweet(token);
    const keys = new Set(Object.keys(response.body));
    const user = await prisma.user.findFirst();

    expect(response.statusCode).toBe(200);
    expect(keys).toEqual(new Set(['id', 'userId', 'createdAt', 'text']));
    expect(response.body.userId).toBe(user.id);
  });
});
