import { AuthController } from '@/interfaces/controllers/AuthController';
import { successResponse } from '@/interfaces/http/utils/responses';
import { createFactory } from 'hono/factory';
import { refreshTokenValidation } from '../../validators/auth';

const factory = createFactory();

/**
 * トークンをリフレッシュする
 */
export const postRefreshToken = factory.createHandlers(refreshTokenValidation, async (c) => {
  const body = c.req.valid('json');

  const authController = new AuthController();
  const res = await authController.refreshToken({
    refreshToken: body.refreshToken,
  });

  return successResponse(
    JSON.stringify({
      accessToken: res.accessToken,
      refreshToken: res.refreshToken,
    }),
  );
});
