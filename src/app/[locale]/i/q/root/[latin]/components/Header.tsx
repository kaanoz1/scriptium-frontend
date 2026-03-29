"use client";

import React from "react";
import {observer} from "mobx-react-lite";
import {useTranslations} from "next-intl";
import {BarChart2} from "lucide-react";
import {RootUpToQuran} from "@/classes/Islam/Quran/Root/UpToQuran";
import {QuranViewPreferences} from "@/configuration/UserPreferences/Islam/Quran/QuranViewPreferences";
import {Badge} from "@/components/ui/badge";

type Props = {
    root: RootUpToQuran
}

const Header: React.FC<Props> = observer(({root}) => {
    const t = useTranslations("Pages.Islam.Quran.Root.Components.Header");
    const occurrences = root.words.length;
    const arabicFont = QuranViewPreferences.getInstance().selectedArabicFont;

    return (
        <div className="flex flex-col items-start gap-3">
            <div className="flex items-baseline gap-4">
                <h1
                    className={`text-5xl md:text-6xl font-medium text-foreground ${arabicFont.className}`}
                    dir="rtl"
                >
                    {root.text}
                </h1>
                <span className="text-2xl md:text-3xl font-mono text-muted-foreground tracking-wider">
                    {root.latin}
                </span>
            </div>

            <Badge
                variant="secondary"
                className="flex items-center gap-1.5 mt-1 bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-sm px-3 py-1"
            >
                <BarChart2 size={16}/>
                <span>{occurrences} {t("Occurrences")}</span>
            </Badge>
        </div>
    );
});

export default Header;