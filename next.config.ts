import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async redirects() {
    return [
      {
        // post renamed: framing changed from "i gave the AI the answer" to the
        // length-checked-a-dropdown angle. keep the old shared link alive.
        source: "/journal/i-gave-the-ai-the-answer-it-still-guarded-the-wrong-thing",
        destination: "/journal/the-ai-length-checked-a-dropdown",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
