import React from 'react';
import { Pressable, Image } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import { AvatarProps } from './Avatar.props';

export const Avatar = ({ size = 'normal', profileImageUrl, onPress}: AvatarProps) => {
  const tailwind = useTailwind();

  return (
    <Pressable style={tailwind('flex-shrink')} onPress={onPress}>
      <Image
        style={[
          tailwind('bg-gray rounded-full'),
          size === 'small' && tailwind('w-8 h-8'),
          size === 'normal' && tailwind('w-12 h-12'),
          size === "big" && tailwind('w-16 h-16'),
        ]}
        source={{
          uri: profileImageUrl
        }}
      />
    </Pressable>
  );
};
