import { PrismaClient } from '@prisma/client';

const isDev = process.env.NODE_ENV === 'development';

export const db = new PrismaClient({
  log: isDev ? ['query', 'error', 'warn', 'info'] : ['error'],
});
