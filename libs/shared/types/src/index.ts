// https://developer.twitter.com/en/docs/twitter-api/data-dictionary/object-model/user
export type Role = "user" | "admin";

export type User = {
  id: string;
  createdAt: Date;
  name: string;
  username: string;
  password: string;
  profileImageUrl: string;
  followersCount: number;
  likedTweetsIds: string[];
  followersIds: string[];
  followingIds: string[];
  role: Role;
};

export type Me = {
  id: string
  name: string
  username: string
  profileImageUrl: string;
}

// https://developer.twitter.com/en/docs/twitter-api/data-dictionary/object-model/tweet
export type Tweet = {
  id: string;
  createdAt: Date;
  text: string;
  authorId: string;
  replyCount: number;
  likedCount: number;
  liked?: boolean;
};

export type CreateTweet = {
  text: string;
};

export type Comment = {
  id: string;
  tweetId: string;
  createdAt: Date;
  text: string;
  authorId: string;
};

export type CreateComment = {
  text: string;
};
