import { NextResponse } from 'next/server';
import { z } from 'zod';

export const updateArticleFreqSchema = z.object({
  articleId: z.string(),
  category: z.string(),
  frequencyVal: z.number()
});

export type updateArticleFreqResType =
  | NextResponse<{ message: string }>
  | NextResponse<{ error: string }>;
