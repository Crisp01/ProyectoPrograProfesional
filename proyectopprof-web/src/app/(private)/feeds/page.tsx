import { Feeds } from '@/features/feeds/components';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export default function FeedsPage() {
  return (
    <Container maxWidth="sm" component="main">
      <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
        Feed de Publicaciones
      </Typography>

      <Feeds />
    </Container>
  );
}
