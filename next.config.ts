import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    deviceSizes: [360, 414, 640, 768, 1024, 1280, 1536],
    formats: ["image/avif", "image/webp"],
    imageSizes: [64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
    qualities: [70, 75, 76, 78, 80, 82, 84, 85, 86, 88, 90],
    unoptimized: true,
  },
  poweredByHeader: false,
};

export default nextConfig;
