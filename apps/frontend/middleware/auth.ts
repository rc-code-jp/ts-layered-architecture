export default defineNuxtRouteMiddleware(async (to) => {
  const { getToken, clearToken } = useAuthToken();
  try {
    const token = getToken();
    if (!token.accessToken) {
      clearToken();
      throw new Error('Unauthorized');
    }
  } catch (_err) {
    if (to.path !== '/auth/signin') {
      return navigateTo('/auth/signin');
    }
  }
});
