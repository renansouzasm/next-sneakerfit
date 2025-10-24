import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "twftinvtkstgcriamblf.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/product-thumbs/**",
      },
      {
        protocol: "https",
        hostname: "twftinvtkstgcriamblf.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/user-avatars/**",
      },
      {
        protocol: "https",
        hostname: "twftinvtkstgcriamblf.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/placeholders/**",
      },
    ],
  },
};

export default nextConfig;
