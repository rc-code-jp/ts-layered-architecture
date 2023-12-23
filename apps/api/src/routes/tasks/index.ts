import { Hono } from 'hono';
import { deleteDoneTasks } from './deleteDoneTasks';
import { patchTaskDone } from './patchTaskDone';
import { postTaskHandlers } from './postTask';

const app = new Hono();

app.post('/', ...postTaskHandlers);

app.patch('/:taskId/done', ...patchTaskDone);

app.delete('/done-tasks', ...deleteDoneTasks);

export const tasksRoute = app;
