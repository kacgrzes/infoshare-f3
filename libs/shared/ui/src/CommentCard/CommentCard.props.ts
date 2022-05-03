import { User, Comment } from '@infoshare-f3/shared-types'

export type CommentCardProps = {
  author: User
  comment: Comment
  isFirst?: boolean
  isLast?: boolean
}