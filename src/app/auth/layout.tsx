'use client';

import Link from 'next/link';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ChevronLeftIcon } from 'lucide-react';
import { useAuthTabsStore } from '@/store/authTabStore';

interface AuthLayoutProps {
	signin: React.ReactNode;
	register: React.ReactNode;
}

export default function AuthLayout({ signin, register }: AuthLayoutProps) {
	const { AuthTabs, onTabChange } = useAuthTabsStore();
	return (
		<div className="h-screen flex flex-wrap-reverse items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
			<Link href="/">
				<Button
					className="absolute top-4 left-4"
					variant="ghost"
				>
					<ChevronLeftIcon className="h-4 w-4 mr-2" />
					Home
				</Button>
			</Link>
			<div className="mx-auto min-w-80 max-w-80 space-y-8 min-h-[512px]">
				<h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-foreground">
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
