import React, { FC } from 'react';
import { Pressable, Text } from 'react-native';
import tw from 'twrnc';

type ButtonProps = {
  size?: 'small' | 'normal';
  title: string;
  onPress?: () => void;
  disabled?: boolean;
};

export const Button: FC<ButtonProps> = ({
  title,
  size = 'normal',
  onPress,
  disabled,
}) => {
  return (
    <Pressable
      disabled={disabled}
      style={[
        tw`
          bg-blue-400 justify-center items-center rounded-full px-4'
        `,
        size === 'small' && tw`h-8 max-h-8`,
        size === 'normal' && tw`h-11 max-h-11`,
        disabled && tw`bg-slate-300`,
      ]}
      onPress={onPress}
    >
      <Text style={tw`text-white`}>{title}</Text>
    </Pressable>
  );
};
