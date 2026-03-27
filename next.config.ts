import createNextIntlPlugin from 'next-intl/plugin';
import {NextConfig} from "next";
const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

const nextConfig: NextConfig = {
    serverExternalPackages: ['@prisma/client', 'prisma'],
    output: "standalone",
};

export default withNextIntl(nextConfig);