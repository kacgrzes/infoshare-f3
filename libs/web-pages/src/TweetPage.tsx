import { useParams } from 'react-router-dom'
import { Tweet, Container, CommentCard, Separator, Avatar, Button } from '@infoshare-f3/ui';
import { useTweetsContext, useAuthContext, useCommentForTweetQuery } from '@infoshare-f3/data-providers'
import { useCommentTweetForm } from '@infoshare-f3/forms'

export const TweetPage = () => {
  const { me } = useAuthContext();
  const { getTweet } = useTweetsContext()
  const { id: tweetId } = useParams<{id: string}>()
  const tweet = getTweet(tweetId)
  const commentsQuery = useCommentForTweetQuery(tweetId);
  const comments = commentsQuery?.data?.data?.comments ?? [];
  const { register, onSubmit, formState, setValue } = useCommentTweetForm(tweetId)

  return <Container>
    <Tweet tweet={tweet} author={tweet?.author} />
    <Separator />
    <div className="flex flex-row items-center p-4">
      <Avatar profileImageUrl={me?.profileImageUrl ?? ''} />
      <input
        {...register('text')}
        className={'w-full p-4 outline-none'}
        placeholder="Skomentuj tweeta"
      />
    </div>
    <div className="my-2">
      <Separator />
    </div>
    <div className="flex justify-end items-end px-2">
      <Button
        disabled={!formState.isValid}
        title="Skomentuj"
        onPress={() => {
          onSubmit();
          setValue('text', '');
        }}
      />
    </div>
    <div className="my-2">
      <Separator />
    </div>
    {comments.map((comment: any, index: any) => {
      return <CommentCard
        key={comment.id}
        author={comment.author}
        comment={comment}
        isFirst={index === 0}
        isLast={index === comments.length - 1}
      />
    })}
  </Container>
}