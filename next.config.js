/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  
  // Image optimization for static export
  images: {
    unoptimized: true,
  },

  // Compress responses
  compress: true,

  // React strict mode for development
  reactStrictMode: true,
};

module.exports = nextConfig;
