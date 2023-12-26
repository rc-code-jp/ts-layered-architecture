import { jsonResponse } from '@/infrastructure/http/utils/responses';
import { AuthController } from '@/interfaces/controllers/AuthController';
import { createFactory } from 'hono/factory';
import { postSignUpValidation, refreshTokenValidation } from '../../validators/auth';

const factory = createFactory();

/**
 * リフレッシュトークンを無効化する
 */
export const postRevokeTokens = factory.createHandlers(refreshTokenValidation, async (c) => {
  const body = c.req.valid('json');
  const userId = c.get('userId');

  const authController = new AuthController();
  const res = await authController.revokeTokens({
    userId: userId,
  });

  return jsonResponse(
    JSON.stringify({
      res: res,
    }),
  );
});
