/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/v1/:path*',
                destination: 'https://b83c-120-28-179-30.ngrok-free.app/api/v1/:path*', // Change to your API server URL
            },
        ];
    },
};

export default nextConfig;