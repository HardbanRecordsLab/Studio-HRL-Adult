/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  // English is the default; Polish lives under /pl. Detection is off so the
  // site always opens in English until the visitor picks PL with the switcher.
  i18n: {
    locales: ['en', 'pl'],
    defaultLocale: 'en',
    localeDetection: false,
  },
  images: {
    domains: [
      "localhost",
      "studio-adult.hardbanrecordslab.online",
      "res.cloudinary.com",
    ],
    formats: ["image/webp", "image/avif"],
  },
  env: {
    CUSTOM_KEY: "studio-hrl-adult",
  },
  async rewrites() {
    return [
      // {
      //   source: '/api/:path*',
      //   destination: 'https://studio-adult.hardbanrecordslab.online/api/:path*',
      // },
    ];
  },
};

module.exports = nextConfig;
