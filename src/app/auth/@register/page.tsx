'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import * as z from 'zod';
import Link from 'next/link';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useShowHidePass, ShowHideIconWrapper } from '@/hooks/useShowHidePass';
import {
	PersonIcon,
	EnvelopeClosedIcon,
	LockClosedIcon,
} from '@radix-ui/react-icons';
import { Loader2 } from 'lucide-react';

const FormSchema = z.object({
	name: z.string().min(1, 'Account Name is required').max(100),
	email: z.string().min(1, 'Email is required').email('Invalid Email'),
	password: z
		.string()
		.min(1, 'Password is required')
		.min(8, 'Password must have than 8 characters'),
});

export default function SignUpForm() {
	const [isLoading, setIsLoading] = useState(false);
	const { status } = useSession();
	const { toast } = useToast();
	const { isPasswordVisible, togglePasswordVisibility } = useShowHidePass();
	const router = useRouter();

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
		},
	});

	const onSubmit = async (values: z.infer<typeof FormSchema>) => {
		try {
			setIsLoading(true);

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
		} catch (error) {
			console.error(error);
			toast({
				title: 'Error',
				description: 'Oops! Something Went Wrong',
				variant: 'destructive',
			});
		} finally {
			setIsLoading(false);
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
										<div className="flex items-center gap-2">
											<PersonIcon className="h-4 w-4" />
											<p>Name</p>
										</div>
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
										<div className="flex items-center gap-2">
											<EnvelopeClosedIcon className="h-4 w-4" />
											<p>Email address</p>
										</div>
									</FormLabel>
									<FormControl>
										<Input
											{...field}
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
										<div className="flex items-center gap-2">
											<LockClosedIcon className="h-4 w-4" />
											<p>Password</p>
										</div>
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
					disabled={status === 'loading' || isLoading}
				>
					{isLoading ? (
						<Loader2 className="mr-2 h-4 w-4 animate-spin" />
					) : (
						'Register'
					)}
				</Button>

				<p className="text-xs">
					By signing up, you agree to our{' '}
					<Link
						href="#"
						className="text-cyan-500"
					>
						terms
					</Link>
					,{' '}
					<Link
						href="#"
						className="text-cyan-500"
					>
						acceptable use
					</Link>
					, and{' '}
					<Link
						href="#"
						className="text-cyan-500"
					>
						privacy policy
					</Link>
					.
				</p>
			</form>
		</Form>
	);
}
