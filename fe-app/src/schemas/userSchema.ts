import * as zod from 'zod';

export const createUserSchema = zod.object({
  username: zod.string().min(1, 'Username is required').max(100, 'Username must be less than 100 characters'),
  email: zod.string().email('Invalid email address'),
  password: zod.string().min(6, 'Password must be at least 6 characters long'),
});

export const loginUserSchema = zod.object({
  email: zod.string().email('Invalid email address'),
  password: zod.string().min(6, 'Password must be at least 6 characters long'),
});