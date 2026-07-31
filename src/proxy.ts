import createMiddleware from 'next-intl/middleware';
import {SUPPORTED_LOCAL_KEYS} from "@/locale/SupportedLocales/_index";

export default createMiddleware({

    locales: ["en"],
    defaultLocale: 'en'
});

// noinspection JSUnusedGlobalSymbols
export const config = {
    matcher: ['/', '/en/:path*']
};