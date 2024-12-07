import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Link } from 'next-view-transitions';
import { ThemedLogo } from '@/components/customui/ThemedLogo';
import { GoogleSignInButton } from '@/features/auth/components/GoogleSignInButton';

export function LoginPageComponent() {
  return (
    <section className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-md px-4 py-6">
        <CardHeader className="space-y-1">
          <CardTitle className="inline-flex flex-col items-center gap-6 text-center text-3xl font-bold">
            <ThemedLogo width={120} height={120} />
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
          <p className="w-full text-center text-sm text-gray-500">
            By signing up, you agree to our <br />
            <Link href="/legal/terms-of-use" className="text-cyan-500">
              terms
            </Link>
            ,{' '}
            <Link href="/legal/acceptable-use-policy" className="text-cyan-500">
              acceptable use
            </Link>
            , and{' '}
            <Link href="/legal/privacy-policy" className="text-cyan-500">
              privacy policy
            </Link>
            .
          </p>
        </CardFooter>
      </Card>
    </section>
  );
}
