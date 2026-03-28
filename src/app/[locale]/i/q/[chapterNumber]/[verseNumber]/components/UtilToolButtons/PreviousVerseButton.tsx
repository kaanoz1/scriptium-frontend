import React from "react";
import {useLocale} from "use-intl";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import {Button} from "@/components/ui/button";
import {GrPrevious} from "react-icons/gr";
import Link from "next/link";
import {useTranslations} from "next-intl";
import {VerseBoth} from "@/classes/Islam/Quran/Verse/Both";

type Props = {
    verse: VerseBoth;
}

const PreviousVerseButton: React.FC<Props> = ({
                                                  verse
                                              }) => {
    const locale = useLocale();

    const t = useTranslations("Pages.Islam.Quran.Chapter.Verse.Components.UtilToolButtons.PreviousVerseButton");

    const verseNumber = verse.sequence;
    const chapter = verse.chapter;
    const chapterNumber = chapter.sequence;

    const doesPreviousVerseExists = verseNumber > 1;

    if (!doesPreviousVerseExists) return <Tooltip>
        <TooltipTrigger asChild>
          <span>
            <Button variant="ghost" disabled><GrPrevious/></Button>
          </span>
        </TooltipTrigger>
        <TooltipContent>
            <p>{t("NoPreviousVerse")}</p>
        </TooltipContent>
    </Tooltip>;


    return <Button variant="ghost" size="icon" asChild>
        <Link href={`/${locale}/i/q/${chapterNumber}/${verseNumber - 1}`}>
            <GrPrevious/>
        </Link>
    </Button>;
}

export default PreviousVerseButton;