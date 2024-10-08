/** @type {import('next').NextConfig} */
const nextConfig = {
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
  