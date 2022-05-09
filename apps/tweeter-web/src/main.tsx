import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Providers } from '@infoshare-f3/data-providers';
import App from './app/app';

const root = document.getElementById('root') as HTMLElement;

ReactDOM.render(
  <StrictMode>
    <Providers>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Providers>
  </StrictMode>,
  root
);
