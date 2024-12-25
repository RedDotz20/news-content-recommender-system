'use client';

import { useMemo } from 'react';
import { supabaseClient } from '@/utils/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { User } from '@supabase/supabase-js';

const fetchSessionData = async () => {
  const {
    data: { user },
    error
  } = await supabaseClient.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  return user as User;
};

export function useGetSessionData() {
  const {
    data: session,
    isLoading,
    error
  } = useQuery({
    queryKey: ['sessionData'],
    queryFn: fetchSessionData,
    throwOnError: true
  });

  const user = useMemo(
    () => ({
      id: session?.id ?? ('' as string),
      name: session?.user_metadata.name ?? ('' as string),
      email: session?.user_metadata.email ?? ('' as string),
      imageProfile: session?.user_metadata.avatar_url ?? ('' as string)
    }),
    [session]
  );

  return { session, user, isLoading, error };
}
