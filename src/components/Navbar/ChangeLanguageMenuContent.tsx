import {SUPPORTED_LOCAL_KEYS, SUPPORTED_LOCALES} from "@/locale/SupportedLocales/_index";
import {FiCheck} from "react-icons/fi";
import {useTranslations} from "next-intl";
import {useLocale} from "use-intl";
import {usePathname, useRouter} from "@/navigation";

const ChangeLanguageMenuContent = () => {
    const t = useTranslations("Navbar.Buttons.LanguageChange")

    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const handleLanguageChange = (newLocale: string) => router.replace(pathname, {locale: newLocale})

    return    <div className="w-80 p-4">
        <div className="mb-4">
            <h4 className="text-xs font-semibold leading-none mb-1 text-foreground">
                {t("Header")}
            </h4>
            <p className="text-[11px] text-muted-foreground">
                {t("Description")}
            </p>
        </div>

        <ul className="flex flex-col gap-1">
            {SUPPORTED_LOCAL_KEYS.map((localeKey) => {
                const localeInfo = SUPPORTED_LOCALES[localeKey];
                const isSelected = locale === localeKey;

                return (
                    <li key={localeKey}>
                        <button
                            onClick={() => handleLanguageChange(localeKey)}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-md transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 ${
                                isSelected ? "bg-slate-100 dark:bg-slate-800 font-medium" : "text-slate-600 dark:text-slate-300"
                            }`}
                        >
                            <div className="flex flex-col items-start text-left">
                                <span className="text-xs text-foreground font-semibold">
                                    {localeInfo.nameOwn}
                                </span>
                                <span className="text-[11px] text-muted-foreground">
                                    {localeInfo.nameEnglish}
                                </span>
                            </div>
                            {isSelected && <FiCheck className="w-4 h-4 text-primary"/>}
                        </button>
                    </li>
                );
            })}
        </ul>
    </div>
}

export default ChangeLanguageMenuContent;