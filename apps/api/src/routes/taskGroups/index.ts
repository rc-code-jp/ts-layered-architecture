import { Hono } from 'hono';
import { getTaskGroupOneHandlers } from './getTaskGroupOne';
import { getTaskGroupsHandlers } from './getTaskGroups';
import { postTaskGroupHandlers } from './postTaskGroup';

const app = new Hono();

app.get('/', ...getTaskGroupsHandlers);

app.get('/:id', ...getTaskGroupOneHandlers);

app.post('/', ...postTaskGroupHandlers);

export const taskGroupsRoute = app;
