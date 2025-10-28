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
      {
        protocol: "https",
        hostname: "acdn-us.mitiendanube.com",
        port: "",
        pathname: "/stores/005/200/430/products/**",
      },
      {
        protocol: "https",
        hostname: "newbrasil.vtexassets.com",
        port: "",
        pathname: "/arquivos/ids/**",
      },
    ],
  },
};

export default nextConfig;
