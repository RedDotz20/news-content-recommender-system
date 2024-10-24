import type { Metadata } from 'next';
import { Chivo } from 'next/font/google';
import './globals.css';

import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme/theme-provider';

const chivo = Chivo({
	subsets: ['latin'],
	display: 'swap',
});

export const metadata: Metadata = {
	title: 'ArticleHorizon',
	description: 'Article Recommender System',
};

interface RootlayoutProps {
	readonly children: React.ReactNode;
}

export default function RootLayout({ children }: RootlayoutProps) {
	return (
		<html lang="en">
			<body className={chivo.className}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
				>
					<main>{children}</main>
					<Toaster />
				</ThemeProvider>
			</body>
		</html>
	);
}
