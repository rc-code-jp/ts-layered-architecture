import { Context, Env } from "hono"

export const createResponse = (c: Context<Env, "/", {}>, result: any) => {
  return c.json({
    status: 200,
    headers: {},
    result,
  })
}