import { z } from 'zod';

export const signInSchema = z.object({
    identifier: z.string(),
    username: z.string(),
    email: z.string().email(),
    password: z.string(),
});