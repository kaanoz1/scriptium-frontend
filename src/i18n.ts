import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { SUPPORTED_LOCALES } from "@/locale/SupportedLocales/_index";

export default getRequestConfig(async ({ requestLocale }) => {
    const locale = await requestLocale;


    if (!locale || !(locale in SUPPORTED_LOCALES))
        return notFound();


    return {
        locale,
        messages: SUPPORTED_LOCALES[locale as keyof typeof SUPPORTED_LOCALES].translations
    };
});