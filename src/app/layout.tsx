'use client';
import Head from 'next/head';
import { Auth0Provider } from '@auth0/auth0-react';
import theme from './styles/theme';

import { ReactNode, useState, useEffect } from 'react';
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText, ThemeProvider,
  Toolbar,
  Typography,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuIcon from '@mui/icons-material/Menu';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useAuth0 } from '@auth0/auth0-react';
import StyledJsxRegistry from './registry';

const drawerWidth = 240;

function Base(props: {
  children: ReactNode;
}): JSX.Element {
  const { children } = props;
  const { isAuthenticated, isLoading, loginWithRedirect, logout } = useAuth0();
  const [drawerOpen, setDrawerOpen] = useState(isLoading);

  function handleDrawerToggle() {
    setDrawerOpen(!drawerOpen);
  }

  return (
    <Box sx={{ display: 'flex', color: '#fff' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ marginLeft: drawerWidth, width: `calc(100% - ${drawerWidth}px)` }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ marginRight: '2em', display: 'none' }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap />
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open>
        <Divider />
        <List>
          {['Info'].map((text) => (
            <ListItem button key={text} sx={{ color: '#fff' }}>
              <ListItemIcon sx={{ color: '#fff' }}>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
          {['Auth'].map(() => {
            if (isAuthenticated) {
              return (
                <ListItem
                  button
                  key="logout"
                  onClick={() => logout()}
                  sx={{ color: '#fff' }}
                >
                  <ListItemIcon sx={{ color: '#fff' }}>
                    <ExitToAppIcon />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItem>
              );
            }
            return (
              <ListItem
                button
                key="logoin"
                onClick={() => loginWithRedirect}
                sx={{ color: '#fff' }}
              >
                <ListItemIcon sx={{ color: '#fff' }}>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary="Login" />
              </ListItem>
            );
          })}
        </List>
      </Drawer>
      <Box style={{ flexGrow: 1 }}>
        <Box />
        {children}
      </Box>
    </Box>
  );
};

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

export default function Layout({ children }: { children: ReactNode }): JSX.Element {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles?.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);

  return (
    <html lang="en">
      <body>
        <StyledJsxRegistry>
          <ThemeProvider theme={theme}>
            <Auth0Provider
              domain={auth0Config.domain}
              clientId={auth0Config.clientId}
              authorizationParams={auth0Param}
            >
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <Head>
                <title>Home</title>
                <link rel="icon" href="/favicon.ico" />
              </Head>
              {/* ThemeProvider makes the theme available down the React
            tree thanks to React context. */}

              <CssBaseline />
              <Base>{children}</Base>
            </Auth0Provider>
          </ThemeProvider>
        </StyledJsxRegistry>
      </body>
    </html>
  );
};
