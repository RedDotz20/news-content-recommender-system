'use client';

import { SessionProvider } from 'next-auth/react';
import React from 'react';

interface SessionWrapperProps {
	children: React.ReactNode;
}

export function SessionWrapper({ children }: SessionWrapperProps) {
	return <SessionProvider>{children}</SessionProvider>;
}
