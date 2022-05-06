import React from 'react';
import utilities from '../tailwind.json';
import { TailwindProvider } from 'tailwind-rn';
import { Providers } from '@infoshare-f3/data-providers';
import App from './App';

export const Root = () => {
  return (
    <TailwindProvider utilities={utilities}>
      <Providers>
        <App />
      </Providers>
    </TailwindProvider>
  );
};
