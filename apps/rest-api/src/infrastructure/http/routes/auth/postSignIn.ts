import { jsonResponse } from '@/infrastructure/http/responses';
import { AuthController } from '@/interfaces/controllers/AuthController';
import { createFactory } from 'hono/factory';
import { postSignInValidation } from '../../validators/users';

const factory = createFactory();

/**
 * サインイン
 */
export const postSignIn = factory.createHandlers(postSignInValidation, async (c) => {
  const body = c.req.valid('json');

  const authController = new AuthController();
  const res = await authController.signIn({
    email: body.email,
    password: body.password,
  });

  return jsonResponse(
    JSON.stringify({
      accessToken: res.accessToken,
      refreshToken: res.refreshToken,
    }),
  );
});
