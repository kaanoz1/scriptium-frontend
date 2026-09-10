import createMiddleware from 'next-intl/middleware';

export default createMiddleware({

    locales: ["en"],
    defaultLocale: 'en'
});

// noinspection JSUnusedGlobalSymbols
export const config = {
    matcher: ['/', '/en/:path*']
};