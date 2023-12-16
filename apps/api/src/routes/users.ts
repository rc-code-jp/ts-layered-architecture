import { db } from '@/lib/database';
import { z } from '@/lib/zod';
import { invalidResponse, jsonResponse, notFountResponse } from '@/utils';
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';

const app = new Hono();

/**
 * ユーザー一覧取得
 */
app.get('/', async () => {
  const users = await db.user.findMany();
  return jsonResponse(
    JSON.stringify({
      list: users,
    }),
  );
});

/**
 * ユーザー詳細取得
 */
app.get('/:id', async (c) => {
  const { id } = c.req.param();
  const user = await db.user.findFirst({
    where: {
      id: Number(id),
    },
  });

  if (!user) return notFountResponse();

  return jsonResponse(
    JSON.stringify({
      item: user,
    }),
  );
});

/**
 * ユーザー作成
 */
app.post(
  '/',
  /** バリデーション */
  zValidator(
    'json',
    z.object({
      name: z.string().max(50),
      email: z.string().email(),
    }),
    (result) => {
      if (!result.success) return invalidResponse(result.error.issues);
    },
  ),
  /** 処理 */
  async (c) => {
    const body = c.req.valid('json');
    const user = await db.user.create({
      data: {
        email: body.email,
      },
    });

    if (!user) return notFountResponse();

    return jsonResponse(
      JSON.stringify({
        item: user,
      }),
    );
  },
);

export const usersRoute = app;
