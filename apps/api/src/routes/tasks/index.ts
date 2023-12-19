import { Hono } from 'hono';
import { patchTaskDoneHandlers } from './patchTaskDone';
import { postTaskHandlers } from './postTask';

const app = new Hono();

app.post('/', ...postTaskHandlers);

app.post('/', ...patchTaskDoneHandlers);

export const taskGroupsRoute = app;
