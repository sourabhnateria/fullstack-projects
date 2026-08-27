/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "b3h2.scene7.com",
        pathname: "/is/image/**",
      },
    ],
  },
};

export default nextConfig;
