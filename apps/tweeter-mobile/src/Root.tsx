import React from 'react';
import { Providers } from '@infoshare-f3/data-providers';
import App from './App';

export const Root = () => {
  return (
    <Providers>
      <App />
    </Providers>
  );
};
