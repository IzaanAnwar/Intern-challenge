import { z } from 'zod';

export const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string(),
});

export const signinSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const createPostSchema = z.object({
  title: z.string(),
  body: z.string(),
});
