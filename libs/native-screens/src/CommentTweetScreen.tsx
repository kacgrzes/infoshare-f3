import React from 'react';
import { useRoute } from '@react-navigation/native';
import { StatusBar, ScrollView, Text } from 'react-native';

export const CommentTweetScreen = () => {
  const { params } = useRoute();
  const { id: tweetId } = params;

  return (
    <>
      <StatusBar barStyle="light-content" animated />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Text
          style={{
            color: 'black',
          }}
        >
          Hello
        </Text>
      </ScrollView>
    </>
  );
};
