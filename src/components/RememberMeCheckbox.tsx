'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import React, { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

interface UseRememberMecheckboxProps {
	useFormReturn: UseFormReturn<
		{ email: string; password: string },
		any,
		undefined
	>;
}

interface RememberMeCheckboxWrapperProps {
	rememberMe: boolean;
	handleCheckboxChange: (event: React.FormEvent<HTMLButtonElement>) => void;
}

export const useRememberMeCheckBox = ({
	useFormReturn,
}: UseRememberMecheckboxProps) => {
	const [rememberMe, setRememberMe] = useState(false);

	const handleCheckboxChange = () => {
		setRememberMe(!rememberMe);
	};

	const handleRememberMeStorage = () => {
		if (rememberMe) {
			localStorage.setItem('rememberMe', 'true');
			localStorage.setItem('rememberMeEmail', useFormReturn.getValues('email'));
		} else {
			localStorage.removeItem('rememberMe');
			localStorage.removeItem('rememberMeEmail');
		}
	};

	useEffect(() => {
		const savedEmail = localStorage.getItem('rememberMeEmail');
		const rememberMeChecked = localStorage.getItem('rememberMe') === 'true';

		if (rememberMeChecked && savedEmail) {
			useFormReturn.reset({ email: savedEmail });
			setRememberMe(true);
		}

		setRememberMe(rememberMeChecked);
	}, []);

	return { rememberMe, handleCheckboxChange, handleRememberMeStorage };
};

export const RememberMeCheckboxWrapper = ({
	rememberMe,
	handleCheckboxChange,
}: RememberMeCheckboxWrapperProps) => {
	return (
		<div className="flex flex-wrap gap-4 items-center justify-between">
			<div className="flex items-center">
				<Checkbox
					id="remember-me"
					name="remember-me"
					className="h-4 w-4 rounded"
					checked={rememberMe}
					onClick={handleCheckboxChange}
				/>
				<Label
					htmlFor="remember-me"
					className="ml-2 block text-sm text-muted-foreground cursor-pointer"
				>
					Remember me
				</Label>
			</div>
		</div>
	);
};
