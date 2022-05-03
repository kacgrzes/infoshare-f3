import React from 'react';
import utilities from '../tailwind.json';
import { TailwindProvider } from 'tailwind-rn';
import App from './App';

export const Root = () => {
  return (
    <TailwindProvider utilities={utilities}>
      <App />
    </TailwindProvider>
  );
};
