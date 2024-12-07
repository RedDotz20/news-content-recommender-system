import { z } from 'zod';

export const updatePerfsArrSchema = z.object({
  categories: z.array(
    z.object({
      category: z.string(),
      frequency: z.number()
    })
  )
});

export const mutatePreferenceSchema = z.object({
  userId: z.string().uuid(),
  preferences: z.object({
    categories: z.array(
      z.object({
        category: z.string(),
        frequency: z.number()
      })
    )
  })
});
