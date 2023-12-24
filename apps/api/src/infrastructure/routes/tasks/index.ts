import { Hono } from 'hono';
import { deleteDoneTasks } from './deleteDoneTasks';
import { patchTaskDone } from './patchTaskDone';
import { postTask } from './postTask';

const app = new Hono();

app.post('/', ...postTask);

app.patch('/:taskId/done', ...patchTaskDone);

app.delete('/done-tasks', ...deleteDoneTasks);

export const tasksRoute = app;
