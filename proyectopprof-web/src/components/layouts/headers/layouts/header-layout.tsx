'use client';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import useMediaQuery from '@mui/material/useMediaQuery';
import Image from 'next/image';
import { PropsWithChildren } from 'react';

export const HeaderLayout = ({ children }: PropsWithChildren) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <header>
      <AppBar position="fixed" color="primary">
        <Toolbar
          sx={{
            width: '100%',
            px: { xs: 2, sm: 3, md: '5%' },
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo a la izquierda */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Image
              src="/images/FinSightLogo.png"
              alt="FinSight Logo"
              width={isMobile ? 45 : 65}
              height={isMobile ? 45 : 65}
            />
          </Box>

          {/* Botones o icono hamburguesa alineado a la derecha */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              flexDirection: 'row',
            }}
          >
            {children}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Espacio extra para compensar AppBar fijo */}
      <Toolbar />
    </header>
  );
};
