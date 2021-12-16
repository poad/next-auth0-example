import * as React from 'react';
import type { AppProps } from 'next/app';

import Head from 'next/head';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { AuthProvider } from 'use-auth0';
import router from 'next/dist/client/router';
import { useEffect } from 'react';
import theme from '../styles/theme';

interface Auth0Config {
  domain: string;
  clientId: string;
  callbackUrl: string;
}

interface Auth0Param {
  domain: string;
  clientId: string;
  redirectUri: string;
}

const auth0Config: Auth0Config = {
  domain: process.env.NEXT_PUBLIC_AUTH0_DOMAIN as string,
  clientId: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID as string,
  callbackUrl: process.env.NEXT_PUBLIC_CALLBACK_URL as string,
};

const auth0Param: Auth0Param = {
  domain: process.env.NEXT_PUBLIC_AUTH0_DOMAIN as string,
  clientId: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID as string,
  redirectUri: process.env.NEXT_PUBLIC_CALLBACK_URL as string,
};

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider
        navigate={(route: string) => router.push(route)}
        auth0_domain={auth0Config.domain}
        auth0_client_id={auth0Config.clientId}
        auth0_params={auth0Param}
      >
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <Head>
          <title>Home</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {/* ThemeProvider makes the theme available down the React
            tree thanks to React context. */}

        <CssBaseline />
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
