'use client';

import { PropsWithChildren } from 'react';
import { LoadingSpinnerWithText } from '@/components/customui/LoadingSpinner';
import { CategoriesSelection } from '@/features/categorySelection/components/CategoriesSelection';
import { useCheckUserPref } from '@/features/handleUserPreferences/hooks/useCheckUserPref';

const style = 'flex items-center justify-center w-full flex-col sm:px-4';

export function UserPreferenceBoundary({ children }: PropsWithChildren) {
	const { data, isLoading, isFetching, error } = useCheckUserPref();

	// TODO: implement strict Typings and Hybrid Recommendation

	if (isLoading || isFetching) {
		return <LoadingSpinnerWithText className="h-4 w-4" />;
	}

	if (error) {
		return <div className={style}>{error.message}</div>;
	}

	if (data) {
		if (data.isExists && data.isEmpty) {
			console.log('Categories Loading');
			return (
				<div className={style}>
					<CategoriesSelection />
				</div>
			);
		}

		if (data.isExists && !data.isEmpty) {
			console.log('Preferenes Loaded');
			return <div className={style}>{children}</div>;
		}
	}

	return null;
}
