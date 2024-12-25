import type { Metadata } from 'next';
import { Chivo } from 'next/font/google';
import './globals.css';

import { ReactQueryProvider } from '@/components/ReactQueryProvider';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme/ThemeProvider';

const chivo = Chivo({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: 'ArticleHorizon',
  description: 'Article Recommender System'
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={chivo.className}>
        <ReactQueryProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <main>{children}</main>
            <Toaster />
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
