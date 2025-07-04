import type { NextConfig } from "next";
import { withNextVideo } from "next-video/process";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
      },
      
      {
        protocol: 'https',
        hostname: 'horuslearn.s3.amazonaws.com'
      }
    ],
  }
};

export default withNextVideo(nextConfig);