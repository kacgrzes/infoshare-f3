// https://developer.twitter.com/en/docs/twitter-api/data-dictionary/object-model/user
export type User = {
  id: string;
  createdAt: string;
  name: string;
  username: string;
  profileImageUrl: string;
  followersCount: number;
};

// https://developer.twitter.com/en/docs/twitter-api/data-dictionary/object-model/tweet
export type Tweet = {
  id: string;
  createdAt: Date;
  text: string;
  authorId: string;
  replyCount: number;
  favorited: boolean;
  favoriteCount: number;
};

export type TweetProps = {
  tweet: Tweet;
  onPress: () => void;
};
