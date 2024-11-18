'use client';

import { PropsWithChildren, useState } from 'react';
import {
	isServer,
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function makeQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: {
				// With SSR, we usually want to set some default staleTime
				// above 0 to avoid refetching immediately on the client
				// staleTime: 60 * 1000,

				// staleTime: 1000 * 60 * 10, // 10 minutes
				// staleTime: Infinity, // 10 minutes
				gcTime: 1000 * 60 * 60 * 24, // 24 hours
				refetchOnWindowFocus: false, // Avoid refetch on window focus
				refetchOnMount: false, // Avoid refetch when remounting component

				// staleTime: 100,
				// refetchInterval: 100,
				// refetchOnMount: false,
				// refetchOnWindowFocus: false,
				// refetchOnReconnect: true,
			},
		},
	});
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
	if (isServer) {
		// Server: always make a new query client
		return makeQueryClient();
	} else {
		// Browser: make a new query client if we don't already have one
		// This is very important, so we don't re-make a new client if React
		// suspends during the initial render. This may not be needed if we
		// have a suspense boundary BELOW the creation of the query client
		if (!browserQueryClient) browserQueryClient = makeQueryClient();
		return browserQueryClient;
	}
}

export function ReactQueryProvider({ children }: PropsWithChildren) {
	// const [client] = useState(
	// 	new QueryClient({
	// 		defaultOptions: {
	// 			queries: {
	// 				refetchOnMount: false,
	// 				refetchOnWindowFocus: false,
	// 				refetchOnReconnect: true,
	// 			},
	// 		},
	// 	})
	// );

	// NOTE: Avoid useState when initializing the query client if you don't
	//       have a suspense boundary between this and the code that may
	//       suspend because React will throw away the client on the initial
	//       render if it suspends and there is no boundary
	const client = getQueryClient();

	return (
		<QueryClientProvider client={client}>
			{children}
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}
