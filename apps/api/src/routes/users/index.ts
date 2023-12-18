import { Hono } from 'hono';
import { getUserOneHandlers } from './getUserOne';
import { getUsersHandlers } from './getUsers';
import { postUserHandlers } from './postUser';

const app = new Hono();

app.get('/', ...getUsersHandlers);

app.get('/:id', ...getUserOneHandlers);

app.post('/', ...postUserHandlers);

export const usersRoute = app;
