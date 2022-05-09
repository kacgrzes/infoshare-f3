import React from 'react';
import {
  NavigationContainer,
  useRoute,
  useNavigation,
} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import { Avatar, Button } from '@infoshare-f3/shared-ui';
import {
  CommentTweetScreen,
  CreateTweetScreen,
  TweetScreen,
  TweetsScreen,
  UserProfileScreen,
  SignInScreen,
} from '@infoshare-f3/native-screens';
import { useAuthContext, useTweetsContext } from '@infoshare-f3/data-providers';

const Stack = createNativeStackNavigator();

const HeaderLeft = () => {
  const { me, logout } = useAuthContext();

  return <Avatar size="small" profileImageUrl={me?.profileImageUrl} onPress={logout} />;
};

const DeleteTweeterHeaderButton = () => {
  const { params } = useRoute();
  const { goBack: onSuccess } = useNavigation();
  const { deleteTweetMutation, checkIfCanDelete } = useTweetsContext();
  const tweetId = params.id;

  if (!checkIfCanDelete(tweetId)) {
    return null;
  }

  return (
    <Button
      title={'Usuń'}
      size="small"
      onPress={() => {
        deleteTweetMutation.mutate(
          {
            tweetId,
          },
          {
            onSuccess,
          }
        );
      }}
    />
  );
};

const options: NativeStackNavigationOptions = {
  headerLeft: HeaderLeft,
};

const CreateTweeterHeaderButton = () => {
  const { params } = useRoute();

  return <Button title={'Tweet'} size="small" {...params} />;
};

export const App = () => {
  const { isAuthenticated } = useAuthContext();

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
        {!isAuthenticated && (
          <Stack.Group>
            <Stack.Screen name="SignIn" component={SignInScreen} />
          </Stack.Group>
        )}
        {isAuthenticated && <>
          <Stack.Screen
          name="Main"
          component={TweetsScreen}
          options={{
            ...options,
            title: 'Tweety',
          }}
        />
        <Stack.Screen
          name="Tweet"
          component={TweetScreen}
          options={{
            headerRight: DeleteTweeterHeaderButton,
          }}
        />
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
              return {
                headerRight: CreateTweeterHeaderButton,
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
        </Stack.Group></>}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
