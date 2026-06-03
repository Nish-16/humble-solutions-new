/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Serve AVIF first (50% smaller than WebP), fall back to WebP, then original.
    formats: ["image/avif", "image/webp"],
    // Allow next/image to optimize testimonial placeholder images.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
  },
};

module.exports = nextConfig;
