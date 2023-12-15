import { usersRoute } from '@/routes/users';
import { createResponse } from '@/utils';
import { serve } from '@hono/node-server';
import { Hono } from 'hono';

const api = new Hono().basePath('/api');

/**
 * ユーザー関連のルート
 */
api.route('/users', usersRoute);

api.get('/hc', (_c) => createResponse(''));

serve(api);

// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log('Server running http://localhost:3000/api');
