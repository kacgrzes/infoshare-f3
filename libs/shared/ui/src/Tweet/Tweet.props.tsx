import { Tweet, User } from '@infoshare-f3/shared-types'

export type TweetProps = {
  author: User
  tweet: Tweet
  onTweetPress?: () => void
  onLikePress?: () => void
  onCommentPress?: () => void
  onAvatarPress?: () => void
  liked?: boolean
}