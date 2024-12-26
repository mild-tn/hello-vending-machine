import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    API_URL: process.env.API_URL,
  },
  images: {
    domains: [
      "images.pexels.com",
      "st.bigc-cs.com",
      "example.com",
      "st.depositphotos.com",
      "cdn.imweb.me",
      "down-th.img.susercontent.com",
      "beverages2u.com",
    ],
  },
};

export default nextConfig;
