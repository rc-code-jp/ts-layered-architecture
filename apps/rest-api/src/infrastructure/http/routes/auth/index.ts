import { Hono } from 'hono';
import { postRefreshToken } from './postRefreshToken';
import { postSignIn } from './postSignIn';
import { postSignUp } from './postSignUp';

const app = new Hono();

app.post('/signup', ...postSignUp);
app.post('/signin', ...postSignIn);
app.post('/refresh-token', ...postRefreshToken);

export const authRoute = app;
