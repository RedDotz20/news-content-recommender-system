/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		API_SECRET_KEY: process.env.API_SECRET_KEY,
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '*',
			},
			{
				protocol: 'http',
				hostname: '*',
			},
			{
				protocol: 'https',
				hostname: 'lh3.googleusercontent.com',
			},
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

export default nextConfig;
