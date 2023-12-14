import { serve } from '@hono/node-server'
import { Hono } from 'hono'

import { usersRoute } from './routes/users'

const api = new Hono().basePath('/api')

/**
 * ユーザー関連のルート
 */
api.route('/users', usersRoute)

api.get('/', (c) => c.text('Hello Hono!'))

serve(api)

console.log('Server running http://localhost:3000/api')