'use server';

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { actionClient } from '@/lib/safe-action';

// Function to dynamically get the correct URL depending on the environment
const getURL = () => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel
    'http://localhost:3000/'; // Default to localhost during development

  // Ensure the URL starts with 'https://' unless it's localhost
  url = url.startsWith('http') ? url : `https://${url}`;
  // Ensure there's a trailing slash at the end of the URL
  url = url.endsWith('/') ? url : `${url}/`;

  return url;
};

// Sign in with Google function with dynamic redirect URL
export const signInWithGoogle = actionClient.action(async () => {
  const supabase = await createClient();
  const redirectToURL = `${getURL()}auth/callback`; // Use dynamic base URL for redirection

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      queryParams: {
        access_type: 'offline',
        prompt: 'consent'
      },
      redirectTo: redirectToURL
    }
  });

  if (error) {
    console.log(error);
    redirect('/error');
  }

  if (data.url) {
    redirect(data.url);
  }
});
