import React from "react";
import {useLocale} from "use-intl";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import {Button} from "@/components/ui/button";
import {GrPrevious} from "react-icons/gr";
import Link from "next/link";
import {ChapterPlain} from "@/classes/Islam/Quran/Chapter/Plain";
import {useTranslations} from "next-intl";

type Props = {
    chapter: ChapterPlain;
}

const PreviousChapterButton: React.FC<Props> = ({
                                                    chapter
                                                }) => {

    const t = useTranslations("Pages.Islam.Quran.Chapter.Components.VerseContainer.VerseContainerHeader.UtilToolButtons.PreviousChapterButton");

    const chapterNumber = chapter.sequence;

    const locale = useLocale();


    if (chapterNumber === 1) return <Tooltip>
        <TooltipTrigger asChild>
          <span>
            <Button variant="ghost" disabled><GrPrevious/></Button>
          </span>
        </TooltipTrigger>
        <TooltipContent>
            <p>{t("NoPreviousChapter")}</p>
        </TooltipContent>
    </Tooltip>;


    return <Button variant="ghost" size="icon" asChild>
        <Link href={`/${locale}/i/q/${chapterNumber - 1}`}>
            <GrPrevious/>
        </Link>
    </Button>;
}

export default PreviousChapterButton;