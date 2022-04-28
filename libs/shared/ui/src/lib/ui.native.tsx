/* eslint-disable-next-line */
import React from 'react';
import { Text } from 'react-native';
import { useTailwind } from 'tailwind-rn';

export function TestComponent() {
  const tailwind = useTailwind();
  return (
    <Text style={tailwind('text-xs bg-black text-white')}>
      Welcome to Ui!!!
    </Text>
  );
}

export default TestComponent;
