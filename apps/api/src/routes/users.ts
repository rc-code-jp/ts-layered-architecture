import { db } from '@/lib/database';
import { createNotFountResponse, jsonResponse } from '@/utils';
import { Hono } from 'hono';

const app = new Hono();

app.get('/', async () => {
  const users = await db.user.findMany();
  return jsonResponse(
    JSON.stringify({
      list: users,
    }),
  );
});

app.get('/:id', async (c) => {
  const { id } = c.req.param();
  const user = await db.user.findFirst({
    where: {
      id: Number(id),
    },
  });

  if (!user) return createNotFountResponse();

  return jsonResponse(
    JSON.stringify({
      item: user,
    }),
  );
});

export const usersRoute = app;
