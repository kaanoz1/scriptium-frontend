"use client";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import ThemeChangeButton from "@/components/Navbar/ThemeChangeButton";
import StatisticsCustomSvgIcon from "./StatisticsCustomSvgIcon";
import {GrLanguage} from "react-icons/gr";
import {IoBookOutline} from "react-icons/io5";
import Link from "next/link";
import ChangeLanguageMenuContent from "@/components/Navbar/ChangeLanguageMenuContent";
import DocumentationMenuContent from "@/components/Navbar/DocumentationMenuContent";
import {useLocale} from "use-intl";
import {useTranslations} from "next-intl";

const NavbarButtons = () => {

    const locale = useLocale();
    const t = useTranslations("Navbar.Buttons");

    return (
        <NavigationMenu>
            <NavigationMenuList className="gap-1 sm:gap-3">
                <NavigationMenuItem>
                    <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} h-11 px-2 sm:px-4`}>
                        <ThemeChangeButton/>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} h-11 px-2 sm:px-4`}>
                        <Link href={`/${locale}/statistics`} className="flex items-center justify-center gap-2">
                            <StatisticsCustomSvgIcon className="w-5 h-5"/>
                            <span className="sr-only">{t("Statistics")}</span>
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuTrigger className="h-11 px-2 sm:px-4 gap-2">
                        <GrLanguage className="w-4 h-4"/>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ChangeLanguageMenuContent/>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuTrigger className="h-11 px-2 sm:px-4 gap-2">
                        <IoBookOutline className="w-4 h-4"/>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <DocumentationMenuContent/>
                    </NavigationMenuContent>
                </NavigationMenuItem>

            </NavigationMenuList>
        </NavigationMenu>
    );
};

export default NavbarButtons;