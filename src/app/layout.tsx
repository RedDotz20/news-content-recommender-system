import type { Metadata } from 'next';
import { Chivo } from 'next/font/google';
import './globals.css';

import SessionWrapper from '@/components/SessionWrapper';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme/theme-provider';

const chivo = Chivo({
	subsets: ['latin'],
	display: 'swap',
});

export const metadata: Metadata = {
	title: 'News Recommender',
	description: 'Article Recommender System',
};

interface RootlayoutProps {
	readonly children: React.ReactNode;
}

export default function RootLayout({ children }: RootlayoutProps) {
	return (
		<SessionWrapper>
			<html lang="en">
				<body className={chivo.className}>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						<main>{children}</main>
						<Toaster />
					</ThemeProvider>
				</body>
			</html>
		</SessionWrapper>
	);
}
