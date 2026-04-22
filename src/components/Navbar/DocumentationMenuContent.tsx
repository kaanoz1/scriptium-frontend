import {NavigationMenuLink} from "@/components/ui/navigation-menu";
import Link from "next/link";
import {Info, Terminal} from "lucide-react";
import {FaDiscord} from "react-icons/fa";
import {useTranslations} from "next-intl";
import {useLocale} from "use-intl";

const DocumentationMenuContent = () => {


    const t = useTranslations("Navbar.Buttons.Documentation");

    const locale = useLocale();

    return <ul className="w-[320px] max-w-[calc(100vw-1rem)] p-2 sm:p-3 flex flex-col gap-1 sm:gap-2">
        <li>
            <NavigationMenuLink asChild>
                <Link
                    href={`/${locale}/about`}
                    className="w-full flex items-start gap-3 p-2.5 rounded-lg hover:bg-muted/50 transition-colors group cursor-pointer outline-none"
                >
                    <div className="p-2.5 bg-muted/20 rounded-xl transition-colors shrink-0">
                        <Info
                            className="size-5 text-foreground grayscale group-hover:grayscale-0 group-hover:text-amber-500 transition-all duration-300"/>
                    </div>
                    <div className="flex flex-col gap-0.5 mt-0.5">
                                            <span
                                                className="text-xs font-semibold text-foreground group-hover:text-amber-500 transition-colors">
                                                {t("About.Header")}
                                            </span>
                        <span
                            className="text-[11px] text-muted-foreground line-clamp-2 leading-tight">
                                               {t("About.Description")}
                                            </span>
                    </div>
                </Link>
            </NavigationMenuLink>
        </li>

        <li>
            <NavigationMenuLink asChild>
                <Link
                    href={`/${locale}/discord`}
                    className="w-full flex items-start gap-3 p-2.5 rounded-lg hover:bg-muted/50 transition-colors group cursor-pointer outline-none"
                >
                    <div className="p-2.5 bg-muted/20 rounded-xl transition-colors shrink-0">
                        <FaDiscord
                            className="size-5 text-foreground grayscale group-hover:grayscale-0 group-hover:text-[#5865F2] transition-all duration-300"/>
                    </div>
                    <div className="flex flex-col gap-0.5 mt-0.5">
                                            <span
                                                className="text-xs font-semibold text-foreground group-hover:text-[#5865F2] transition-colors">
                                                {t("Discord.Header")}
                                            </span>
                        <span
                            className="text-[11px] text-muted-foreground line-clamp-2 leading-tight">
                                               {t("Discord.Description")}
                                            </span>
                    </div>
                </Link>
            </NavigationMenuLink>
        </li>

        <li>
            <NavigationMenuLink asChild>
                <Link
                    href={`/${locale}/developers`}
                    className="w-full flex items-start gap-3 p-2.5 rounded-lg hover:bg-muted/50 transition-colors group cursor-pointer outline-none"
                >
                    <div className="p-2.5 bg-muted/20 rounded-xl transition-colors shrink-0">
                        <Terminal
                            className="size-5 text-foreground grayscale group-hover:grayscale-0 group-hover:text-emerald-500 transition-all duration-300"/>
                    </div>
                    <div className="flex flex-col gap-0.5 mt-0.5">
                                            <span
                                                className="text-xs font-semibold text-foreground group-hover:text-emerald-500 transition-colors">
                                                {t("ForDevelopers.Header")}
                                            </span>
                        <span
                            className="text-[11px] text-muted-foreground line-clamp-2 leading-tight">
                                                {t("ForDevelopers.Description")}
                                            </span>
                    </div>
                </Link>
            </NavigationMenuLink>
        </li>
    </ul>
};

export default DocumentationMenuContent;