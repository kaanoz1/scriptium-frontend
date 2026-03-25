import createMiddleware from 'next-intl/middleware';
import {SUPPORTED_LOCAL_KEYS} from "@/locale/SupportedLocales/_index";

export default createMiddleware({

    locales: SUPPORTED_LOCAL_KEYS,
    defaultLocale: 'en'
});

// noinspection JSUnusedGlobalSymbols
export const config = {
    matcher: ['/', '/(tr|en)/:path*']
};