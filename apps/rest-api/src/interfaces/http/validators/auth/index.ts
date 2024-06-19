import { invalidResponse } from '@/interfaces/http/utils/responses';
import { parseValidationError, z } from '@/interfaces/http/validators/zod';
import { zValidator } from '@hono/zod-validator';
import { createFactory } from 'hono/factory';

const factory = createFactory();

export const postSignUpValidation = factory.createMiddleware(
  zValidator(
    'json',
    z.object({
      email: z.string().email(),
      password: z.string().min(8).max(80),
      name: z.string().min(1).max(50),
    }),
    (result) => {
      if (!result.success) {
        const errors = parseValidationError(result.error.issues);
        return invalidResponse(errors);
      }
    },
  ),
);

export const postSignInValidation = factory.createMiddleware(
  zValidator(
    'json',
    z.object({
      email: z.string().email(),
      password: z.string(),
    }),
    (result) => {
      if (!result.success) {
        const errors = parseValidationError(result.error.issues);
        return invalidResponse(errors);
      }
    },
  ),
);

export const refreshTokenValidation = factory.createMiddleware(
  zValidator(
    'json',
    z.object({
      refreshToken: z.string(),
    }),
    (result) => {
      if (!result.success) {
        const errors = parseValidationError(result.error.issues);
        return invalidResponse(errors);
      }
    },
  ),
);
