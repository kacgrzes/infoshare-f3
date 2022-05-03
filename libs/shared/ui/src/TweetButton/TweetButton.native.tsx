import React from 'react';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import { Pressable } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import { TweetButtonProps } from './TweetButton.props';

export const TweetButton = (props: TweetButtonProps) => {
  const tailwind = useTailwind();

  return <Pressable style={tailwind('bg-blue h-12 w-12 rounded-full justify-center items-center')} onPress={props.onPress}>
    <Icon name="add" style={tailwind('text-almost-white')} size={24} />
  </Pressable>
}