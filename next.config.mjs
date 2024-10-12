/** @type {import('next').NextConfig} */
const nextConfig = {
  headers: () => [
    {
      // Apply this header to all API routes
      source: '/api/(.*)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'no-store, no-cache, must-revalidate, proxy-revalidate',
        },
      ],
    },
  ],

  experimental: {
    serverComponentsExternalPackages: ["mongoose"], // Keep this if you are using mongoose
  },

  images: {
    domains: ["lh3.googleusercontent.com"], // External image domains
  },

  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true, // Enabling top-level await in Webpack
    };
    return config;
  },
};

export default nextConfig;
