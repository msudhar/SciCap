import React from 'react';
import { AppBar, Toolbar, IconButton, Avatar, Box } from '@mui/material';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import SettingsIcon from '@mui/icons-material/Settings';

function Header() {
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <img src="/logo.PNG" alt="Logo" style={{ height: '100px' }} />
        </Box>
        <IconButton color="inherit">
          <NotificationsActiveIcon />
        </IconButton>
        <IconButton color="inherit">
          <SettingsIcon />
        </IconButton>
        <Avatar alt="User" src="/static/images/avatar/1.jpg" />
      </Toolbar>
    </AppBar>
  );
}

export default Header;
