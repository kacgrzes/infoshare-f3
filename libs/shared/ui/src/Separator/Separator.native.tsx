import React from 'react';
import { View } from 'react-native';
import { useTailwind } from 'tailwind-rn';

export const Separator = () => {
  const tailwind = useTailwind();
  return <View style={tailwind('border-b border-b-light-gray')} />;
};
