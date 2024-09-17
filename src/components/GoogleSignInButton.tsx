'use client';

import { signIn, useSession } from 'next-auth/react';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';

const GoogleSignInButton = () => {
	const { status } = useSession();
	const isLoading = status === 'loading';

	const loginWithGoogle = () => {
		signIn('google', {
			callbackUrl: '/home',
		});
	};

	return (
		<Button
			variant="outline"
			onClick={loginWithGoogle}
			className="w-full hover:bg-gray-100 dark:hover:bg-gray-800"
			disabled={isLoading}
		>
			{isLoading ? (
				<Loader2 className="mr-2 h-4 w-4 animate-spin" />
			) : (
				<Image
					className="h-4 w-4 mr-2"
					src="https://cdn-icons-png.flaticon.com/512/281/281764.png"
					alt="Google logo"
					width={24}
					height={24}
				/>
			)}
			{isLoading ? 'Loading...' : 'Sign in with Google'}
		</Button>
	);
};

export default GoogleSignInButton;
