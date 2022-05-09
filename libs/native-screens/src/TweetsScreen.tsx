import React, { useState, useCallback } from 'react';
import { StatusBar, FlatList, View, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Tweet, TweetButton, Separator } from '@infoshare-f3/shared-ui';
import { useTweetsContext } from '@infoshare-f3/data-providers';
import { useTailwind } from 'tailwind-rn';
import { useTweeterCallbacks } from './useTweeterCallbacks';

export const TweetsScreen = () => {
  const { tweetsQuery, toggleTweetLike } = useTweetsContext();
  const [isRefetching, setRefetching] = useState(false)
  const tailwind = useTailwind();
  const { goToCreateComment, goToTweet, goToUserProfile, goToCreateTweet } =
    useTweeterCallbacks();
  const { bottom } = useSafeAreaInsets();
  const renderItem = useCallback(
    ({ item }) => {
      const author = item.author;
      return (
        <Tweet
          author={author}
          tweet={item}
          onCommentPress={() => goToCreateComment(item.id)}
          onTweetPress={() => goToTweet(item.id)}
          onAvatarPress={() => goToUserProfile(author.id)}
          onLikePress={() => toggleTweetLike(item.id)}
        />
      );
    },
    [goToTweet, goToCreateComment, goToUserProfile]
  );
  const keyExtractor = useCallback((item) => item.id, []);

  return (
    <>
      <StatusBar barStyle="dark-content" animated />
      <FlatList
        data={
          tweetsQuery?.data?.pages?.map((page) => page.data.tweets)?.flat() ??
          []
        }
        refreshing={isRefetching}
        onRefresh={() => {
          setRefetching(true)
          tweetsQuery?.refetch().then(() => {
            setRefetching(false)
          })
        }}
        ItemSeparatorComponent={Separator}
        contentContainerStyle={{ paddingBottom: bottom }}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onEndReached={tweetsQuery?.fetchNextPage}
        onEndReachedThreshold={0.2}
        ListFooterComponent={
          tweetsQuery?.isFetchingNextPage && tweetsQuery?.hasNextPage ? (
            <View style={tailwind('items-center justify-center h-12')}>
              <ActivityIndicator />
            </View>
          ) : null
        }
      />
      <View style={[tailwind('absolute right-4'), { bottom }]}>
        <TweetButton onPress={goToCreateTweet} />
      </View>
    </>
  );
};
