import { z } from 'zod';

export const FilterSchema = z.object({
  userId: z.number().optional().catch(undefined),
});

export type FilterType = z.infer<typeof FilterSchema>;
