import { NextResponse } from 'next/server';
import { z } from 'zod';

export const updateArticleFreqSchema = z.object({
	category: z.string(),
	frequencyVal: z.number(),
});

export type paramsType = { params: { userId: string } };

export type updateArticleFreqResType =
	| NextResponse<{ message: string }>
	| NextResponse<{ error: string }>;
