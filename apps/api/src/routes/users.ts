import { createResponse } from '@/utils'
import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return createResponse(c, { message: 'Hello World!' })
})


export const usersRoute = app