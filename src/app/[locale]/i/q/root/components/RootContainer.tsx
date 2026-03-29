"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { observer } from "mobx-react-lite";
import { useLocale, useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart2 } from "lucide-react";
import { RootWithWordCount } from "@/classes/Islam/Quran/Root/WithWordCount";
import { QuranViewPreferences } from "@/configuration/UserPreferences/Islam/Quran/QuranViewPreferences";
import { Badge } from "@/components/ui/badge";

type Props = {
    filterQuery: string;
    roots: RootWithWordCount[];
}

const RootContainer: React.FC<Props> = observer(({ filterQuery, roots }) => {
    const locale = useLocale();
    const t = useTranslations("Pages.Islam.Quran.Root.Components");
    const arabicFont = QuranViewPreferences.getInstance().selectedArabicFont;

    const processedRoots = useMemo(() => {
        const query = filterQuery.toLowerCase().trim();

        const result = query
            ? roots.filter(r => r.latin.toLowerCase().includes(query) || r.text.includes(query))
            : [...roots];

        return result;
    }, [filterQuery, roots]);

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.005 }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6"
        >
            <AnimatePresence>
                {processedRoots.map(r => (
                    <motion.div key={r.latin} variants={item} layout>
                        <Link href={`/${locale}/i/q/root/${r.latin}`}>
                            <div className="group flex flex-col items-center justify-center p-6 pt-10 rounded-2xl border bg-card text-card-foreground shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/50 hover:-translate-y-1 cursor-pointer h-full relative overflow-hidden">

                                <div className="absolute top-3 right-3">
                                    <Badge
                                        variant="secondary"
                                        className="flex items-center gap-1.5 text-[10px] font-medium opacity-80 group-hover:opacity-100 transition-opacity bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                                    >
                                        <BarChart2 size={12} />
                                        <span>{r.occurrences} {t("Header.Occurrences")}</span>
                                    </Badge>
                                </div>

                                <span
                                    className={`text-5xl mb-4 mt-2 font-medium text-foreground group-hover:text-primary transition-colors ${arabicFont.className}`}
                                    dir="rtl"
                                >
                                    {r.text}
                                </span>

                                <span className="text-sm font-mono text-muted-foreground tracking-wider group-hover:text-foreground transition-colors">
                                    {r.latin}
                                </span>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </AnimatePresence>

            {processedRoots.length === 0 && (
                <div className="col-span-full py-20 text-center text-muted-foreground">
                    {t("NoRootsFound") || "No roots found matching your search."}
                </div>
            )}
        </motion.div>
    );
});

export default RootContainer;