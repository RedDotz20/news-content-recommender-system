'use client';

import React, { useEffect, useState } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	// Prevents Hydration Error Issues with Next Themes
	// Avoids rendering until client-side load
	if (!isMounted) return null;

	return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
