/** @type {import('next').NextConfig} */
import withBundleAnalyzer from '@next/bundle-analyzer';

const config = withBundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
})({
    reactStrictMode: true,
    swcMinify: true,
    experimental: {
        esmExternals: true,
    }
});

export default config;
