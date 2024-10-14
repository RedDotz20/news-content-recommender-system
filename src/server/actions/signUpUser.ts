'use server';

import { API_SECRET_KEY } from '@/middleware';
import { actionClient } from '@/lib/safe-action';
import { FormSchema } from '../schema';

export const userSafeSignUp = actionClient
	.schema(FormSchema)
	.action(async ({ parsedInput: values }) => {
		const response = await fetch('http://localhost:3000/api/user', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'x-api-secret-key': API_SECRET_KEY as string,
			},
			body: JSON.stringify({
				name: values.name,
				email: values.email,
				password: values.password,
			}),
		});

		return response.json();
	});
