import * as zod from 'zod';

export const createUserSchema = zod.object({
  fullname: zod.string().min(1, 'Full Name is required').max(100, 'Full Name must be less than 100 characters'),
  email: zod.string().email('Invalid email address'),
  password: zod.string().min(8, 'Password must be at least 8 characters long'),
});

export const loginUserSchema = zod.object({
  email: zod.string().email('Invalid email address'),
  password: zod.string().min(8, 'Password must be at least 8 characters long'),
});