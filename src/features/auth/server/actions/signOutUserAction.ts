'use server';

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export const signOutUser = async () => {
	const supabase = createClient();
	const { error } = await supabase.auth.signOut();
	if (error) {
		console.log(error);
		redirect('/error');
	}

	redirect('/logout');
};
