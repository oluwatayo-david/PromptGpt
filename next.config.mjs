/** @type {import('next').NextConfig} */
const nextConfig = {
  headers: () => [
    {
      source: '/api/prompt',
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
    domains: ["lh3.googleusercontent.com"], 
  },

  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true, 
    };
    return config;
  },
};

export default nextConfig;
