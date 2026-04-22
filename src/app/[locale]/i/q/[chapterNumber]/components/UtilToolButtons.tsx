"use client";

import React from "react";
import {observer} from "mobx-react-lite";
import AudioPlayButton from "@/app/[locale]/i/q/[chapterNumber]/components/UtilToolButtons/AudioPlayButton";
import ShareButton from "@/app/[locale]/i/q/[chapterNumber]/components/UtilToolButtons/ShareButton";
import QuranTranslationChangeButton
    from "@/app/[locale]/i/q/[chapterNumber]/components/UtilToolButtons/QuranTranslationChangeButton";
import QuranConfigurationButton
    from "@/app/[locale]/i/q/[chapterNumber]/components/UtilToolButtons/QuranConfigurationButton";
import PreviousChapterButton from "@/app/[locale]/i/q/[chapterNumber]/components/UtilToolButtons/PreviousChapterButton";
import NextChapterButton from "@/app/[locale]/i/q/[chapterNumber]/components/UtilToolButtons/NextChapterButton";
import {useLocale} from "use-intl";
import {ChapterComplete} from "@/classes/Islam/Quran/Chapter/Complete";
import {ClientUtils} from "@/util/ClientUtils";


type Props = {
    chapter: ChapterComplete;
}

const UtilToolButtons: React.FC<Props> = observer(({chapter}) => {

    const locale = useLocale()

    const shareText = ClientUtils.Islam.Quran.Chapter.createChapterShareText(chapter, locale);

    return (
        <aside className="w-full flex flex-wrap items-center justify-between sm:justify-end gap-1.5 sm:gap-2 gap-y-2 ">
            <AudioPlayButton/>
            <ShareButton shareText={shareText}/>
            <div className="h-6 w-px bg-border mx-1 hidden sm:block"/>
            <QuranTranslationChangeButton/>
            <QuranConfigurationButton/>
            <div className="h-6 w-px bg-border mx-1 hidden sm:block"/>
            <PreviousChapterButton chapter={chapter}/>
            <NextChapterButton chapter={chapter}/>
        </aside>
    );
});

export default UtilToolButtons;