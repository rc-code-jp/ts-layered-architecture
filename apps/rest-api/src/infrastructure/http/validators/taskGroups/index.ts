import { invalidResponse } from '@/infrastructure/http/utils/responses';
import { parseValidationError, z } from '@/infrastructure/http/validators/zod';
import { zValidator } from '@hono/zod-validator';
import { createFactory } from 'hono/factory';

const factory = createFactory();

// YYYY-MM-DD
const dateRegex = /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

// HH:MM:SS
const timeRegex = /^([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/;

// POST・PATCH 共通のバリデーション
const saveParams = {
  name: z.string().max(50),
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
      id: z.number().int(),
    }),
    (result) => {
      if (!result.success) {
        const errors = parseValidationError(result.error.issues);
        return invalidResponse(errors);
      }
    },
  ),
);
