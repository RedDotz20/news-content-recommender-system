import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'avatars.googleusercontent.com',
			},
			{
				protocol: 'https',
				hostname: 'cdn-icons-png.flaticon.com',
			},
		],
	},
	logging: {
		fetches: {
			fullUrl: false,
		},
	},
};

const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
	openAnalyzer: false,
});

export default withBundleAnalyzer(nextConfig);
