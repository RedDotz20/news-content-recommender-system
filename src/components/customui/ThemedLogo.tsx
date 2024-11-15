'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';

interface ThemedLogoProps {
	width: number;
	height: number;
}

export const ThemedLogo = ({ width, height }: ThemedLogoProps) => {
	const { theme } = useTheme();

	return (
		<Image
			src={`/logo/logo_${theme === 'light' ? 'black' : 'white'}.svg`}
			alt="My SVG Image"
			width={width}
			height={height}
			priority={true}
		/>
	);
};
