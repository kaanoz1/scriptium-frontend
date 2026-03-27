"use client";

import React from "react";
import Link from "next/link";
import {useLocale, useTranslations} from "next-intl";
import {ChapterPlain} from "@/classes/Islam/Quran/Chapter/Plain";
import {Tooltip, TooltipContent, TooltipTrigger, TooltipProvider} from "@/components/ui/tooltip";
import {Button} from "@/components/ui/button";
import {GrNext} from "react-icons/gr";

type Props = { chapter: ChapterPlain; }

const NextChapterButton: React.FC<Props> = ({chapter}) => {
    const chapterNumber = chapter.sequence;
    const locale = useLocale();
    const t = useTranslations("Pages.Islam.Quran.Chapter.Components.VerseContainer.VerseContainerHeader.UtilToolButtons.NextChapterButton");

    if (chapterNumber === 114) {
        return (
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <span>
                            <Button variant="ghost" size="icon" disabled><GrNext size={16}/></Button>
                        </span>
                    </TooltipTrigger>
                    <TooltipContent><p>{t("NoNextChapter")}</p></TooltipContent>
                </Tooltip>
            </TooltipProvider>
        );
    }

    return (
        <Button variant="ghost" size="icon" asChild>
            <Link href={`/${locale}/i/q/${chapterNumber + 1}`}>
                <GrNext size={16}/>
            </Link>
        </Button>
    );
}

export default NextChapterButton;