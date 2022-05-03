import React, { FC } from 'react';
import { Pressable, Text } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import type { ButtonProps } from './Button.props';

export const Button: FC<ButtonProps> = ({ title, size = "normal", onPress, disabled }) => {
  const tailwind = useTailwind();
  return (
    <Pressable
      disabled={disabled}
      style={[
        tailwind(
          'bg-blue justify-center items-center rounded-full px-4'
        ),
        size === "small" && tailwind('h-8 max-h-8'),
        size === "normal" && tailwind('h-11 max-h-11'),
        disabled && tailwind('bg-gray')
      ]}
      onPress={onPress}
    >
      <Text style={tailwind('text-white')}>{title}</Text>
    </Pressable>
  );
};
