/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Desativa a verificação de tipos durante o build
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
