/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    optimizePackageImports: ['lucide-react']
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Configurações para WebView Android
  trailingSlash: false,
  poweredByHeader: false,
  compress: true,
  images: {
    unoptimized: true
  }
}

export default nextConfig
