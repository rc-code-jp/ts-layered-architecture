// import { clearAuthToken, getAuthToken, setAuthToken } from '~/_auth';

type Options = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: Record<string, string | number | boolean | undefined | null>;
};

const setAuthToken = (_arg: { accessToken: string; refreshToken: string }) => {};
const clearAuthToken = () => {};

export default defineNuxtPlugin((nuxtApp) => {
  const baseUrl = nuxtApp.$config.public.API_URL ?? '';

  return {
    provide: {
      customFetch: <T>(path: string, options: Options = {}) => {
        const authToken = {
          accessToken: null,
          refreshToken: null,
        };

        const defaultHeaders = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken.accessToken}`,
        };

        const url = `${baseUrl}${path}`;

        // Nuxt標準のfetchを使う
        return $fetch<T>(url, {
          method: options.method ?? 'GET',
          headers: {
            ...defaultHeaders,
            ...options.headers,
          },
          body: options.body,
          retryStatusCodes: [401],
          onResponseError: async (ctx) => {
            // リフレッシュトークンがあればリフレッシュトークンを使ってアクセストークンを更新する
            if (ctx.response.status === 401 && authToken.refreshToken) {
              try {
                const tokenRes = await $fetch<{
                  accessToken: string;
                  refreshToken: string;
                }>(`${baseUrl}/auth/refresh-token`, {
                  method: 'POST',
                  headers: defaultHeaders,
                  body: {
                    refreshToken: authToken.refreshToken,
                  },
                });
                setAuthToken({
                  accessToken: tokenRes.accessToken,
                  refreshToken: tokenRes.refreshToken,
                });
                ctx.options.headers = {
                  ...ctx.options.headers,
                  Authorization: `Bearer ${tokenRes.accessToken}`,
                };
              } catch (_e) {
                clearAuthToken();
              }
            }
          },
        });
      },
    },
  };
});
