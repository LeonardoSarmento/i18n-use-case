import { z } from 'zod';

export const PostSchema = z.object({
  id: z.number(),
  title: z.string({ required_error: 'post_title_required_error' }).min(1, { message: 'post_title_min' }),
  description: z.string({ required_error: 'post_description_required_error' }).min(1, { message: 'post_body_min' }),
  body: z.string({ required_error: 'post_body_required_error' }).min(1, { message: 'post_body_min' }),
  userId: z.number(),
});

export type PostType = z.infer<typeof PostSchema>;

export const CreatePostSchema = PostSchema.omit({ id: true, userId: true });
export type CreatePostType = z.infer<typeof CreatePostSchema>;
