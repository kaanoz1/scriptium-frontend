import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';
import { SUPPORTED_LOCAL_KEYS } from "@/configuration/Locale/SupportedLocales/_index";

export const routing = defineRouting({
    locales: SUPPORTED_LOCAL_KEYS,
    defaultLocale: 'en'
});

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);