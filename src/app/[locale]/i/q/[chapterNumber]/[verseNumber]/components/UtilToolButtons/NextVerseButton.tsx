"use client";

import React from "react";
import Link from "next/link";
import {useLocale, useTranslations} from "next-intl";
import {ChapterPlain} from "@/classes/Islam/Quran/Chapter/Plain";
import {Tooltip, TooltipContent, TooltipTrigger, TooltipProvider} from "@/components/ui/tooltip";
import {Button} from "@/components/ui/button";
import {GrNext} from "react-icons/gr";
import {VersePlain} from "@/classes/Islam/Quran/Verse/Plain";
import {VerseBoth} from "@/classes/Islam/Quran/Verse/Both";
import {ClientUtils} from "@/util/ClientUtils";

type Props = { verse: VerseBoth; }

const NextVerseButton: React.FC<Props> = ({verse}) => {

    const locale = useLocale();
    const t = useTranslations("Pages.Islam.Quran.Chapter.Verse.Components.UtilToolButtons.NextVerseButton");


    const verseNumber = verse.sequence;
    const chapter = verse.chapter;
    const chapterNumber = chapter.sequence;

    const verseLimitOfChapter = ClientUtils.Islam.Quran.VerseCountIndicator[chapterNumber - 1];

    const doesNextVerseExists = verseNumber < verseLimitOfChapter;

    if (!doesNextVerseExists) {
        return (
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <span>
                            <Button variant="ghost" size="icon" disabled><GrNext size={16}/></Button>
                        </span>
                    </TooltipTrigger>
                    <TooltipContent><p>{t("NoNextVerse")}</p></TooltipContent>
                </Tooltip>
            </TooltipProvider>
        );
    }

    return (
        <Button variant="ghost" size="icon" asChild>
            <Link href={`/${locale}/i/q/${chapterNumber}/${verseNumber + 1}`}>
                <GrNext size={16}/>
            </Link>
        </Button>
    );
}

export default NextVerseButton;