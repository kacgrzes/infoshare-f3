import React from 'react'
import { View } from 'react-native'
import { useTailwind } from 'tailwind-rn'
import { useAuthContext } from '@infoshare-f3/data-providers'
import { Button } from '@infoshare-f3/shared-ui'

export const SignInScreen = () => {
  const tailwind = useTailwind();
  const { loginMutation } = useAuthContext();

  const title = loginMutation?.status === 'idle' ? 'Sign in'
    : loginMutation?.status === 'loading' ? 'Loading...'
    : loginMutation?.status === 'success' ? 'Logged in!' 
    : 'No title'

  return (
    <View style={tailwind('flex-1 items-center justify-center')}>
      <Button
        onPress={() =>
          loginMutation?.mutate({
            username: 'user1',
            password: 'password1',
          })
        }
        title={title}
      ></Button>
    </View>
  );
};