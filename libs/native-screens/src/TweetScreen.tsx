import React, { useCallback } from 'react';
import { StatusBar, FlatList } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useRoute } from '@react-navigation/native'
import { tweets, comments, users } from '@infoshare-f3/shared-test-data'
import { Tweet, CommentCard } from '@infoshare-f3/shared-ui'

export const TweetScreen = () => {
  const { bottom } = useSafeAreaInsets();
  const { params } = useRoute();
  const { id: tweetId } = params;
  const tweet = tweets.find((tweet) => tweet.id === tweetId);
  const author = users.find((user) => user.id === tweet.authorId);
  const tweetComments = comments.filter(
    (comment) => comment.tweetId === tweet.id
  );

  const renderItem = useCallback(
    ({ item, index }) => {
      const commentAuthor = users.find((user) => user.id === item.authorId);
      return (
        <CommentCard
          author={commentAuthor}
          comment={item}
          isFirst={index === 0}
          isLast={index === tweetComments.length - 1}
        />
      );
    },
    [tweetComments]
  );

  return (
    <>
      <StatusBar barStyle="dark-content" animated />
      <FlatList
        data={tweetComments}
        ListHeaderComponent={<Tweet tweet={tweet} author={author} />}
        stickyHeaderIndices={[0]}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: bottom }}
      />
    </>
  );
};