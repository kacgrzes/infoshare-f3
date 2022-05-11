import React from 'react';
import { View } from 'react-native';
import { useAuthContext } from '@infoshare-f3/data-providers';
import { Button } from '@infoshare-f3/ui';
import tw from 'twrnc';

export const SignInScreen = () => {
  const { loginMutation } = useAuthContext();

  const title =
    loginMutation?.status === 'idle'
      ? 'Sign in'
      : loginMutation?.status === 'loading'
      ? 'Loading...'
      : loginMutation?.status === 'success'
      ? 'Logged in!'
      : 'No title';

  return (
    <View style={tw`flex-1 items-center justify-center`}>
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
