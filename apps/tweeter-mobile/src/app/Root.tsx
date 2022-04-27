import React, { FC } from 'react';
import utilities from '../../tailwind.json';
import { TailwindProvider } from 'tailwind-rn';
import App from './App';

export const Root: FC = ({ children }) => {
  return (
    <TailwindProvider utilities={utilities}>
      <App />
    </TailwindProvider>
  );
};
