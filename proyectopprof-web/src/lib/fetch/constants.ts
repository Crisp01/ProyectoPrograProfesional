import { ENV } from '@/config/env';

export const API_URLS = {
  LOGIN: `${ENV.NEXT_PUBLIC_API_URL}/auth/login`,
  USERS: `${ENV.NEXT_PUBLIC_API_URL}/users`,
  FEEDS: `${ENV.NEXT_PUBLIC_API_URL}/feeds`,
} as const;
