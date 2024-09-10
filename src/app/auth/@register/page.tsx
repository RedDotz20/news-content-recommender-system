'use client';

import { useForm } from 'react-hook-form';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../../../components/ui/form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { useShowHidePass, ShowHideIconWrapper } from '@/hooks/useShowHidePass';

const FormSchema = z.object({
	name: z.string().min(1, 'Account Username is required').max(100),
	email: z.string().min(1, 'Email is required').email('Invalid email'),
	password: z
		.string()
		.min(1, 'Password is required')
		.min(8, 'Password must have than 8 characters'),
});

const SignUpForm = () => {
	const router = useRouter();
	const { toast } = useToast();
	const { isPasswordVisible, togglePasswordVisibility } = useShowHidePass();

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
		},
	});

	const onSubmit = async (values: z.infer<typeof FormSchema>) => {
		console.log(values);
		const response = await fetch('/api/user', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: values.name,
				email: values.email,
				password: values.password,
			}),
		});

		if (response.ok) {
			router.push('/sign-in');
		} else {
			console.error('Registration Failed');
			toast({
				title: 'Error',
				description: 'Oops! Something Went Wrong',
				variant: 'destructive',
			});
		}
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-6"
				action="#"
				method="POST"
			>
				<div>
					<div className="mt-1">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel
										htmlFor="name"
										className="block text-sm font-medium text-muted-foreground"
									>
										Name
									</FormLabel>
									<FormControl>
										<Input
											{...field}
											id="name"
											name="name"
											type="text"
											autoComplete="name"
											required
											className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 placeholder-muted-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</div>
				<div>
					<div className="mt-1">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel
										htmlFor="email"
										className="block text-sm font-medium text-muted-foreground"
									>
										Email address
									</FormLabel>
									<FormControl>
										<Input
											id="email"
											name="email"
											type="email"
											autoComplete="email"
											required
											className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 placeholder-muted-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</div>
				<div>
					<div className="mt-1">
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel
										htmlFor="password"
										className="block text-sm font-medium text-muted-foreground"
									>
										New Password
									</FormLabel>
									<FormControl>
										<ShowHideIconWrapper
											isPasswordVisible={isPasswordVisible}
											togglePasswordVisibility={togglePasswordVisibility}
										>
											<Input
												{...field}
												id="password"
												type={isPasswordVisible ? 'text' : 'password'}
												autoComplete="new-password"
												required
												className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 placeholder-muted-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
											/>
										</ShowHideIconWrapper>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</div>
				<Button
					type="submit"
					className="w-full"
				>
					Register
				</Button>
			</form>

			{/* <form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-6"
			>
				<div className="space-y-2">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Username</FormLabel>
								<FormControl>
									<Input
										placeholder="John Does"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										placeholder="mail@example.com"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input
										type="password"
										placeholder="Enter your password"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="confirmPassword"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Re-Enter your password</FormLabel>
								<FormControl>
									<Input
										placeholder="Re-Enter your password"
										type="password"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<Button
					className="w-full mt-6"
					type="submit"
				>
					Sign up
				</Button>
			</form>
			<div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
				or
			</div>

			<GoogleSignInButton>Sign up with Google</GoogleSignInButton>
			<p className="text-center text-sm text-gray-600 mt-2">
				If you don&apos;t have an account, please&nbsp;
				<Link
					className="text-blue-500 hover:underline"
					href="/sign-in"
				>
					Sign in
				</Link>
			</p> */}
		</Form>
	);
};

export default SignUpForm;
