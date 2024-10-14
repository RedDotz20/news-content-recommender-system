import * as z from 'zod';

export const FormSchema = z.object({
	name: z.string().min(1, 'Account Name is required').max(100),
	email: z.string().min(1, 'Email is required').email('Invalid Email'),
	password: z
		.string()
		.min(1, 'Password is required')
		.min(8, 'Password must have than 8 characters'),
});
