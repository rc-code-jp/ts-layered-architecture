import { Hono } from 'hono';
import { isAuthenticated } from '../../middlewares/isAuthenticated';
import { deleteTaskGroup } from './deleteTaskGroup';
import { getTaskGroup } from './getTaskGroup';
import { getTaskGroupList } from './getTaskGroupList';
import { patchTaskGroup } from './patchTaskGroup';
import { patchTaskGroupSort } from './patchTaskGroupSort';
import { postTaskGroup } from './postTaskGroup';

const app = new Hono();

app.use('*', isAuthenticated);

app.get('/', ...getTaskGroupList);

app.get('/:taskGroupId', ...getTaskGroup);

app.post('/', ...postTaskGroup);

app.patch('/:taskGroupId', ...patchTaskGroup);

app.patch('/:taskGroupId/sort', ...patchTaskGroupSort);

app.delete('/:taskGroupId', ...deleteTaskGroup);

export const taskGroupsRoute = app;
