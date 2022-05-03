import React from 'react';
import { ButtonProps } from './Button.props'

export const Button = (props: ButtonProps) => {
  return (
    <button className="h-11 max-h-11 bg-blue text-white justify-center items-center rounded-full px-4">
      Hello!
    </button>
  );
};
