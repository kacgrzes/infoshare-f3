import { Fragment } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';
import { Tweet, Avatar, Button, Separator, Container } from '@infoshare-f3/shared-ui';
import { useCreateTweetForm } from '@infoshare-f3/forms';
import { useAuthContext, useTweetsContext } from '@infoshare-f3/data-providers'

export const TweetsPage = () => {
  const { me } = useAuthContext();
  const navigate = useNavigate();
  const { tweetsQuery, toggleTweetLike } = useTweetsContext();
  const { register, formState, onSubmit, setValue } = useCreateTweetForm();
  const tweets =
    tweetsQuery?.data?.pages?.map((page: any) => page?.data?.tweets)?.flat() ??
    [];

  return <Container>
  <div className="flex flex-col">
    <div className="flex flex-row items-center p-4">
      <Avatar profileImageUrl={me?.profileImageUrl ?? ''} />
      <input
        {...register('text')}
        className={'w-full p-4 outline-none'}
        placeholder="Co się dzieje?"
      />
    </div>
    <div className="my-2">
      <Separator />
    </div>
    <div className="flex justify-end items-end px-2">
      <Button
        disabled={!formState.isValid}
        title="Tweet"
        onPress={() => {
          
          onSubmit();
          setValue('text', '');
        }}
      />
    </div>
    <div className="my-2">
      <Separator />
    </div>
  </div>
  <InfiniteScroll
    dataLength={tweets.length}
    next={tweetsQuery?.fetchNextPage ?? (() => undefined)}
    hasMore={tweetsQuery?.hasNextPage ?? true}
    loader={<h4 className="text-center p-4">Loading...</h4>}
    endMessage={
      <p className="text-center p-4">Yay! You have seen it all</p>
    }
    pullDownToRefresh
    pullDownToRefreshThreshold={50}
    pullDownToRefreshContent={
      <h3 style={{ textAlign: 'center' }}>
        &#8595; Pull down to refresh
      </h3>
    }
    releaseToRefreshContent={
      <h3 style={{ textAlign: 'center' }}>
        &#8593; Release to refresh
      </h3>
    }
    refreshFunction={tweetsQuery?.refetch}
  >
    {tweets.map((tweet) => (
      <Fragment key={tweet.id}>
        <Tweet
          author={tweet.author}
          tweet={tweet}
          onLikePress={() => toggleTweetLike?.(tweet.id)}
          onTweetPress={() => navigate(`tweets/${tweet.id}`)}
        />
        <Separator />
      </Fragment>
    ))}
  </InfiniteScroll>
</Container>
}