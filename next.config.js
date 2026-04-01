/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'studio-adult.hardbanrecordslab.online'],
    formats: ['image/webp', 'image/avif'],
  },
  env: {
    CUSTOM_KEY: 'studio-hrl-adult',
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://studio-adult.hardbanrecordslab.online/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
