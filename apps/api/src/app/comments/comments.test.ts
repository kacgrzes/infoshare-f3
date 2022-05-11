import {
  createUser,
  cleanup,
  getComments,
  createTweet,
  createComment,
  login,
  postComment,
  deleteComment,
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

      expect(authorKeys).toEqual(
        new Set(['id', 'username', 'name', 'profileImageUrl'])
      );
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

  describe('delete comment', () => {
    it('user that created comment can delete it', async () => {
      const createCommentResponse = await createComment({
        authorId: user.id,
        text: 'Example comment #1',
        tweetId: tweet.id,
      })
      const commentId = createCommentResponse.id

      let commentsResponse = await getComments(tweet.id, token)
      expect(commentsResponse.body.comments).toHaveLength(1)

      const deleteCommentResponse = await deleteComment({
        commentId,
        tweetId: tweet.id
      }, token);
      commentsResponse = await getComments(tweet.id, token)
      
      expect(deleteCommentResponse.status).toBe(200);
      expect(commentsResponse.body.comments).toHaveLength(0)
    })
    it('user that didn\'t create comment cannot delete it', async () => {
      const createCommentResponse = await createComment({
        authorId: user.id,
        text: 'Example comment #1',
        tweetId: tweet.id,
      })
      const commentId = createCommentResponse.id
      user = await createUser({
        username: 'user2',
        password: 'password2',
      });
      const loginResponse = await login('user2', 'password2');
      token = loginResponse.body.token;
      const response = await deleteComment({
        tweetId: tweet.id,
        commentId,
      }, token)
      expect(response.status).toBe(401)
    })
    it('admin can delete all comments', async () => {
      const createCommentResponse = await createComment({
        authorId: user.id,
        text: 'Example comment #1',
        tweetId: tweet.id,
      })
      const commentId = createCommentResponse.id
      user = await createUser({
        username: 'admin1',
        password: 'password1',
        role: 'admin'
      })
      const loginResponse = await login('admin1', 'password1');
      token = loginResponse.body.token;

      const response = await deleteComment({
        tweetId: tweet.id,
        commentId,
      }, token)
      expect(response.status).toBe(200)
    })
  })
});
