"use client";

import React from "react";
import { HomeIcon } from "lucide-react";
import { motion } from "framer-motion";
import { observer } from "mobx-react-lite";
import { useLocale, useTranslations } from "next-intl";
import { VerseBoth } from "@/classes/Islam/Quran/Verse/Both";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {QuranViewPreferences} from "@/configuration/UserPreferences/Islam/Quran/QuranViewPreferences";

type Props = {
    verse: VerseBoth;
}

const Breadcrumbs: React.FC<Props> = observer(({ verse }) => {
    const locale = useLocale();
    const t = useTranslations("Terms.Islam");
    const gt = useTranslations("Terms.General");

    const verseNumber = verse.sequence;
    const chapter = verse.chapter;
    const chapterNumber = chapter.sequence;

    const meaning = chapter.meanings.find(m => m.language.code === locale)?.text
        ?? chapter.name;

    const selectedArabicFont = QuranViewPreferences.getInstance().selectedArabicFont;


    return (
        <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-x-auto pb-2 scrollbar-hide"
        >
            <Breadcrumb>
                <BreadcrumbList className="flex-nowrap whitespace-nowrap">
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/${locale}`} className="flex items-center gap-1.5 transition-colors hover:text-primary">
                            <HomeIcon size={14} />
                            <span className="hidden sm:inline">{gt("HomePage")}</span>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/${locale}/i`} className="transition-colors hover:text-primary">
                            {t("this")}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/${locale}/i/q`} className="transition-colors hover:text-primary">
                            {t("Quran.this")}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/${locale}/i/q/${chapterNumber}`} className="transition-colors hover:text-primary">
                            {chapterNumber}. <span className={meaning === chapter.name ? selectedArabicFont.className : ""}>{meaning}</span>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage className="font-semibold text-foreground">
                            {t("Quran.Verse.this") || "Verse"} {verseNumber}
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </motion.div>
    );
});

export default Breadcrumbs;