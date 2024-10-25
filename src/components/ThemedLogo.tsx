'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';

export const ThemedLogo = ({
	width,
	height,
}: {
	width: number;
	height: number;
}) => {
	const { theme } = useTheme();

	return (
		<Image
			src={`/logo/logo_${theme === 'light' ? 'black' : 'white'}.svg`}
			alt="My SVG Image"
			width={width}
			height={height}
		/>
	);
};
