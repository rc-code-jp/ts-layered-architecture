import { Hono } from 'hono';
import { getTaskGroupOneHandlers } from './getTaskGroupOne';
import { getTaskGroupsHandlers } from './getTaskGroups';
import { patchTaskGroup } from './patchTaskGroup';
import { postTaskGroup } from './postTaskGroup';

const app = new Hono();

app.get('/', ...getTaskGroupsHandlers);

app.get('/:taskGroupId', ...getTaskGroupOneHandlers);

app.post('/', ...postTaskGroup);

app.patch('/:taskGroupId', ...patchTaskGroup);

export const taskGroupsRoute = app;
