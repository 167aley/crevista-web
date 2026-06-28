import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // allow our own trusted SVG tiles through next/image (sandboxed, no scripts)
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
