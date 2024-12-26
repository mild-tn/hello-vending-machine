import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    API_URL: process.env.API_URL,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "st.bigc-cs.com" },
      { protocol: "https", hostname: "example.com" },
      { protocol: "https", hostname: "st.depositphotos.com" },
      { protocol: "https", hostname: "cdn.imweb.me" },
      { protocol: "https", hostname: "down-th.img.susercontent.com" },
      { protocol: "https", hostname: "beverages2u.com" },
      { protocol: "https", hostname: "market.borong.com" },
      { protocol: "https", hostname: "assets.tops.co.th" },
      { protocol: "https", hostname: "www.newsnationnow.com" },
      { protocol: "https", hostname: "media.istockphoto.com" },
    ],
  },
};

export default nextConfig;
