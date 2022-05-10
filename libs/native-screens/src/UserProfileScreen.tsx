import React, { useCallback } from 'react';
import { FlatList, View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import { users, tweets } from '@infoshare-f3/shared-test-data';
import { Avatar, Tweet, Separator } from '@infoshare-f3/shared-ui';
import { useTweeterCallbacks } from './useTweeterCallbacks';
import tw from 'twrnc';

export const UserProfileScreen = () => {
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
          style={tw`bg-white p-4 flex-row border-b border-b-slate-200 items-center pt-0`}
        >
          <Avatar size="big" profileImageUrl={author?.profileImageUrl ?? ''} />
          <View style={tw`ml-4 flex-1`}>
            <Text style={tw`text-xl`}>{author?.name}</Text>
            <Text style={tw`text-slate-500`}>@{author?.username}</Text>
            <View style={tw`mt-1 flex-row`}>
              <Text style={tw`text-xs text-slate-500`}>
                {userTweets.length} tweets · {author?.followingIds.length}{' '}
                Following · {author?.followersIds.length} Followers
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
