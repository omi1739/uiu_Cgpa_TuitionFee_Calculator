/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  
  // Image optimization for Vercel
  images: {
    unoptimized: true,
  },

  // Enable SWR (Stale-While-Revalidate) for better caching
  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, must-revalidate',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },

  // Compress responses
  compress: true,

  // React strict mode for development
  reactStrictMode: true,

  // Internationalization
  i18n: {
    locales: ['en-US'],
    defaultLocale: 'en-US',
  },
};

module.exports = nextConfig;