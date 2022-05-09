import React from 'react';
import clsx from 'clsx';
import { AvatarProps } from './Avatar.props';

export const Avatar = (props: AvatarProps) => {
  const { size = 'normal', onPress, profileImageUrl } = props

  return (
    <img
      onClick={onPress}
      className={clsx(
        'bg-gray rounded-full',
        size === 'small' && 'w-8 h-8',
        size === 'normal' && 'w-12 h-12',
        size === 'big' && 'w-16 h-16'
      )}
      src={profileImageUrl}
      alt={'avatar'}
    />
  );
};
