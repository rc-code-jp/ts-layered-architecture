export const useAuthToken = () => {
  const accessToken = useCookie('accessToken');
  const refreshToken = useCookie('refreshToken');

  return {
    getToken: (): {
      accessToken: string | null;
      refreshToken: string | null;
    } => ({
      accessToken: accessToken.value ?? null,
      refreshToken: refreshToken.value ?? null,
    }),
    setToken: (params: {
      accessToken: string;
      refreshToken: string;
    }): void => {
      accessToken.value = params.accessToken;
      refreshToken.value = params.refreshToken;
    },
    clearToken: () => {
      accessToken.value = null;
      refreshToken.value = null;
    },
  };
};
