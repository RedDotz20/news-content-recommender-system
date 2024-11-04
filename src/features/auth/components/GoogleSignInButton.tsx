'use client';

import { useAction } from 'next-safe-action/hooks';
import { signInWithGoogle } from '../server/actions/signInWithGoogleAction';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/customui/LoadingSpinner';
import { Chrome } from 'lucide-react';

export const GoogleSignInButton = () => {
	const { execute, isExecuting } = useAction(signInWithGoogle);

	return (
		<Button
			disabled={isExecuting}
			onClick={() => execute()}
		>
			{isExecuting ? (
				<LoadingSpinner className="w-5 mr-2" />
			) : (
				<>
					<Chrome className="mr-2 h-4 w-4" />
					Sign in with Google
				</>
			)}
		</Button>
	);
};
