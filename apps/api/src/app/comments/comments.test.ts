import {
  createUser,
  cleanup,
  getComments,
  createTweet,
  createComment,
  login,
  postComment,
} from '../test.utils';

afterEach(cleanup);

describe('Comments', () => {
  let user, tweet, token;
  beforeEach(async () => {
    user = await createUser();
    const loginResponse = await login();
    token = loginResponse.body.token;
    tweet = await createTweet(user.id, 'Tweet 1');
  });

  describe('get comments', () => {
    test('returns 401 when trying to get comments being unauthorized', async () => {
      const response = await getComments(tweet.id);

      expect(response.status).toBe(401);
    });

    test('returns 200 ok when trying to get comments being authorized', async () => {
      await createComment({
        authorId: user.id,
        tweetId: tweet.id,
        text: 'Example comment',
      });

      const response = await getComments(tweet.id, token);
      expect(response.statusCode).toEqual(200);
    });

    test('returns tweet comments', async () => {
      await createComment({
        authorId: user.id,
        tweetId: tweet.id,
        text: 'Example comment 1',
      });
      await createComment({
        authorId: user.id,
        tweetId: tweet.id,
        text: 'Example comment 2',
      });

      const response = await getComments(tweet.id, token);
      const comments = response.body.comments;
      const commentKeys = new Set(Object.keys(comments[0]));

      expect(comments).toHaveLength(2);
      expect(commentKeys).toEqual(
        new Set(['text', 'id', 'authorId', 'tweetId', 'createdAt', 'author'])
      );
    });

    test('comment should have author details', async () => {
      await createComment({
        authorId: user.id,
        tweetId: tweet.id,
        text: 'Example comment 1',
      });

      const response = await getComments(tweet.id, token);
      const comments = response.body.comments;
      const comment = comments[0];
      const author = comment.author;
      const authorKeys = new Set(Object.keys(author));

      expect(authorKeys).toEqual(new Set(['id', 'username']));
    });
  });

  describe('post comment', () => {
    test('should return 401 when trying to create comment without token', async () => {
      const response = await postComment({
        tweetId: tweet.id,
        text: 'Example comment',
      });

      expect(response.statusCode).toBe(401);
    });

    test('should return 200 when trying to create comment with token', async () => {
      const response = await postComment(
        {
          tweetId: tweet.id,
          text: 'Example comment',
        },
        token
      );
      const commentKeys = new Set(Object.keys(response.body));

      expect(response.statusCode).toBe(200);
      expect(response.body.text).toBe('Example comment');
      expect(commentKeys).toEqual(
        new Set(['id', 'text', 'authorId', 'tweetId', 'createdAt'])
      );
    });

    test('should create comment on DB', async () => {
      await postComment(
        {
          tweetId: tweet.id,
          text: 'Example comment #1',
        },
        token
      );
      await postComment(
        {
          tweetId: tweet.id,
          text: 'Example comment #2',
        },
        token
      );

      const response = await getComments(tweet.id, token);
      expect(response.body.comments).toHaveLength(2);
    });
  });
});
