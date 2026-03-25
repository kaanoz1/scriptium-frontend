import createMiddleware from 'next-intl/middleware';
import {SUPPORTED_LOCAL_KEYS} from "@/configuration/Locale/SupportedLocales/_index";

export default createMiddleware({

    locales: SUPPORTED_LOCAL_KEYS,
    defaultLocale: 'en'
});

export const config = {
    matcher: ['/', '/(tr|en)/:path*']
};