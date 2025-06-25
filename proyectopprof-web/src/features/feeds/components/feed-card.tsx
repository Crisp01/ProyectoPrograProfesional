import { Feed } from '@/features/feeds/types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Image from 'next/image';

export const FeedCard = ({
  url,
  image,
  title,
  description,
  bankId,
  createdAt,
}: Feed) => (
  <Card sx={{ maxWidth: 600, mx: 'auto', width: '100%' }}>
    <CardContent>
      <Stack spacing={2}>
        <Stack
          spacing={2}
          direction={{ xs: 'column', sm: 'row' }}
          alignItems={{ xs: 'center', sm: 'flex-start' }}
        >
          <Box
            sx={{
              flexShrink: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image
              src={image}
              alt="feed-image"
              width={150}
              height={150}
              style={{
                maxWidth: '100%',
                height: 'auto',
                borderRadius: '8px',
              }}
            />
          </Box>

          <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {bankId} · {new Date(createdAt).toLocaleString()}
            </Typography>
          </Box>
        </Stack>

        <Button
          component="a"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          variant="outlined"
          fullWidth
        >
          Más información
        </Button>
      </Stack>
    </CardContent>
  </Card>
);
