import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Link } from 'next-view-transitions';
import { ThemedLogo } from '@/components/customui/ThemedLogo';
import { GoogleSignInButton } from '@/features/auth/components/GoogleSignInButton';

export function LoginPageComponent() {
	return (
		<section className="flex items-center justify-center min-h-screen px-4">
			<Card className="w-full max-w-md px-4 py-6">
				<CardHeader className="space-y-1">
					<CardTitle className="text-3xl font-bold text-center inline-flex items-center  flex-col gap-6">
						<ThemedLogo
							width={120}
							height={120}
						/>
						<span className="text-blue-400">ArticleHorizon</span>
					</CardTitle>
					<CardDescription className="text-center">
						Use your Google account to sign in
					</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-4">
					<GoogleSignInButton />
				</CardContent>
				<CardFooter>
					<p className="text-sm text-center text-gray-500 w-full">
						By signing up, you agree to our <br />
						<Link
							href="/legal/terms-of-use"
							className="text-cyan-500"
						>
							terms
						</Link>
						,{' '}
						<Link
							href="/legal/acceptable-use-policy"
							className="text-cyan-500"
						>
							acceptable use
						</Link>
						, and{' '}
						<Link
							href="/legal/privacy-policy"
							className="text-cyan-500"
						>
							privacy policy
						</Link>
						.
					</p>
				</CardFooter>
			</Card>
		</section>
	);
}
