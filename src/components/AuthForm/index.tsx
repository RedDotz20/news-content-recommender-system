'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

type AuthTabTypes = 'signin' | 'register';

export function AuthForm() {
	const [AuthTabs, setAuthTabs] = useState<AuthTabTypes>('signin');
	const router = useRouter();
	const { data: session } = useSession();

	const onTabChange = (value: string) => {
		setAuthTabs(value as AuthTabTypes);
	};

	useEffect(() => {
		if (session) {
			router.push('/admin');
		}
	}, [session, router]);

	return (
		<div className="flex flex-wrap-reverseitems-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
			<div className="mx-auto w-full max-w-md space-y-8">
				<h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-foreground">
					{AuthTabs === 'signin'
						? 'Sign in to your account'
						: 'Create your account'}
				</h2>

				<Tabs
					value={AuthTabs}
					onValueChange={onTabChange}
					defaultValue="signin"
					className="space-y-8"
				>
					<TabsList className="grid w-full grid-cols-2">
						<TabsTrigger value="signin">Sign In</TabsTrigger>
						<TabsTrigger value="register">Register</TabsTrigger>
					</TabsList>
					<TabsContent value="signin">
						<SignInForm />
					</TabsContent>
					<TabsContent value="register">
						<SignUpForm />
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}
