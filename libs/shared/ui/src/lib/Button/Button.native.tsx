import React, { FC } from 'react';
import { Pressable, Text } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import type { ButtonProps } from './Button.props';

export const Button: FC<ButtonProps> = () => {
  const tailwind = useTailwind();
  return (
    <Pressable
      style={tailwind(
        'h-11 max-h-11 bg-blue justify-center items-center rounded-full'
      )}
    >
      <Text style={tailwind('text-white')}>Hello!</Text>
    </Pressable>
  );
};
