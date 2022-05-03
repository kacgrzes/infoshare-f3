import React from 'react';
import { View, Text } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import { CommentCardProps } from './CommentCard.props';
import { Avatar } from '../Avatar'

export const CommentCard = (props: CommentCardProps) => {
  const { author, comment, isFirst, isLast } = props;
  const tailwind = useTailwind();
  return (
    <>
      <View
        style={[tailwind('ml-4 absolute top-0 bottom-0 left-6 bg-light-gray'), { width: 1 }, isFirst && tailwind('top-1/2 bottom-0'), isLast && tailwind('top-0 bottom-1/2') ]}
      />
      <View style={tailwind('flex-row p-4')}>
        <Avatar
          profileImageUrl={author.profileImageUrl}
        />
        <View style={tailwind('flex-1 ml-4')}>
          <Text style={tailwind('text-base')}>{comment.text}</Text>
        </View>
      </View>
    </>
  );
};
