'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

type AuthTabTypes = 'signin' | 'register';
interface AuthLayoutProps {
	signin: React.ReactNode;
	register: React.ReactNode;
}

export default function AuthLayout({ signin, register }: AuthLayoutProps) {
	const [AuthTabs, setAuthTabs] = useState<AuthTabTypes>('signin');
	const { data: session } = useSession();
	const router = useRouter();

	const onTabChange = (value: string) => {
		setAuthTabs(value as AuthTabTypes);
	};

	useEffect(() => {
		if (session) {
			router.push('/home');
		}
	}, [session, router]);

	return (
		<div className="h-screen flex flex-wrap-reverse items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
			<div className="mx-auto min-w-80 max-w-md space-y-8 min-h-[480px]">
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
					<TabsContent value="signin">{signin}</TabsContent>
					<TabsContent value="register">{register}</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}
