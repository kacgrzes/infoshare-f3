import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FlatList, Pressable, StatusBar } from 'react-native';
import { Button } from '@infoshare-f3/shared-ui';
import { useTailwind } from 'tailwind-rn';

const Stack = createNativeStackNavigator();

const Root = () => {
  const tailwind = useTailwind();

  return (
    <FlatList
      data={[1, 2, 3, 4]}
      renderItem={({ item }) => {
        return (
          <Pressable style={tailwind('w-full, h-52')}>
            <Button />
          </Pressable>
        );
      }}
    />
  );
};

export const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer
        theme={{
          colors: {
            background: 'white',
            border: 'white',
            card: 'white',
            notification: 'red',
            text: 'black',
            primary: 'green',
          },
          dark: false,
        }}
      >
        <Stack.Navigator>
          <Stack.Screen name="Root" component={Root} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
