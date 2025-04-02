/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/crypto",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
