// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  images: {
    unoptimized: true,
  },
  turbopack: {},
};

const withPWA = require("next-pwa")({
  dest: "public",
  skipWaiting: true,
  dynamicStartUrl: false,
  cacheOnFrontEndNav: true,
});

module.exports = withPWA(nextConfig);
