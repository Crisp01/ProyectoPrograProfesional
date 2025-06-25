'use client';

import { removeToken } from '@/lib/localstorage/utils/token-storage';
import LogoutIcon from '@mui/icons-material/Logout';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useRouter } from 'next/navigation';

export const SignoutButton = () => {
  const router = useRouter();
  const theme = useTheme();

  // Breakpoints
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const handleClickSignout = () => {
    removeToken();
    router.replace('/');
  };

  const buttonContent = (
    <>
      <LogoutIcon fontSize={isMobile ? 'small' : 'medium'} />
      {(isTablet || isDesktop) && 'Cerrar sesión'}
    </>
  );

  return (
    <Tooltip title={isMobile ? 'Cerrar sesión' : ''}>
      <Button
        onClick={handleClickSignout}
        variant="outlined"
        color="inherit"
        sx={{
          textTransform: 'none',
          minWidth: isMobile ? '40px' : 'auto',
          padding: isMobile ? '6px' : '8px 16px',
          fontSize: isMobile ? '0.75rem' : isTablet ? '0.875rem' : '1rem',
          gap: isTablet || isDesktop ? 1 : 0,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {buttonContent}
      </Button>
    </Tooltip>
  );
};
