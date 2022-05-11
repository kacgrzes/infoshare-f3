import React from 'react';
import { UserCardProps } from './UserCard.props';
import { View, Text } from 'react-native';
import { Button } from '../Button';
import { Avatar } from '../Avatar';
import tw from "twrnc";

export const UserCard = (props: UserCardProps) => {
  const { user, onPress } = props

  return (
    <View style={tw`justify-center items-center`}>
      <View style={tw`mb-3`}>
        <Avatar size='big' profileImageUrl={user.profileImageUrl}/>
      </View>
      <View style={tw`mb-3`}>
        <Text>{props.user.name} (@{user.username})</Text>
      </View>
      <View style={tw`w-full`}>
        <Button title={'Delete'} onPress={onPress} />
      </View>
    </View>
  );
};
