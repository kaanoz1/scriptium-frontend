import { SystemLanguage } from "@/configuration/Locale/SystemLanguage";

declare global {
    class IntlMessages extends SystemLanguage {}
}