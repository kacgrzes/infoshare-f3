import { Tweet, User } from '@infoshare-f3/types';

export type TweetProps = {
  author: User;
  tweet: Tweet;
  onTweetPress?: () => void;
  onLikePress?: () => void;
  onCommentPress?: () => void;
  onAvatarPress?: () => void;
};
