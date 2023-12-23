import { Hono } from 'hono';
import { deleteTaskGroup } from './deleteTaskGroup';
import { getTaskGroupOneHandlers } from './getTaskGroupOne';
import { getTaskGroupsHandlers } from './getTaskGroups';
import { patchTaskGroup } from './patchTaskGroup';
import { postTaskGroup } from './postTaskGroup';

const app = new Hono();

app.get('/', ...getTaskGroupsHandlers);

app.get('/:taskGroupId', ...getTaskGroupOneHandlers);

app.post('/', ...postTaskGroup);

app.patch('/:taskGroupId', ...patchTaskGroup);

app.delete('/:taskGroupId', ...deleteTaskGroup);

export const taskGroupsRoute = app;
