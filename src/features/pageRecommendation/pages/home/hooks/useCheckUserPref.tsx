'use client';

import { useQuery } from '@tanstack/react-query';
import { checkUserPref } from '../server/actions/checkUserPref';
import { useGetSessionData } from '@/features/auth/hooks/useGetSessionData';

export const useCheckUserPref = () => {
	const {
		user: { id },
	} = useGetSessionData();

	const checkUserPrefQuery = useQuery({
		queryKey: ['isPreferencesExists'],
		queryFn: () => checkUserPref(id),
		enabled: !!id,
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		refetchOnReconnect: true,
	});

	return { ...checkUserPrefQuery };
};
