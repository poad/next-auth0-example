import withBundleAnalyzer from '@next/bundle-analyzer';

/** @type {import('next').NextConfig} */
const config = {
  output: 'export',
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    esmExternals: true,
  }
};

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})(config);
