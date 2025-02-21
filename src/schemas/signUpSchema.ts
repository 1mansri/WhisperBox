import { z } from 'zod';

export const usernameValidation = z
    .string()
    .min(3, "Username must be atleast 3 characters")
    .max(20, "Username must be no more than 20 characters")
    .regex(/^[a-zA-Z0-9_-]+$/, "Username can only contain letters, numbers, underscores, or hyphens");

export const signUpSchema = z.object({
    username: usernameValidation,
    email: z.string().email({message: 'Please enter valid email address'}),
    password: z.string().min(6, {message: 'Password must be atleast 6 characters'}),
});