/** @type {import('next').NextConfig} */
const nextConfig = {images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'jkvkppctrorkcqrbwacw.supabase.co', // Your Supabase project hostname
        port: '', // No port specified
        pathname: '/storage/v1/object/public/listings-images/**', // Path to your images
      },
    ],
  },};

export default nextConfig;
