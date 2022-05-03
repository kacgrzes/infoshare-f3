import React from 'react';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import { Pressable, View, Text } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import { TweetProps } from './Tweet.props';
import { Avatar } from '../Avatar'

export const Tweet = (props: TweetProps) => {
  const tailwind = useTailwind();
  const {author, tweet, onTweetPress, onCommentPress, onLikePress, onAvatarPress} = props;

  return <View style={tailwind('flex-col p-4 bg-white')}>
    <Pressable style={tailwind('w-full flex-row')} onPress={onTweetPress}>
      <Avatar
        onPress={onAvatarPress}
        profileImageUrl={author.profileImageUrl}
      />
      <View style={tailwind('flex-1 flex-col ml-4')}>
        <Text style={tailwind('text-sm')}><Text style={tailwind('text-black')}>{author.name}</Text> <Text style={tailwind('text-dark-gray')}>@{author.username} · 1h</Text></Text>
        <Text style={tailwind('text-base')}>{tweet.text}</Text>
      </View>
    </Pressable>
    <View style={tailwind('flex-row justify-evenly mt-4')}>
      <Pressable onPress={onCommentPress} style={tailwind('h-6 w-6 flex-row items-center justify-center')} hitSlop={16}>
        <Icon name="chatbox-outline" style={tailwind('text-dark-gray')} size={24} />
        <Text style={tailwind('text-dark-gray ml-2')}>{tweet.replyCount}</Text>
      </Pressable>
      <Pressable onPress={onLikePress} style={tailwind('h-6 w-6 flex-row items-center justify-center')} hitSlop={16}>
        <Icon name={props.liked ? "heart" : "heart-outline"} style={props.liked ? tailwind('text-red-400') : tailwind('text-dark-gray')} size={24} />
        <Text style={tailwind('text-dark-gray ml-2')}>{tweet.likedCount}</Text>
      </Pressable>
    </View>
  </View>
}