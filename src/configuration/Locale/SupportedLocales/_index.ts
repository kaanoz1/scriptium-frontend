import trTranslations from "@/configuration/Locale/SupportedLocales/tr";
import enTranslation from "@/configuration/Locale/SupportedLocales/en";
import {SystemLanguage} from "@/configuration/Locale/SystemLanguage";

export type TLocaleInformation = {
    nameEnglish: string;
    nameOwn: string;
    code: string;
    translations: SystemLanguage;
};

export const SUPPORTED_LOCALES: Record<string, TLocaleInformation> = {
    en: {
        nameEnglish: "English",
        nameOwn: "English",
        code: "en",
        translations: enTranslation,
    },
    tr: {
        nameEnglish: "Turkish",
        nameOwn: "Türkçe",
        code: "tr",
        translations: trTranslations,
    },

} as const;

export type LocaleKey = keyof typeof SUPPORTED_LOCALES;

export const SUPPORTED_LOCAL_KEYS = Object.keys(SUPPORTED_LOCALES) as LocaleKey[];