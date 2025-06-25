'use client';

import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Link from 'next/link';
import { useState } from 'react';
import { HeaderLayout } from './layouts/header-layout';

// Valores de navegación
const publicLinks = [
  { path: '/', name: 'Inicio' },
  { path: '/about', name: 'Sobre nosotros' },
  { path: '/register', name: 'Registrarse' },
  { path: '/login', name: 'Iniciar sesión' },
];

export const PublicHeader = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); // Móvil/tablet: md incluye 960px o menos
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  return (
    <HeaderLayout>
      {isMobile ? (
        <>
          <IconButton
            color="inherit"
            edge="start"
            onClick={toggleDrawer(true)}
            sx={{ ml: 1 }}
          >
            <MenuIcon />
          </IconButton>

          <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={toggleDrawer(false)}
          >
            <Box
              sx={{ width: 250 }}
              role="presentation"
              onClick={toggleDrawer(false)}
              onKeyDown={toggleDrawer(false)}
            >
              <List>
                {publicLinks.map(({ path, name }) => (
                  <ListItem key={path} disablePadding>
                    <Link
                      href={path}
                      style={{
                        width: '100%',
                        textDecoration: 'none',
                        color: 'inherit',
                      }}
                    >
                      <ListItemButton>
                        <ListItemText primary={name} />
                      </ListItemButton>
                    </Link>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Drawer>
        </>
      ) : (
        <Box sx={{ display: 'flex', gap: 2 }}>
          {publicLinks.map(({ path, name }) => (
            <Link
              key={path}
              href={path}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <Button sx={{ textTransform: 'none' }} color="inherit">
                {name}
              </Button>
            </Link>
          ))}
        </Box>
      )}
    </HeaderLayout>
  );
};
