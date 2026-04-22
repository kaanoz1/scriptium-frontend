"use client";

import React from "react";
import { LuMenu } from "react-icons/lu";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useLocale } from "use-intl";
import Link from "next/link";
import ThemeChangeButton from "@/components/Navbar/ThemeChangeButton";
import StatisticsCustomSvgIcon from "./StatisticsCustomSvgIcon";
import ChangeLanguageMenuContent from "@/components/Navbar/ChangeLanguageMenuContent";
import DocumentationMenuContent from "@/components/Navbar/DocumentationMenuContent";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NavigationMenu } from "@/components/ui/navigation-menu";
import {useTranslations} from "next-intl";

const MobileHamburgerButton = () => {
    const locale = useLocale();

    const t = useTranslations("Navbar.QuickNavigation.MobileHamburgerButton");


    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full h-10 w-10 flex items-center justify-center hover:bg-accent/50 transition-colors shrink-0"
                >
                    <LuMenu size={24} className="text-foreground" />
                </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-[85vw] max-w-sm p-0 flex flex-col overflow-hidden">
                <SheetHeader className="p-6 text-left border-b bg-card/50">
                    <SheetTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                        {t("Title")}
                    </SheetTitle>
                </SheetHeader>

                <ScrollArea className="flex-1">
                    <div className="p-5 space-y-6">

                        <section className="space-y-3">
                            <div className="flex flex-col gap-2">
                                <div
                                    className="w-full flex items-center justify-between p-3.5 rounded-xl bg-accent/20 border border-border/50 cursor-pointer active:scale-[0.98] transition-all"
                                    onClick={(e) => e.currentTarget.querySelector('button')?.click()}
                                >
                                    <span className="text-sm font-medium">{t("Appearance")}</span>
                                    <ThemeChangeButton className="h-9 w-9 rounded-lg bg-background shadow-sm border" />
                                </div>

                                <Link
                                    href={`/${locale}/statistics`}
                                    className="w-full flex items-center justify-between p-3.5 rounded-xl bg-accent/20 border border-border/50 active:scale-[0.98] transition-all"
                                >
                                    <span className="text-sm font-medium">Statistics</span>
                                    <div className="h-9 w-9 flex items-center justify-center rounded-lg bg-background shadow-sm border">
                                        <StatisticsCustomSvgIcon className="w-5 h-5 text-primary" />
                                    </div>
                                </Link>
                            </div>
                        </section>

                        <Separator className="opacity-50" />

                        <section className="space-y-3">
                            <h4 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground/60 px-1">
                                {t("Language")}
                            </h4>
                            <NavigationMenu className="block w-full max-w-none">
                                <div className="w-full rounded-xl overflow-hidden border bg-accent/5 [&>div]:w-full! [&>div]:max-w-none!">
                                    <ChangeLanguageMenuContent />
                                </div>
                            </NavigationMenu>
                        </section>

                        <Separator className="opacity-50" />

                        <section className="space-y-3 pb-8">
                            <h4 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground/60 px-1">
                                {t("Resources")}
                            </h4>
                            <NavigationMenu className="block w-full max-w-none">
                                <div className="w-full rounded-xl overflow-hidden border bg-accent/5 [&>ul]:w-full! [&>ul]:max-w-none!">
                                    <DocumentationMenuContent />
                                </div>
                            </NavigationMenu>
                        </section>
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
};

export default MobileHamburgerButton;