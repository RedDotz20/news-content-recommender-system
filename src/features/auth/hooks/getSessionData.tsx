'use client';

import { useEffect, useState } from 'react';
import { UserResponse } from '@supabase/supabase-js';
import { supabaseClient } from '@/utils/supabase/client';

export function getSessionData() {
	const [session, setSession] = useState<UserResponse | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	const user = {
		id: session?.data.user?.id || ('' as string),
		name: session?.data.user?.user_metadata.name || ('' as string),
		email: session?.data.user?.user_metadata.email || ('' as string),
		imageProfile:
			session?.data.user?.user_metadata.avatar_url || ('' as string),
	};

	useEffect(() => {
		const fetchUser = async () => {
			try {
				setIsLoading(true);
				setError(null);

				const sessionData = await supabaseClient.auth.getUser();
				setSession(sessionData);
			} catch (err) {
				console.error('Error fetching user session: ', err);
				setError('Failed to fetch user session');
			} finally {
				setIsLoading(false);
			}
		};

		fetchUser();
		console.log('SESSION_DATA: ', user);
	}, []);

	return { session, user, isLoading, error };
}
