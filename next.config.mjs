/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async redirects() {
    return [
      // The "Social Media" pillar became "Brand Experiences". The old
      // work-archive URL may be indexed / linked externally, so it moves
      // permanently to the new service page rather than 404-ing.
      {
        source: "/work/social-media",
        destination: "/services/brand-experiences",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
