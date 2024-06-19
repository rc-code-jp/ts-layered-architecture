import { AuthController } from '@/interfaces/controllers/AuthController';
import { successResponse } from '@/interfaces/http/utils/responses';
import { createFactory } from 'hono/factory';
import { isAuthenticated } from '../../middlewares/isAuthenticated';

const factory = createFactory();

/**
 * サインアップ
 */
export const getAuthMe = factory.createHandlers(isAuthenticated, async (c) => {
  const userId = c.get('userId');

  const authController = new AuthController();
  const res = await authController.getAuthMe({
    userId: userId,
  });

  return successResponse(
    JSON.stringify({
      user: res.item,
    }),
  );
});
