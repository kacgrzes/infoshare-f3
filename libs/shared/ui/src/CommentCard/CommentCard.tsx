import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';
import { Avatar } from '../Avatar';

import { User, Comment } from '@infoshare-f3/shared-types';

export type CommentCardProps = {
  author: User;
  comment: Comment;
  isFirst?: boolean;
  isLast?: boolean;
};

export const CommentCard = (props: CommentCardProps) => {
  const { author, comment, isFirst, isLast } = props;
  return (
    <View style={tw`relative`}>
      <View
        style={[
          tw`absolute z-10 ml-4 top-0 bottom-0 left-6 bg-slate-200`,
          { width: 1 },
          isFirst && tw`top-1/2 bottom-0`,
          isLast && tw`top-0 bottom-1/2`,
        ]}
      />
      <View style={tw`relative z-20 z flex-row p-4`}>
        <Avatar profileImageUrl={author.profileImageUrl} />
        <View style={tw`flex-1 ml-4`}>
          <Text style={tw`text-base`}>{comment.text}</Text>
        </View>
      </View>
    </View>
  );
};
