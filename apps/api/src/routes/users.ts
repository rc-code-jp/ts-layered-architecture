import db from '@/lib/database'
import { createResponse } from '@/utils'
import { Hono } from 'hono'


const app = new Hono()

app.get('/', async (c) => {
  const user = await db.user.findMany()
  console.log(user)
  return createResponse(c, { message: user })
})


export const usersRoute = app