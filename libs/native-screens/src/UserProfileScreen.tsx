import React, { useCallback } from "react";
import { FlatList, View, Text } from 'react-native'
import { useTailwind } from 'tailwind-rn';
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useRoute } from '@react-navigation/native'
import { users, tweets } from '@infoshare-f3/shared-test-data'
import { Avatar, Tweet, Separator } from '@infoshare-f3/shared-ui'
import { useTweeterCallbacks } from "./useTweeterCallbacks"

export const UserProfileScreen = () => {
  const tailwind = useTailwind();
  const { bottom } = useSafeAreaInsets();
  const { params } = useRoute();
  const { id: userId } = params;

  const author = users.find((user) => user.id === userId);
  const userTweets = tweets.filter((tweet) => tweet.authorId === userId);

  const { goToCreateComment, goToTweet, goToUserProfile } =
    useTweeterCallbacks();

  const renderItem = useCallback(
    ({ item }) => {
      return (
        <Tweet
          author={author}
          tweet={item}
          onCommentPress={() => goToCreateComment(item.id)}
          onTweetPress={() => goToTweet(item.id)}
          onAvatarPress={() => goToUserProfile(author.id)}
        />
      );
    },
    [goToTweet, goToCreateComment, goToUserProfile, author]
  );

  return (
    <FlatList
      ListHeaderComponent={() => (
        <View
          style={tailwind(
            'bg-white p-4 flex-row border-b border-b-light-gray items-center pt-0'
          )}
        >
          <Avatar size="big" profileImageUrl={author.profileImageUrl} />
          <View style={tailwind('ml-4 flex-1')}>
            <Text style={tailwind('text-xl')}>{author.name}</Text>
            <Text style={tailwind('text-dark-gray')}>@{author.username}</Text>
            <View style={tailwind('mt-1 flex-row')}>
              <Text style={tailwind('text-xs text-dark-gray')}>
                {userTweets.length} tweets · {author.followingIds.length}{' '}
                Following · {author.followersIds.length} Followers
              </Text>
            </View>
          </View>
        </View>
      )}
      stickyHeaderIndices={[0]}
      data={userTweets}
      renderItem={renderItem}
      ItemSeparatorComponent={Separator}
      contentContainerStyle={{ paddingBottom: bottom }}
    />
  );
};