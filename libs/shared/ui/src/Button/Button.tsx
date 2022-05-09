import React from 'react';
import clsx from 'clsx';
import { ButtonProps } from './Button.props';

export const Button = ({
  title,
  size = 'normal',
  onPress,
  disabled,
}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      onClick={onPress}
      className={clsx(
        disabled ? 'bg-gray' : 'bg-blue',
        'text-white justify-center items-center rounded-full px-4',
        size === 'small' && 'h-8 max-h-8',
        size === 'normal' && 'h-11 max-h-11'
      )}
    >
      {title}
    </button>
  );
};
