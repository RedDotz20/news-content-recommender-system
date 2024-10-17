'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import * as z from 'zod';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useShowHidePass, ShowHideIconWrapper } from '@/hooks/useShowHidePass';
import GoogleSignInButton from '@/components/GoogleSignInButton';
import {
	RememberMeCheckboxWrapper,
	useRememberMeCheckBox,
} from '@/components/RememberMeCheckbox';
import { EnvelopeClosedIcon, LockClosedIcon } from '@radix-ui/react-icons';

const FormSchema = z.object({
	email: z.string().min(1, 'Email is required').email('Invalid email'),
	password: z
		.string()
		.min(1, 'Password is required')
		.min(8, 'Password should have than 8 characters'),
});

export default function SignInForm() {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();
	const { status } = useSession();
	const { isPasswordVisible, togglePasswordVisibility } = useShowHidePass();
	const { toast } = useToast();

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const { rememberMe, handleCheckboxChange, handleRememberMeStorage } =
		useRememberMeCheckBox({ useFormReturn: form });

	const onSubmit = async (values: z.infer<typeof FormSchema>) => {
		try {
			setIsLoading(true);
			handleRememberMeStorage();

			const signInData = await signIn('credentials', {
				email: values.email,
				password: values.password,
				redirect: false,
			});

			console.log(signInData);

			if (signInData?.error) {
				console.error(signInData.error);
				toast({
					title: 'Error',
					description: `${signInData.error}`,
					variant: 'destructive',
				});
			} else {
				router.refresh();
				router.push('/home');
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
			>
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

				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<div className="flex items-center justify-between gap-4">
								<FormLabel
									htmlFor="password"
									className="block text-sm font-medium text-muted-foreground"
								>
									<div className="flex items-center gap-2">
										<LockClosedIcon className="h-4 w-4" />
										<p> Password</p>
									</div>
								</FormLabel>
								<Link
									href="#" // TODO: ADD  PASSWORD
									className="text-xs font-medium text-muted-foreground hover:text-cyan-400/90"
									prefetch={false}
								>
									Forgot your password?
								</Link>
							</div>

							<FormControl>
								<ShowHideIconWrapper
									isPasswordVisible={isPasswordVisible}
									togglePasswordVisibility={togglePasswordVisibility}
								>
									<Input
										{...field}
										id="password"
										type={isPasswordVisible ? 'text' : 'password'}
										autoComplete="current-password"
										required
										className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 placeholder-muted-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
									/>
								</ShowHideIconWrapper>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<RememberMeCheckboxWrapper
					rememberMe={rememberMe}
					handleCheckboxChange={handleCheckboxChange}
				/>

				<Button
					type="submit"
					className="w-full"
					disabled={status === 'loading' || isLoading}
				>
					{isLoading ? (
						<Loader2 className="mr-2 h-4 w-4 animate-spin" />
					) : (
						'Sign In'
					)}
				</Button>
				<GoogleSignInButton />
			</form>
		</Form>
	);
}
