import { Hono } from 'hono';
import { deleteDoneTasks } from './deleteDoneTasks';
import { deleteTask } from './deleteTask';
import { patchTask } from './patchTask';
import { patchTaskDone } from './patchTaskDone';
import { postTask } from './postTask';

const app = new Hono();

app.post('/', ...postTask);

app.patch('/:taskId', ...patchTask);

app.patch('/:taskId/done', ...patchTaskDone);

app.delete('/:taskId', ...deleteTask);

app.delete('/done-tasks', ...deleteDoneTasks);

export const tasksRoute = app;
