/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**',
			},
		],
	},
	async redirects() {
		//* Here I have changed the route from '/' to '/network-page'
		return [
			{
				source: '/',
				destination: '/network-page', // or '/login-page' based on your requirement
				permanent: true,
			},
		];
	},
};

export default nextConfig;
