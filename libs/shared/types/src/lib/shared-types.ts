// https://developer.twitter.com/en/docs/twitter-api/data-dictionary/object-model/user
export type User = {
  id: string;
  createdAt: Date;
  name: string;
  username: string;
  profileImageUrl: string;
  followersCount: number;
  likedTweetsIds: string[];
  followersIds: string[];
  followingIds: string[];
};

// https://developer.twitter.com/en/docs/twitter-api/data-dictionary/object-model/tweet
export type Tweet = {
  id: string;
  createdAt: Date;
  text: string;
  authorId: string;
  replyCount: number;
  likedCount: number;
};

export type Comment = {
  id: string;
  tweetId: string;
  createdAt: Date;
  text: string;
  authorId: string;
}