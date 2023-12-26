import { unauthorizedResponse } from '@/infrastructure/http/utils/responses';
import { verifyToken } from '@/utils/auth/jtw';
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
    const payload = verifyToken(token);
    console.dir(payload);
    c.set('userId', payload.userId);
    await next();
  } catch (err) {
    return unauthorizedResponse('Unauthorized');
  }
});
