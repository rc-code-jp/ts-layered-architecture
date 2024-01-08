type Options = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: Record<string, string | number | boolean | undefined | null>;
};

export default defineNuxtPlugin((nuxtApp) => {
  const baseUrl = nuxtApp.$config.public.API_URL ?? '';
  const { setToken, getToken, clearToken } = useAuthToken();

  return {
    provide: {
      customFetch: <T>(path: string, options: Options = {}) => {
        const authToken = getToken();

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
                setToken({
                  accessToken: tokenRes.accessToken,
                  refreshToken: tokenRes.refreshToken,
                });
                ctx.options.headers = {
                  ...ctx.options.headers,
                  Authorization: `Bearer ${tokenRes.accessToken}`,
                };
              } catch (_e) {
                clearToken();
              }
            }
          },
        });
      },
    },
  };
});
