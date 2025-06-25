'use client';

import { Box, CircularProgress, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const WelcomeSplash = () => {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push('/login'); // Redirige al login tras 3 segundos
    }, 3000);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2,
        textAlign: 'center',
      }}
    >
      <Typography variant="h4" gutterBottom>
        ¡Registro exitoso!
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Bienvenido a FinSight. Serás redirigido en un momento...
      </Typography>
      <Box sx={{ mt: 4 }}>
        <CircularProgress color="primary" />
      </Box>
    </Box>
  );
};
