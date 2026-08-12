import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Placeholder photography only — see data/images.ts. Delete this once the
    // client's own photos live in public/photos.
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
    ],
  },
};

export default nextConfig;
