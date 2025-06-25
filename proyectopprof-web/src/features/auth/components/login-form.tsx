'use client';

import { ROUTES } from '@/constants/routes';
import { API_URLS } from '@/lib/fetch/constants';
import { postRequest } from '@/lib/fetch/utils';
import { setToken } from '@/lib/localstorage/utils/token-storage';
import { LoginAuth, loginAuthSchema } from '@/lib/zod/schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';

export const LoginForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginAuth>({ resolver: zodResolver(loginAuthSchema) });

  const onSubmit = async ({ email, password }: LoginAuth) => {
    try {
      const { token } = await postRequest(API_URLS.LOGIN, { email, password });
      setToken(token);
      enqueueSnackbar('Login exitoso', { variant: 'success' });

      router.push(ROUTES.FEEDS);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Error al iniciar sesión';
      enqueueSnackbar(message, { variant: 'error' });
    }
  };

  return (
    <Stack
      component={Paper}
      spacing={2}
      sx={{
        width: {
          xs: '90%',
          sm: '400px',
        },
        maxWidth: '100%',
        px: { xs: 3, sm: 6 },
        py: { xs: 4, sm: 6, md: 8 },
        mx: 'auto',
        mt: { xs: 6, sm: 8 },
      }}
    >
      <Typography
        variant="h5"
        textAlign="center"
        sx={{ fontSize: { xs: '1.5rem', sm: '1.8rem' } }}
      >
        Iniciar Sesión
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <TextField
            label="Correo electrónico"
            type="email"
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register('email')}
            fullWidth
          />
          <TextField
            label="Contraseña"
            type="password"
            error={!!errors.password}
            helperText={errors.password?.message}
            {...register('password')}
            fullWidth
          />
          <Button type="submit" variant="contained" fullWidth>
            Entrar
          </Button>
        </Stack>
      </form>

      {/* Opción para crear cuenta */}
      <Typography
        variant="body2"
        textAlign="center"
        sx={{ mt: 2, fontSize: { xs: '0.85rem', sm: '1rem' } }}
      >
        ¿No tienes cuenta?{' '}
        <Link
          href={ROUTES.REGISTER}
          style={{ color: '#1976d2', fontWeight: 500 }}
        >
          Crea una cuenta
        </Link>
      </Typography>
    </Stack>
  );
};
