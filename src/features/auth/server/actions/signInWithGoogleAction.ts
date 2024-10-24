'use server';

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export const signInWithGoogle = async () => {
	const supabase = createClient();
	const { data, error } = await supabase.auth.signInWithOAuth({
		provider: 'google',
		options: {
			queryParams: {
				access_type: 'offline',
				prompt: 'consent',
			},
			redirectTo: 'http://localhost:3000/auth/callback',
		},
	});

	if (error) {
		console.log(error);
		redirect('/error');
	}

	if (data.url) {
		redirect(data.url);
	}
};
