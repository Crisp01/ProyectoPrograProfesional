'use client';

import { ROUTES } from '@/constants/routes';
import { API_URLS } from '@/lib/fetch/constants';
import { postRequest } from '@/lib/fetch/utils';
import {
  RegisterAuth,
  registerAuthSchema,
} from '@/lib/zod/schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';

export const RegisterForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterAuth>({ resolver: zodResolver(registerAuthSchema) });

  const onSubmit = async ({ email, password, bci, chile }: RegisterAuth) => {
    const bankIds = [];
    if (bci) bankIds.push('bci');
    if (chile) bankIds.push('chile');

    try {
      const { message } = await postRequest(API_URLS.USERS, {
        email,
        password,
        bankIds,
      });
      enqueueSnackbar(message, { variant: 'success' });
      router.push('/welcome');
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Something went wrong';
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
        Regístrate
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

          <FormGroup row sx={{ justifyContent: 'center' }}>
            <FormControlLabel
              control={<Checkbox {...register('bci')} />}
              label="Banco BCI"
            />
            <FormControlLabel
              control={<Checkbox {...register('chile')} />}
              label="Banco de Chile"
            />
          </FormGroup>

          <Button type="submit" variant="contained" fullWidth>
            Registrarse
          </Button>
        </Stack>
      </form>

      {/* Mensaje de confirmación */}
      <Typography
        variant="body2"
        textAlign="center"
        sx={{ mt: 2, fontSize: { xs: '0.85rem', sm: '1rem' } }}
      >
        ¿Ya tienes cuenta?{' '}
        <Link href={ROUTES.LOGIN} style={{ color: '#1976d2', fontWeight: 500 }}>
          Inicia sesión
        </Link>
      </Typography>
    </Stack>
  );
};
