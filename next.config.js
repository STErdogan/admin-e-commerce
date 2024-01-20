/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{ hostname: 'stalyf-next-ecommerce.s3.eu-north-1.amazonaws.com', protocol: 'https' },
			{ hostname: 'storage.googleapis.com', protocol: 'https' },
			{ hostname: 'lh1.googleusercontent.com', protocol: 'https' },
			{ hostname: 'lh2.googleusercontent.com', protocol: 'https' },
			{ hostname: 'lh3.googleusercontent.com', protocol: 'https' },
			{ hostname: 'lh4.googleusercontent.com', protocol: 'https' },
			{ hostname: 'lh5.googleusercontent.com', protocol: 'https' },
			{ hostname: 'lh6.googleusercontent.com', protocol: 'https' },
		],
	},
};

module.exports = nextConfig;
