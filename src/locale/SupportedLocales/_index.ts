import trTranslations from "@/locale/SupportedLocales/tr";
import enTranslation from "@/locale/SupportedLocales/en";
import {SystemLanguage} from "@/locale/SystemLanguage";

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


export const SUPPORTED_LOCAL_KEYS = ["en", "tr"] as const;