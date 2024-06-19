import { invalidResponse } from '@/interfaces/http/utils/responses';
import { parseValidationError, z } from '@/interfaces/http/validators/zod';
import { zValidator } from '@hono/zod-validator';
import { createFactory } from 'hono/factory';

const factory = createFactory();

// YYYY-MM-DD
const dateRegex = /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

// HH:MM:SS
const timeRegex = /^([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/;

// POST・PATCH 共通のバリデーション
const saveParams = {
  taskGroupId: z.number().int(),
  title: z.string().max(200),
  dueDate: z.string().regex(dateRegex).optional(), // YYYY-MM-DD
  dueTime: z.string().regex(timeRegex).optional(), // HH:MM:SS
  description: z.string().max(250).optional(),
};

export const postValidation = factory.createMiddleware(
  zValidator(
    'json',
    z.object({
      ...saveParams,
    }),
    (result) => {
      if (!result.success) {
        const errors = parseValidationError(result.error.issues);
        return invalidResponse(errors);
      }
    },
  ),
);

export const patchValidation = factory.createMiddleware(
  zValidator(
    'json',
    z.object({
      ...saveParams,
    }),
    (result) => {
      if (!result.success) {
        const errors = parseValidationError(result.error.issues);
        return invalidResponse(errors);
      }
    },
  ),
);

export const patchDoneValidation = factory.createMiddleware(
  zValidator(
    'json',
    z.object({
      done: z.boolean(),
    }),
    (result) => {
      if (!result.success) {
        const errors = parseValidationError(result.error.issues);
        return invalidResponse(errors);
      }
    },
  ),
);

export const patchSortValidation = factory.createMiddleware(
  zValidator(
    'json',
    z.object({
      prevId: z.number().optional(),
      nextId: z.number().optional(),
    }),
    (result) => {
      if (!result.success) {
        const errors = parseValidationError(result.error.issues);
        return invalidResponse(errors);
      }
    },
  ),
);
