import * as zod from 'zod';

export const createUserSchema = zod.object({
  name: zod.string().min(1, 'Name is required'),
  email: zod.string().email('Invalid email address'),
  password: zod.string().min(8, 'Password must be at least 8 characters long'),
});

export const loginUserSchema = zod.object({
  email: zod.string().email('Invalid email address'),
  password: zod.string().min(8, 'Password must be at least 8 characters long'),
});