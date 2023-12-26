import { Hono } from 'hono';
import { isAuthenticated } from '../../middlewares/isAuthenticated';
import { deleteDoneTasks } from './deleteDoneTasks';
import { deleteTask } from './deleteTask';
import { patchTask } from './patchTask';
import { patchTaskDone } from './patchTaskDone';
import { postTask } from './postTask';

const app = new Hono();

app.use('*', isAuthenticated);

app.post('/', ...postTask);

app.patch('/:taskId', ...patchTask);

app.patch('/:taskId/done', ...patchTaskDone);

app.delete('/:taskId', ...deleteTask);

app.delete('/done-tasks', ...deleteDoneTasks);

export const tasksRoute = app;
