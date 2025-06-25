'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function AboutPage() {
  return (
    <Box
      component="main"
      sx={{
        width: { xs: '90%', sm: '85%', md: '70%', lg: '60%' },
        mx: 'auto',
        py: { xs: 4, sm: 6, md: 8 },
      }}
    >
      <Typography
        component="h1"
        variant="h4"
        sx={{
          pb: { xs: 2, sm: 3 },
          fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' },
          textAlign: { xs: 'center', sm: 'left' },
        }}
      >
        Quiénes Somos
      </Typography>

      <Typography
        component="p"
        sx={{
          fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
          textAlign: { xs: 'justify', sm: 'left' },
        }}
      >
        Conoce los beneficios de los distintos bancos a lo largo de todo el
        país.
      </Typography>
    </Box>
  );
}
