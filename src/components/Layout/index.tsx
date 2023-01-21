import React, { PropsWithChildren, useState } from 'react';
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
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuIcon from '@mui/icons-material/Menu';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useAuth0 } from '@auth0/auth0-react';

const drawerWidth = 240;

interface LayoutProps {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  container?: Element;
}

const Layout = (props: PropsWithChildren<LayoutProps>): JSX.Element => {
  const { container } = props;
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
      <Drawer container={container} variant="permanent" open>
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
        {props.children}
      </Box>
    </Box>
  );
};

export default Layout;
