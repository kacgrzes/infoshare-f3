import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import { me } from '@infoshare-f3/shared-test-data';
import { Avatar, Button } from '@infoshare-f3/shared-ui';
import {
  CommentTweetScreen,
  CreateTweetScreen,
  TweetScreen,
  TweetsScreen,
  UserProfileScreen,
} from '@infoshare-f3/native-screens';

const Stack = createNativeStackNavigator();

const options: NativeStackNavigationOptions = {
  headerLeft: () => (
    <Avatar size="small" profileImageUrl={me.profileImageUrl} />
  ),
};

export const App = () => {
  return (
    <NavigationContainer
      theme={{
        colors: {
          background: '#FFFFFF',
          border: '#FFFFFF',
          card: '#FFFFFF',
          notification: 'red',
          text: '#14171A',
          primary: '#1DA1F2',
        },
        dark: false,
      }}
    >
      <Stack.Navigator
        screenOptions={{
          headerBackTitleVisible: false,
          orientation: 'portrait',
        }}
      >
        <Stack.Screen
          name="Main"
          component={TweetsScreen}
          options={{
            ...options,
            title: 'Tweety',
          }}
        />
        <Stack.Screen name="Tweet" component={TweetScreen} />
        <Stack.Screen
          options={{
            headerShadowVisible: false,
          }}
          name="UserProfile"
          component={UserProfileScreen}
        />
        <Stack.Group
          screenOptions={{
            statusBarStyle: 'light',
            statusBarAnimation: 'fade',
            presentation: 'modal',
            ...options,
          }}
        >
          <Stack.Screen
            name="CreateTweet"
            component={CreateTweetScreen}
            options={(props) => {
              const disabled = props.route.params?.disabled ?? true;
              return {
                headerRight: () => {
                  return (
                    <Button disabled={disabled} title={'Tweet'} size="small" />
                  );
                },
                title: '',
              };
            }}
          />
          <Stack.Screen
            name="CommentTweet"
            component={CommentTweetScreen}
            options={{
              headerRight: () => {
                return <Button title={'Odpowiedz'} size="small" />;
              },
              title: '',
            }}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
