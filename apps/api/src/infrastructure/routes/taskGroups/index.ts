import { Hono } from 'hono';
import { deleteTaskGroup } from './deleteTaskGroup';
import { getTaskGroupOne } from './getTaskGroupOne';
import { getTaskGroups } from './getTaskGroups';
import { patchTaskGroup } from './patchTaskGroup';
import { postTaskGroup } from './postTaskGroup';

const app = new Hono();

app.get('/', ...getTaskGroups);

app.get('/:taskGroupId', ...getTaskGroupOne);

app.post('/', ...postTaskGroup);

app.patch('/:taskGroupId', ...patchTaskGroup);

app.delete('/:taskGroupId', ...deleteTaskGroup);

export const taskGroupsRoute = app;
