import { invalidResponse } from '@/infrastructure/http/utils/responses';
import { parseValidationError, z } from '@/infrastructure/http/validators/zod';
import { zValidator } from '@hono/zod-validator';
import { createFactory } from 'hono/factory';

const factory = createFactory();

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
