'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { RefreshCw, HomeIcon, LockIcon } from 'lucide-react';
import { signInWithGoogle } from '../features/auth/server/actions/signInWithGoogleAction';

export function OauthErrorPage() {
	const router = useRouter();
	const [error, setError] = useState(false);

	useEffect(() => {
		const hash = window.location.hash;
		if (hash.includes('error=access_denied')) {
			setError(true);
		} else {
			router.push('/login');
		}
	}, [router]);

	if (!error) return null;

	return (
		<div className="min-h-screen flex items-center justify-center p-4">
			<Card className="w-full max-w-md p-8">
				<CardHeader className="text-center">
					<div className="flex items-center justify-center w-24 h-24 rounded-full bg-inherit border-4 border-[#7f1d1d] mx-auto mb-4 p-2">
						<LockIcon className="h-12 w-12 text-destructive" />
					</div>
					<CardTitle className="text-2xl font-bold text-destructive">
						Authentication Error
					</CardTitle>
					<CardDescription className="text-base">
						Error 401: Unauthorized Access
					</CardDescription>
				</CardHeader>
				<CardContent className="text-center">
					<p className="text-muted-foreground">
						Sorry, you don't have permission to access this page. Please log in
						or contact an administrator if you believe this is an error.
					</p>
				</CardContent>
				<CardFooter className="flex flex-col space-y-2">
					<Button
						className="w-full"
						onClick={() => signInWithGoogle()}
					>
						<RefreshCw className="mr-2 h-4 w-4" /> Retry Authentication
					</Button>
					<Button
						variant="outline"
						className="w-full"
						onClick={() => router.push('/')}
					>
						<HomeIcon className="mr-2 h-4 w-4" /> Go Back Home
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
