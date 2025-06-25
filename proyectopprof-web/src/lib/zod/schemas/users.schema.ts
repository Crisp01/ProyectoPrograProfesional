import { bankNames } from '@/constants/banks';
import { checkbox, email, password } from '@/lib/zod/utils/fields';
import { z } from 'zod';

// Types
export type CreateUser = z.infer<typeof createUserSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;

// Fields
const bankIds = z
  .enum(bankNames)
  .array()
  .max(3)
  .refine((values) => new Set(values).size === values.length, {
    message: 'Array must not contain duplicate values',
  });

const chile = checkbox;
const bci = checkbox;

// Schemas
export const createUserSchema = z.strictObject({ email, password, bankIds });
export const updateUserSchema = z.strictObject({ chile, bci });
