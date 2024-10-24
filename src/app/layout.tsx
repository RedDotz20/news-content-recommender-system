import type { Metadata } from 'next';
import { Chivo } from 'next/font/google';
import './globals.css';

import { ReactQueryProvider } from '@/components/ReactQueryProvider';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme/theme-provider';
import React from 'react';

const chivo = Chivo({
	subsets: ['latin'],
	display: 'swap',
});

export const metadata: Metadata = {
	title: 'ArticleHorizon',
	description: 'Article Recommender System',
};

export default function RootLayout({ children }: React.PropsWithChildren) {
	return (
		<html lang="en">
			<body className={chivo.className}>
				<ReactQueryProvider>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
					>
						<main>{children}</main>
						<Toaster />
					</ThemeProvider>
				</ReactQueryProvider>
			</body>
		</html>
	);
}
