import { Hono } from 'hono';
import { postSignUp } from './postSignUp';

const app = new Hono();

app.post('/signup', ...postSignUp);

export const authRoute = app;
