/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
});

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'via.placeholder.com',
      'placehold.co',
      'via.placeholder.co',
      'https://kanerdul.com',
      'kanerdul.com',
    ],
  },
};

module.exports = withPWA(nextConfig);
