'use client';

import { Button } from '@/components/ui/button';
import { signInWithGoogle } from '../server/actions/signInWithGoogleAction';
import React from 'react';
import { Chrome } from 'lucide-react';

export const GoogleSignInButton = () => {
	const googleSignIn = () => signInWithGoogle();

	return (
		<Button onClick={googleSignIn}>
			<Chrome className="mr-2 h-4 w-4" />
			Sign in with Google
		</Button>
	);
};
