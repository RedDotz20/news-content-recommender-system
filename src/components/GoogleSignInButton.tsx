import { signIn } from 'next-auth/react';
import { Button } from './ui/button';

const GoogleSignInButton = () => {
	const loginWithGoogle = () => {
		signIn('google', { callbackUrl: '/home' });
	};

	return (
		<Button
			variant="outline"
			onClick={loginWithGoogle}
			className="w-full hover:bg-gray-100 dark:hover:bg-gray-800"
		>
			<img
				className="h-4 w-4 mr-2"
				src="https://cdn-icons-png.flaticon.com/512/281/281764.png"
				alt="Google logo"
			/>
			Sign in with Google
		</Button>
	);
};

export default GoogleSignInButton;
