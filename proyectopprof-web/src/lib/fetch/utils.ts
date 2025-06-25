import { getToken } from '@/lib/localstorage/utils/token-storage';

// Types
type Body = Record<string, unknown>;

// Utils
const request = async ({
  url,
  method,
  hasAuth,
  body,
}: {
  url: string;
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  hasAuth: boolean;
  body?: Body;
}) => {
  const res = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(hasAuth && { Authorization: `Bearer ${getToken()}` }),
    },
    ...(body && { body: JSON.stringify(body) }),
  });
  const resJson = await res.json();
  if (!res.ok) throw new Error(resJson.message || 'Something went wrong');

  return resJson;
};

// Requests
export const getRequestWithAuth = async (url: string) =>
  request({ url, method: 'GET', hasAuth: true });

export const postRequest = async (url: string, body: Body) =>
  request({ url, method: 'POST', hasAuth: false, body });

export const patchRequestWithAuth = async (url: string, body: Body) =>
  request({ url, method: 'PATCH', hasAuth: true, body });
