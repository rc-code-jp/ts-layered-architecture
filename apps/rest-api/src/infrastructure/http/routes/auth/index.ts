import { Hono } from 'hono';
import { postSignIn } from './postSignIn';
import { postSignUp } from './postSignUp';

const app = new Hono();

app.post('/signup', ...postSignUp);
app.post('/signin', ...postSignIn);

export const authRoute = app;
