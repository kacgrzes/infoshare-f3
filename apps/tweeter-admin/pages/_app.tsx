import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import './tailwind.css';
import { Providers } from '@infoshare-f3/data-providers'

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to tweeter-admin!</title>
      </Head>
      <main className="app">
        <Providers>
          <Component {...pageProps} />
        </Providers>
      </main>
    </>
  );
}

export default CustomApp;
