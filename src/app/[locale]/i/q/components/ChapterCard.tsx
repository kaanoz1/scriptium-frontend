"use client";

import React from "react";
import {motion, Variants} from "framer-motion";
import {LuBookOpen} from "react-icons/lu";
import {useLocale} from "use-intl";
import {ChapterWithVerseCount} from "@/classes/Islam/Quran/Chapter/WithVerseCount";
import {useTranslations} from "next-intl";
import {usePathname} from "next/navigation";
import Link from "next/link";

type Props = {
    chapter: ChapterWithVerseCount
}


const ChapterCard: React.FC<Props> = ({chapter}) => {
    const locale = useLocale();

    const t = useTranslations("Pages.Islam.Quran.Components.ChapterCard");


    const matchedMeaning = chapter.meanings.find(
        (meaning) => meaning.language.code === locale

    );

    const meaningText = matchedMeaning ? matchedMeaning.text : "";


    const path = usePathname();

    return (
        <motion.div variants={itemVariants} className="h-full">
            <Link href={path + `/${chapter.sequence}`}>
                <div
                    className="group relative flex h-full cursor-pointer flex-col justify-between overflow-hidden rounded-xl border border-border/50 bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg dark:bg-card/50 dark:backdrop-blur-sm">

                    <div className="flex items-start justify-between">
                        <div
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                            {chapter.sequence}
                        </div>

                        <div className="text-right">
                            <h3 className="text-2xl font-bold leading-none tracking-tight">
                                {chapter.name}
                            </h3>
                        </div>
                    </div>

                    <div className="mt-8 flex items-end justify-between">
                        <div className="space-y-1.5 flex-1 pr-4">
                            <h4 className="min-h-5 text-sm font-semibold tracking-tight">
                                {meaningText}
                            </h4>

                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                <LuBookOpen size={14} className="transition-colors group-hover:text-primary"/>
                                <span>{chapter.verseCount} {t("Verses")}</span>
                            </div>
                        </div>
                    </div>

                </div>
            </Link>
        </motion.div>
    );
}

export default ChapterCard;

const itemVariants: Variants = {
    hidden: {opacity: 0, y: 20},
    visible: {
        opacity: 1,
        y: 0,
        transition: {type: "spring", stiffness: 300, damping: 24}
    }
};
