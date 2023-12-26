import { jsonResponse } from '@/infrastructure/http/responses';
import { AuthController } from '@/interfaces/controllers/AuthController';
import { createFactory } from 'hono/factory';
import { postSignUpValidation } from '../../validators/users';

const factory = createFactory();

/**
 * タスクグループ作成
 */
export const postSignUp = factory.createHandlers(postSignUpValidation, async (c) => {
  const body = c.req.valid('json');

  const authController = new AuthController();
  const res = await authController.signUp({
    email: body.email,
    password: body.password,
    name: body.name,
  });

  return jsonResponse(
    JSON.stringify({
      accessToken: res.accessToken,
      refreshToken: res.refreshToken,
    }),
  );
});
