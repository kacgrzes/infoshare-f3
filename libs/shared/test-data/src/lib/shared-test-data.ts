import { User, Tweet, Comment } from '@infoshare-f3/shared-types';
import faker from '@faker-js/faker';

const createRandomUser = (): User => {
  return {
    id: faker.database.mongodbObjectId(),
    createdAt: faker.date.recent(),
    followersCount: 0,
    name: faker.name.findName(),
    profileImageUrl: faker.internet.avatar(),
    username: faker.internet.userName(),
    likedTweetsIds: [],
    followersIds: [],
    followingIds: [],
  };
};

const createRandomTweet = (authorId: string): Tweet => {
  return {
    id: faker.database.mongodbObjectId(),
    createdAt: faker.date.recent(),
    likedCount: 0,
    replyCount: 15,
    text: faker.lorem.words(30).slice(0, 160),
    authorId,
  };
};

const createRandomComment = ({
  authorId,
  tweetId,
}: {
  authorId: string;
  tweetId: string;
}): Comment => {
  return {
    id: faker.database.mongodbObjectId(),
    authorId,
    tweetId,
    createdAt: faker.date.recent(),
    text: faker.lorem.words(30).slice(0, 160),
  };
};

export const users = new Array(50).fill(null).map(createRandomUser);
export const tweets = new Array(200)
  .fill(null)
  .map(() => createRandomTweet(faker.random.arrayElement(users).id));
export const comments = new Array(1000).fill(null).map(() =>
  createRandomComment({
    authorId: faker.random.arrayElement(users).id,
    tweetId: faker.random.arrayElement(tweets).id,
  })
);

users.forEach((user) => {
  const otherUsers = users.filter((otherUser) => otherUser.id !== user.id);
  const followersIds = faker.random
    .arrayElements(otherUsers, 20)
    .map((user) => user.id);
  const followingIds = faker.random
    .arrayElements(otherUsers, 20)
    .map((user) => user.id);
  const randomTweets = faker.random.arrayElements(tweets, 30);
  user.likedTweetsIds = randomTweets.map((tweet) => tweet.id);
  user.followersIds = followersIds;
  user.followingIds = followingIds;
});
tweets.forEach((tweet) => {
  tweet.replyCount = comments.filter(
    (comment) => comment.tweetId === tweet.id
  ).length;
  tweet.likedCount = users.filter((user) =>
    user.likedTweetsIds.includes(tweet.id)
  ).length;
});

export const me = users[0];
