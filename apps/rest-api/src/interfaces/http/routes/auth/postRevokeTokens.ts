import { AuthController } from '@/interfaces/controllers/AuthController';
import { successResponse } from '@/interfaces/http/utils/responses';
import { createFactory } from 'hono/factory';
import { refreshTokenValidation } from '../../validators/auth';

const factory = createFactory();

/**
 * リフレッシュトークンを無効化する
 */
export const postRevokeTokens = factory.createHandlers(refreshTokenValidation, async (c) => {
  const userId = c.get('userId');

  const authController = new AuthController();
  const res = await authController.revokeTokens({
    userId: userId,
  });

  return successResponse(
    JSON.stringify({
      res: res,
    }),
  );
});
