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
import { Avatar, Button } from '@infoshare-f3/ui';
import {
  CommentTweetScreen,
  CreateTweetScreen,
  TweetScreen,
  TweetsScreen,
  UserProfileScreen,
  SignInScreen,
} from '@infoshare-f3/native-screens';
import tw from 'twrnc'
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
          background: tw.color('white'),
          border: tw.color('white'),
          card: tw.color('white'),
          notification: tw.color('red-400'),
          text: tw.color('slate-900'),
          primary: tw.color('blue-400'),
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
