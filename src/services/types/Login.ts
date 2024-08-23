import { z } from 'zod';

export const LoginSchema = z.object({
  username: z.string({ required_error: 'login_username_required_error' }).min(1, { message: 'login_username_min' }).trim(),
  password: z
    .string({ required_error: 'login_password_required_error' })
    .min(3, { message: 'login_password_min' })
    .max(14, { message: 'login_password_max' })
    .trim(),
});

export type LoginType = z.infer<typeof LoginSchema>;
