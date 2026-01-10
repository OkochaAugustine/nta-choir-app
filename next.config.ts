import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["i.ytimg.com"], // ✅ allow YouTube thumbnails
  },
  // other config options if you have
};

export default nextConfig;
