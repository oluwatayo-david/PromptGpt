/** @type {import('next').NextConfig} */
const nextConfig = {
  headers: () => [
    {
      source: '/',
      headers: [
        {
          key: 'Cache-Control',
          value: 'no-store',
        },
      ],
    },
  ],
    experimental: {
      serverComponentsExternalPackages: ["mongoose"], // Keep this if you are using mongoose
    },
    images: {
      domains: ["lh3.googleusercontent.com"], // Configure external image domains
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
  