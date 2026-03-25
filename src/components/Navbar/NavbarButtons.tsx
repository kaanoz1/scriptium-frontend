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
import {SUPPORTED_LOCAL_KEYS, SUPPORTED_LOCALES} from "@/configuration/Locale/SupportedLocales/_index";
import {FiCheck} from "react-icons/fi";

import {Info, Terminal} from "lucide-react";
import {FaDiscord} from "react-icons/fa";
import {IoBookOutline} from "react-icons/io5";
import Link from "next/link";

const NavbarButtons = () => {
    const currentLocale = "en";

    return (
        <NavigationMenu>
            <NavigationMenuList className="gap-3">

                <NavigationMenuItem>
                    <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} h-11 px-4`}>
                        <ThemeChangeButton/>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} h-11 px-4`}>
                        <Link href="/statistics" className="flex items-center justify-center gap-2">
                            <StatisticsCustomSvgIcon className="w-5 h-5" />
                            <span className="sr-only">Statistics</span>
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuTrigger className="h-11 px-4 gap-2">
                        <GrLanguage className="w-4 h-4"/>
                        <span className="sr-only">Change Language</span>
                    </NavigationMenuTrigger>

                    <NavigationMenuContent>
                        <div className="w-80 p-4">
                            <div className="mb-4">
                                <h4 className="text-xs font-semibold leading-none mb-1 text-foreground">
                                    Language
                                </h4>
                                <p className="text-[11px] text-muted-foreground">
                                    Select your preferred language for the interface.
                                </p>
                            </div>

                            <ul className="flex flex-col gap-1">
                                {SUPPORTED_LOCAL_KEYS.map((localeKey) => {
                                    const locale = SUPPORTED_LOCALES[localeKey];
                                    const isSelected = currentLocale === localeKey;

                                    return (
                                        <li key={localeKey}>
                                            <button
                                                onClick={() => console.log(`Switching to ${localeKey}`)}
                                                className={`w-full flex items-center justify-between px-3 py-2 rounded-md transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 ${
                                                    isSelected ? "bg-slate-100 dark:bg-slate-800 font-medium" : "text-slate-600 dark:text-slate-300"
                                                }`}
                                            >
                                                <div className="flex flex-col items-start">
                                                    <span className="text-xs text-foreground">{locale.nameOwn}</span>
                                                    <span className="text-[11px] text-muted-foreground">
                                                        {locale.nameEnglish}
                                                    </span>
                                                </div>

                                                {isSelected && (
                                                    <FiCheck className="w-4 h-4 text-primary"/>
                                                )}
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuTrigger className="h-11 px-4 gap-2">
                        <IoBookOutline className="w-4 h-4"/>
                        <span className="sr-only">Resources</span>
                    </NavigationMenuTrigger>

                    <NavigationMenuContent>
                        <ul className="w-[320px] p-3 flex flex-col gap-2">
                            <li>
                                <NavigationMenuLink asChild>
                                    <Link
                                        href="/about"
                                        className="w-full flex items-start gap-3 p-2.5 rounded-lg hover:bg-muted/50 transition-colors group cursor-pointer outline-none"
                                    >
                                        <div className="p-2.5 bg-muted/20 rounded-xl transition-colors shrink-0">
                                            <Info className="size-5 text-foreground grayscale group-hover:grayscale-0 group-hover:text-amber-500 transition-all duration-300"/>
                                        </div>
                                        <div className="flex flex-col gap-0.5 mt-0.5">
                                            <span className="text-xs font-semibold text-foreground group-hover:text-amber-500 transition-colors">
                                                About
                                            </span>
                                            <span className="text-[11px] text-muted-foreground line-clamp-2 leading-tight">
                                                Learn about our mission, sources, and team.
                                            </span>
                                        </div>
                                    </Link>
                                </NavigationMenuLink>
                            </li>

                            <li>
                                <NavigationMenuLink asChild>
                                    <Link
                                        href="/discord"
                                        className="w-full flex items-start gap-3 p-2.5 rounded-lg hover:bg-muted/50 transition-colors group cursor-pointer outline-none"
                                    >
                                        <div className="p-2.5 bg-muted/20 rounded-xl transition-colors shrink-0">
                                            <FaDiscord className="size-5 text-foreground grayscale group-hover:grayscale-0 group-hover:text-[#5865F2] transition-all duration-300"/>
                                        </div>
                                        <div className="flex flex-col gap-0.5 mt-0.5">
                                            <span className="text-xs font-semibold text-foreground group-hover:text-[#5865F2] transition-colors">
                                                Discord
                                            </span>
                                            <span className="text-[11px] text-muted-foreground line-clamp-2 leading-tight">
                                                Use our bot to read scriptures directly in Discord.
                                            </span>
                                        </div>
                                    </Link>
                                </NavigationMenuLink>
                            </li>

                            <li>
                                <NavigationMenuLink asChild>
                                    <Link
                                        href="/developers"
                                        className="w-full flex items-start gap-3 p-2.5 rounded-lg hover:bg-muted/50 transition-colors group cursor-pointer outline-none"
                                    >
                                        <div className="p-2.5 bg-muted/20 rounded-xl transition-colors shrink-0">
                                            <Terminal className="size-5 text-foreground grayscale group-hover:grayscale-0 group-hover:text-emerald-500 transition-all duration-300"/>
                                        </div>
                                        <div className="flex flex-col gap-0.5 mt-0.5">
                                            <span className="text-xs font-semibold text-foreground group-hover:text-emerald-500 transition-colors">
                                                For Developers
                                            </span>
                                            <span className="text-[11px] text-muted-foreground line-clamp-2 leading-tight">
                                                Access our API, documentation, and tools for building.
                                            </span>
                                        </div>
                                    </Link>
                                </NavigationMenuLink>
                            </li>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

            </NavigationMenuList>
        </NavigationMenu>
    );
};

export default NavbarButtons;