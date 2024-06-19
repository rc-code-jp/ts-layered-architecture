import { unauthorizedResponse } from '@/interfaces/http/utils/responses';
import { verifyAccessToken } from '@/utils/auth/jtw';
import { createFactory } from 'hono/factory';

const factory = createFactory<{
  Variables: {
    userId: number;
  };
}>();

export const isAuthenticated = factory.createMiddleware(async (c, next) => {
  const { authorization } = c.req.header();
  if (!authorization) {
    return unauthorizedResponse('Unauthorized');
  }

  try {
    const token = authorization.split(' ')[1];
    const payload = verifyAccessToken(token);
    c.set('userId', payload.userId);
    await next();
  } catch (_e) {
    return unauthorizedResponse('Unauthorized');
  }
});
