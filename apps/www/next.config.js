/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/:page",
        destination: "/?page=:page",
        permanent: true,
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: "/",
        has: [{ type: "query", key: "page" }],
        destination: "/:page",
      },
      {
        source: "/",
        destination: "/1",
      },
    ]
  },
  reactStrictMode: true
}

module.exports = nextConfig
