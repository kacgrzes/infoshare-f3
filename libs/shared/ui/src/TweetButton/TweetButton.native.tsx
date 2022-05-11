import React from 'react';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import { Pressable } from 'react-native';
import tw from 'twrnc';
import type { TweetButtonProps } from './TweetButton.props';

export const TweetButton = (props: TweetButtonProps) => {
  return (
    <Pressable
      style={tw`bg-blue-400 h-12 w-12 rounded-full justify-center items-center`}
      onPress={props.onPress}
    >
      <Icon name="add" style={tw`text-white`} size={24} />
    </Pressable>
  );
};
