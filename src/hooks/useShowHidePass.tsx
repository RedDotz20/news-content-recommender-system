'use client';

import React, { useState } from 'react';
import { EyeOpenIcon, EyeClosedIcon } from '@radix-ui/react-icons';
interface showHideIconProps {
	children: React.ReactNode;
	isPasswordVisible: boolean;
	togglePasswordVisibility: () => void;
}

export const useShowHidePass = () => {
	const [isPasswordVisible, setIspasswordVisible] = useState(false);

	const togglePasswordVisibility = () => {
		setIspasswordVisible((isPasswordVisible) => !isPasswordVisible);
	};

	return { isPasswordVisible, togglePasswordVisibility };
};

export const ShowHideIconWrapper = ({
	children,
	isPasswordVisible,
	togglePasswordVisibility,
}: showHideIconProps) => {
	return (
		<div className="relative">
			{children}
			<button
				type="button"
				className="absolute inset-y-0 right-0 px-3 py-2 focus:outline-none"
				onClick={togglePasswordVisibility}
			>
				{isPasswordVisible ? <EyeOpenIcon /> : <EyeClosedIcon />}
			</button>
		</div>
	);
};
