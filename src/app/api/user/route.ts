import { NextResponse } from 'next/server';
import { db } from '../../../lib/db';
import { hash } from 'bcrypt';
import { z } from 'zod';

//? Define Schema for input validation
const userSchema = z
	.object({
		name: z.string().min(1, 'Username is required').max(100),
		email: z.string().min(1, 'Email is required').email('Invalid email'),
		password: z
			.string()
			.min(1, 'Password is required')
			.min(8, 'Password must have than 8 characters'),
		confirmPassword: z.string().min(1, 'Password confirmation is required'),
	})
	.refine((data) => data.password === data.confirmPassword, {
		path: ['confirmPassword'],
		message: 'Password do not match',
	});

export async function POST(req: Request) {
	try {
		const body = await req.json();
		const { email, name, password } = userSchema.parse(body);

		//? check if account already exists
		const existingUserByEmail = await db.user.findUnique({
			where: { email: email },
		});

		if (existingUserByEmail) {
			return NextResponse.json(
				{
					user: null,
					message: 'User with this email already exists',
				},
				{ status: 409 }
			);
		}

		const hashPassword = await hash(password, 10);
		const newUser = await db.user.create({
			data: {
				name,
				email,
				password: hashPassword,
			},
		});

		// exclude password from the response
		const { password: newUserPassword, ...rest } = newUser;

		return NextResponse.json(
			{ user: rest, message: 'User created successfully' },
			{ status: 201 }
		);
	} catch (error) {
		return NextResponse.json(
			{ message: 'Something went wrong', error: error },
			{ status: 500 }
		);
	}
}
