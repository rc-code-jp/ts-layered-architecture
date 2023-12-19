import { Hono } from 'hono';
import { patchTaskDone } from './patchTaskDone';
import { postTaskHandlers } from './postTask';

const app = new Hono();

app.post('/', ...postTaskHandlers);

app.patch('/:taskId/done', ...patchTaskDone);

export const tasksRoute = app;
