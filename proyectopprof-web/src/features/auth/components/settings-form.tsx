'use client';

import { ROUTES } from '@/constants/routes';
import { API_URLS } from '@/lib/fetch/constants';
import { patchRequestWithAuth } from '@/lib/fetch/utils';
import { UpdateUser, updateUserSchema } from '@/lib/zod/schemas/users.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';

export const SettingsForm = () => {
  const router = useRouter();

  const { register, handleSubmit } = useForm<UpdateUser>({
    resolver: zodResolver(updateUserSchema),
  });

  const onSubmit = async ({ bci, chile }: UpdateUser) => {
    const bankIds = [];
    if (bci) bankIds.push('bci');
    if (chile) bankIds.push('chile');

    try {
      const { message } = await patchRequestWithAuth(API_URLS.USERS, {
        bankIds,
      });
      enqueueSnackbar(message, { variant: 'success' });

      router.push(ROUTES.FEEDS);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Error al actualizar datos';
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
        py: { xs: 4, sm: 6 },
        mx: 'auto',
        mt: { xs: 6, sm: 8 },
      }}
    >
      <Typography
        variant="h5"
        textAlign="center"
        sx={{ fontSize: { xs: '1.5rem', sm: '1.8rem' } }}
      >
        Configuración Usuario
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <FormGroup>
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
            Actualizar
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};
