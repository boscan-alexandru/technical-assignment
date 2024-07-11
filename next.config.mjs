/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.cartomanti.live",
        port: "",
        pathname: "/chat-app/**",
      },
    ],
  },
  output: "standalone",
};

export default nextConfig;
