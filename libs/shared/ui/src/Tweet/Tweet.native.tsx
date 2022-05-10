import React from 'react';
import { formatRelative } from 'date-fns';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import { Pressable, View, Text } from 'react-native';
import tw from 'twrnc'
import { TweetProps } from './Tweet.props';
import { Avatar } from '../Avatar';

export const Tweet = (props: TweetProps) => {
  const {
    author,
    tweet,
    onTweetPress,
    onCommentPress,
    onLikePress,
    onAvatarPress,
  } = props;

  return (
    <View style={tw`flex-col p-4 bg-white`}>
      <Pressable style={tw`w-full flex-row`} onPress={onTweetPress}>
        <Avatar
          onPress={onAvatarPress}
          profileImageUrl={author?.profileImageUrl}
        />
        <View style={tw`flex-1 flex-col ml-4`}>
          <Text style={tw`text-sm`}>
            <Text style={tw`text-black`}>{author?.name}</Text>{' '}
            <Text style={tw`text-slate-500`}>
              @{author.username} ·{' '}
              {formatRelative(new Date(tweet.createdAt), new Date())}
            </Text>
          </Text>
          <Text style={tw`text-base`}>{tweet.text}</Text>
        </View>
      </Pressable>
      <View style={tw`flex-row justify-evenly mt-4`}>
        <Pressable
          onPress={onCommentPress}
          style={tw`h-6 w-6 flex-row items-center justify-center`}
          hitSlop={16}
        >
          <Icon
            name="chatbox-outline"
            style={tw`text-slate-500`}
            size={24}
          />
          <Text style={tw`text-slate-500 ml-2`}>
            {tweet?.replyCount ?? 0}
          </Text>
        </Pressable>
        <Pressable
          onPress={onLikePress}
          style={tw`h-6 w-6 flex-row items-center justify-center`}
          hitSlop={16}
        >
          <Icon
            name={tweet?.liked ? 'heart' : 'heart-outline'}
            style={
              tweet?.liked
                ? tw`text-red-400`
                : tw`text-slate-500`
            }
            size={24}
          />
          <Text style={tw`text-slate-500 ml-2`}>
            {tweet?.likedCount ?? 0}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};
