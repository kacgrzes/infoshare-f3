import React from 'react';
import { IoAdd } from 'react-icons/io5';
import { Pressable } from 'react-native';
import tw from 'twrnc';
import type { TweetButtonProps } from './TweetButton.props';

export const TweetButton = (props: TweetButtonProps) => {
  return (
    <Pressable
      style={tw`bg-blue-400 h-12 w-12 rounded-full justify-center items-center`}
      onPress={props.onPress}
    >
      <IoAdd size={24} className={'text-white'} />
    </Pressable>
  );
};
