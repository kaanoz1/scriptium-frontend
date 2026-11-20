import createNextIntlPlugin from 'next-intl/plugin';
import {NextConfig} from "next";
const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

const nextConfig: NextConfig = {
    output: "standalone",
    async redirects() {
        return [{ source: "/", destination: "/en", permanent: false }];
    },
};

export default withNextIntl(nextConfig);