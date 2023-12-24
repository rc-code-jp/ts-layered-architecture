import { Hono } from 'hono';
import { deleteTaskGroup } from './deleteTaskGroup';
import { getTaskGroupList } from './getTaskGroupList';
import { getTaskGroupOne } from './getTaskGroupOne';
import { patchTaskGroup } from './patchTaskGroup';
import { postTaskGroup } from './postTaskGroup';

const app = new Hono();

app.get('/', ...getTaskGroupList);

app.get('/:taskGroupId', ...getTaskGroupOne);

app.post('/', ...postTaskGroup);

app.patch('/:taskGroupId', ...patchTaskGroup);

app.delete('/:taskGroupId', ...deleteTaskGroup);

export const taskGroupsRoute = app;
