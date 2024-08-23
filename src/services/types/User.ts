import { z } from 'zod';

export const UserSchema = z.object({
  id: z.number(),
  firstName: z.string().trim(),
  lastName: z.string().trim(),
  birthDate: z.string(),
});

export type UserType = z.infer<typeof UserSchema>;
