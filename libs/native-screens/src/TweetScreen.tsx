import React, { useCallback } from 'react';
import { StatusBar, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import { Tweet, CommentCard } from '@infoshare-f3/shared-ui';
import {
  useCommentForTweetQuery,
  useTweetsContext,
} from '@infoshare-f3/data-providers';

export const TweetScreen = () => {
  const { bottom } = useSafeAreaInsets();
  const { params } = useRoute();
  const { getTweet, toggleTweetLike } = useTweetsContext();
  const { id: tweetId } = params;
  const tweet = getTweet(tweetId);
  const commentsQuery = useCommentForTweetQuery(tweetId);
  const comments = commentsQuery?.data?.data?.comments ?? [];

  const renderItem = useCallback(
    ({ item: comment, index }) => {
      return (
        <CommentCard
          author={comment.author}
          comment={comment}
          isFirst={index === 0}
          isLast={index === comments.length - 1}
        />
      );
    },
    [comments]
  );

  return (
    <>
      <StatusBar barStyle="dark-content" animated />
      <FlatList
        data={comments}
        ListHeaderComponent={
          <Tweet
            tweet={tweet}
            author={tweet.author}
            onLikePress={() => toggleTweetLike(tweet.id)}
          />
        }
        stickyHeaderIndices={[0]}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: bottom }}
      />
    </>
  );
};
