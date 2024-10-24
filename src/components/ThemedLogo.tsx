// import { useTheme } from 'next-themes';

import Image from "next/image";

export const ThemedLogo = ({
	width,
	height,
}: {
	width: number;
	height: number;
}) => {
	//TODO: capture Theme State to change svg logo color
	// const { settheme } = useTheme();

	return (
		<Image
			src="/logo/logo_white.svg"
			alt="My SVG Image"
			width={width}
			height={height}
		/>
	);
};
