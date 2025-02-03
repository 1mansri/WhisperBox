import { z } from 'zod';

export const messageSchema = z.object({
    content: z
    .string()
    .min(10, "Message must be atleast of 10 character")
    .max(500, "Message must be at most of 300 character")
});