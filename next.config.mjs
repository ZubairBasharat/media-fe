/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    SERVER_URL: process.env.SERVER_URL,
    IMAGE_URL: process.env.IMAGE_URL,
  },
  experimental: {
    appDir: true,
    images: {
      domains: [
        "xsgames.co",
        "10.11.105.119",
       "http://10.11.105.119:8000"
      ]
    }
  },
}

export default nextConfig
