import { FC, ReactNode } from 'react';
import { signIn } from 'next-auth/react';
import { Button } from './ui/button';

interface GoogleSignInButtonProps {
	children: ReactNode;
}
const GoogleSignInButton: FC<GoogleSignInButtonProps> = ({ children }) => {
	const loginWithGoogle = () =>
		signIn('google', {
			callbackUrl: '/admin',
		});

	return (
		<Button
			onClick={loginWithGoogle}
			className="w-full"
		>
			<img
				className="h-4 w-4 mr-2"
				src="https://cdn-icons-png.flaticon.com/512/281/281764.png"
				alt="Google logo"
			/>
			{children}
		</Button>
	);
};

export default GoogleSignInButton;
