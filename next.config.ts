import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    deviceSizes: [360, 414, 640, 768, 1024, 1280, 1536],
    formats: ["image/webp"],
    imageSizes: [64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
    unoptimized: true,
  },
  poweredByHeader: false,
};

export default nextConfig;
