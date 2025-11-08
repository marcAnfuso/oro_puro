import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: 'export', // Comentado temporalmente para usar middleware
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
