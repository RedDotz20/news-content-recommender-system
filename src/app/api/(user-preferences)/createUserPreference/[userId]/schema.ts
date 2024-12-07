import { NextResponse } from 'next/server';
import { z } from 'zod';

export const updatePerfsArrSchema = z.object({
  categories: z.array(
    z.object({
      category: z.string(),
      frequency: z.number()
    })
  )
});

export type paramsType = { params: { userId: string } };

export type updatePrefsResType =
  | NextResponse<{ message: string }>
  | NextResponse<{ error: string }>;
