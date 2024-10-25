'use server';

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { actionClient } from '@/lib/safe-action';

export const signInWithGoogle = actionClient.action(async () => {
	const supabase = createClient();
	const { data, error } = await supabase.auth.signInWithOAuth({
		provider: 'google',
		options: {
			queryParams: {
				access_type: 'offline',
				prompt: 'consent',
			},
			redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`,
		},
	});

	if (error) {
		console.log(error);
		redirect('/error');
	}

	if (data.url) {
		redirect(data.url);
	}
});
