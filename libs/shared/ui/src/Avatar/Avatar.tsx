import React from 'react';
import { Pressable, Image } from 'react-native';
import tw from 'twrnc';
import { AvatarProps } from './Avatar.props';

export const Avatar = ({ size = 'normal', profileImageUrl, onPress}: AvatarProps) => {
  return (
    <Pressable style={tw`flex-shrink`} onPress={onPress}>
      <Image
        style={[
          tw`bg-slate-300 rounded-full`,
          size === 'small' && tw`w-8 h-8`,
          size === 'normal' && tw`w-12 h-12`,
          size === "big" && tw`w-16 h-16`,
        ]}
        source={{
          uri: profileImageUrl
        }}
      />
    </Pressable>
  );
};
