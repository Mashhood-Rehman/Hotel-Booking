/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Add fallback for Node.js modules if not server-side
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        path: false,
        os: false,
      };
    }

    // Ignore .html files using ignore-loader
    config.module.rules.push({
      test: /\.html$/,
      use: "ignore-loader",
    });

    return config;
  },
  images: {
    domains: ["readymadeui.com", "lh3.googleusercontent.com"],
  },
};

module.exports = nextConfig;
