"use client";

import React from "react";
import { observer } from "mobx-react-lite";
import { useLocale } from "next-intl";
import { ChevronRight } from "lucide-react";
import { WordUpToQuran } from "@/classes/Islam/Quran/Word/UpToQuran";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { QuranViewPreferences } from "@/configuration/UserPreferences/Islam/Quran/QuranViewPreferences";
import VerseBox from "@/app/[locale]/i/q/[chapterNumber]/components/VerseBox";
import { Badge } from "@/components/ui/badge";

type Props = {
    word: WordUpToQuran,
    accordionValue: string
}

const RootRow: React.FC<Props> = observer(({ word, accordionValue: value }) => {
    const locale = useLocale();
    const arabicFont = QuranViewPreferences.getInstance().selectedArabicFont;

    const wordText = word.text;
    const wordNumber = word.sequence;
    const verse = word.verse;
    const verseNumber = verse.sequence;
    const chapter = verse.chapter;
    const chapterNumber = chapter.sequence;

    const chapterMeaning = chapter.meanings.find(m => m.language.code === locale)?.text;
    const chapterName = chapter.name;

    const wordIndex = parseInt(value) + 1;

    return (
        <AccordionItem
            value={value}
            className="border bg-card rounded-xl mb-4 px-2 sm:px-4 shadow-sm data-[state=open]:border-primary/50 transition-colors"
        >
            <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-left w-full pr-4">

                    <Badge variant="outline" className="text-xs font-mono text-muted-foreground shrink-0 bg-muted/50">
                        #{wordIndex}
                    </Badge>

                    <div className="flex flex-wrap items-center gap-1.5 text-sm sm:text-base font-medium text-muted-foreground">
                        <span className="text-foreground">{chapterNumber}.</span>
                        {chapterMeaning ? (
                            <span>{chapterMeaning}</span>
                        ) : (
                            <span className={`text-lg ${arabicFont.className}`} dir="rtl">{chapterName}</span>
                        )}
                        <ChevronRight size={14} className="opacity-50 mx-0.5" />
                        <span>{verseNumber}</span>
                        <ChevronRight size={14} className="opacity-50 mx-0.5" />
                        <span>{wordNumber}</span>
                    </div>

                    <div className="ml-auto shrink-0 pl-2">
                        <span className={`text-3xl font-medium text-foreground ${arabicFont.className}`} dir="rtl">
                            {wordText}
                        </span>
                    </div>
                </div>
            </AccordionTrigger>

            <AccordionContent className="pt-2 pb-6 px-1">
                <div className="rounded-xl p-1 sm:p-4">
                    <VerseBox chapter={chapter} verse={verse} />
                </div>
            </AccordionContent>
        </AccordionItem>
    );
});

export default RootRow;