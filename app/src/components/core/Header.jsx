import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Container,
  Button,
  Link,
} from '@mui/material';

const pages = [
  { title: 'Browse', url: 'google.com' },
  { title: 'Start a Project', url: '/campaigns' },
  { title: 'Accounts', url: '/accounts' },
];
export default function Header({ logout, login, isAuthenticated }) {
  let history = useNavigate();
  const handleRedirect = (url) => {
    history(url);
    console.log(url);
  };

  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Typography
            variant='h4'
            noWrap
            component='div'
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            <NavLink style={{textDecoration:"none",color: 'white'}} to='/'>KickStart</NavLink>
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'center',
            }}
          >
            {pages.map((item) => {
              return (
                <Button
                  key={item.title}
                  onClick={() => handleRedirect(item.url)}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {item.title}
                </Button>
              );
            })}
          </Box>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'flex-end',
            }}
          >
            <Button
              onClick={!isAuthenticated ? () => login() : () => logout()}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              {!isAuthenticated ? 'Login' : 'Logout'}
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
