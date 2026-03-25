"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {usePathname} from "@/navigation";
import {useTranslations} from "next-intl";
import {Utils} from "@/util";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";

import {FaXTwitter} from "react-icons/fa6";
import {
    FaEnvelope,
    FaInstagram,
    FaDiscord,
    FaPatreon,
    FaPaypal
} from "react-icons/fa";
import {LuGithub} from "react-icons/lu";

const Footer = () => {
    const tt = useTranslations("Tooltip.Platform");
    const currentYear = new Date().getFullYear();
    const pathname = usePathname();

    const isHomePage = pathname === "/" || pathname === "/en" || pathname === "/tr";

    const t = useTranslations("Footer")

    return (
        <footer className="w-full border-t border-border/40 bg-background/95 mt-auto flex justify-center items-center">
            <div
                className="container mx-auto px-4 md:px-8 lg:px-16 py-6 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex flex-col md:flex-row items-center gap-4">
                    {!isHomePage && (
                        <Link href="/en" className="flex items-center gap-2 group">
                                <Image
                                    src={Utils.AssetManager.ScriptiumIconLight}
                                    alt="Scriptium Logo"
                                    width={24}
                                    height={24}
                                    className="dark:hidden object-contain"
                                />
                                <Image
                                    src={Utils.AssetManager.ScriptiumIconDark}
                                    alt="Scriptium Logo"
                                    width={24}
                                    height={24}
                                    className="hidden dark:block  object-contain"
                                />

                        </Link>
                    )}

                    <p className="text-sm text-muted-foreground font-medium">
                        © {currentYear} Scriptium. {t("AllRightsReserved")}
                    </p>
                </div>

                <div className="flex items-center gap-5">
                    <Link href="mailto:contact@scriptium.org"
                          className="text-muted-foreground transition-all hover:text-gray-500 hover:scale-110">
                        <FaEnvelope className="w-5 h-5"/>
                        <span className="sr-only">Email</span>
                    </Link>

                    <Link href="https://instagram.com/scriptium" target="_blank"
                          className="text-muted-foreground transition-all hover:text-pink-500 hover:scale-110">
                        <FaInstagram className="w-5 h-5"/>
                        <span className="sr-only">Instagram</span>
                    </Link>

                    <Link href="https://x.com/scriptium" target="_blank"
                          className="text-muted-foreground transition-all hover:text-foreground hover:scale-110">
                        <FaXTwitter className="w-5 h-5"/>
                        <span className="sr-only">X (Twitter)</span>
                    </Link>

                    <Link href="https://discord.gg/yourlink" target="_blank"
                          className="text-muted-foreground transition-all hover:text-[#5865F2] hover:scale-110">
                        <FaDiscord className="w-5 h-5"/>
                        <span className="sr-only">Discord</span>
                    </Link>

                    <Link href="https://github.com/scriptium" target="_blank"
                          className="text-muted-foreground transition-all hover:text-foreground hover:scale-110">
                        <LuGithub className="w-5 h-5"/>
                        <span className="sr-only">GitHub</span>
                    </Link>

                    <Link href="https://patreon.com/scriptium" target="_blank"
                          className="text-muted-foreground transition-all hover:text-[#FF424D] hover:scale-110">
                        <FaPatreon className="w-5 h-5"/>
                        <span className="sr-only">Patreon</span>
                    </Link>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <span className="text-muted-foreground/30 cursor-not-allowed">
                                <FaPaypal className="w-5 h-5"/>
                                <span className="sr-only">PayPal</span>
                            </span>
                        </TooltipTrigger>
                        <TooltipContent side="top">
                            <p className="text-xs font-semibold">{tt('NotActive')}</p>
                        </TooltipContent>
                    </Tooltip>
                </div>

            </div>
        </footer>
    );
};

export default Footer;