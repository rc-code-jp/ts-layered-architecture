import { getAuthToken } from '~/_auth';

type Options = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: BodyInit;
};

export default defineNuxtPlugin((nuxtApp) => {
  const baseUrl = nuxtApp.$config.public.API_URL ?? '';

  return {
    provide: {
      customFetch: <T>(path: string, options: Options = {}) => {
        const authToken = getAuthToken();

        const defaultHeaders = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken.accessToken}`,
        };

        // Nuxt標準のfetchを使う
        return $fetch<T>(`${baseUrl}${path}`, {
          method: options.method ?? 'GET',
          headers: {
            ...defaultHeaders,
            ...options.headers,
          },
          body: options.body ?? undefined,
        });
      },
    },
  };
});
