import React, { useCallback } from 'react';
import { StatusBar, FlatList, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Tweet, TweetButton, Separator } from '@infoshare-f3/shared-ui';
import { users, tweets, me } from '@infoshare-f3/shared-test-data'
import { useTailwind } from 'tailwind-rn';
import { useTweeterCallbacks } from './useTweeterCallbacks'

export const TweetsScreen = () => {
  const tailwind = useTailwind();
  const { goToCreateComment, goToTweet, goToUserProfile, goToCreateTweet } =
    useTweeterCallbacks();
  const { bottom } = useSafeAreaInsets();
  const renderItem = useCallback(
    ({ item }) => {
      const author = users.find((user) => user.id === item.authorId);

      return (
        <Tweet
          author={author}
          tweet={item}
          onCommentPress={() => goToCreateComment(item.id)}
          onTweetPress={() => goToTweet(item.id)}
          onAvatarPress={() => goToUserProfile(author.id)}
          liked={me.likedTweetsIds.includes(item.id)}
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
        data={tweets}
        ItemSeparatorComponent={Separator}
        contentContainerStyle={{ paddingBottom: bottom }}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
      <View style={[tailwind('absolute right-4'), { bottom }]}>
        <TweetButton onPress={goToCreateTweet} />
      </View>
    </>
  );
};