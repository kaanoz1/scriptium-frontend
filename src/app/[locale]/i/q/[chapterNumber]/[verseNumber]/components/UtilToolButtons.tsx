"use client";

import React from "react";
import { observer } from "mobx-react-lite";
import { useLocale } from "next-intl";
import { VerseBoth } from "@/classes/Islam/Quran/Verse/Both";
import { ClientUtils } from "@/util/ClientUtils";
import { QuranTranslationPreferences } from "@/configuration/UserPreferences/Islam/Quran/QuranTranslationPreferences";

import AudioPlayButton from "@/app/[locale]/i/q/[chapterNumber]/[verseNumber]/components/UtilToolButtons/AudioPlayButton";
import ShareButton from "@/app/[locale]/i/q/[chapterNumber]/[verseNumber]/components/UtilToolButtons/ShareButton";
import QuranTranslationChangeButton from "@/app/[locale]/i/q/[chapterNumber]/[verseNumber]/components/UtilToolButtons/QuranTranslationChangeButton";
import QuranConfigurationButton from "@/app/[locale]/i/q/[chapterNumber]/[verseNumber]/components/UtilToolButtons/QuranConfigurationButton";
import PreviousVerseButton from "@/app/[locale]/i/q/[chapterNumber]/[verseNumber]/components/UtilToolButtons/PreviousVerseButton";
import NextVerseButton from "@/app/[locale]/i/q/[chapterNumber]/[verseNumber]/components/UtilToolButtons/NextVerseButton";

type Props = {
    verse: VerseBoth;
}

const UtilToolButtons: React.FC<Props> = observer(({ verse }) => {
    const locale = useLocale();
    const chapter = verse.chapter;
    const preferredTranslations = QuranTranslationPreferences.getInstance().preferredTranslations;

    const shareText = ClientUtils.Islam.Quran.Verse.createVerseShareText(
        chapter,
        verse,
        preferredTranslations,
        locale
    );

    return (
        <aside className="flex flex-wrap items-center justify-end gap-1 sm:gap-2 rounded-full  px-2 py-1">
            <AudioPlayButton />
            <ShareButton shareText={shareText} />

            <div className="mx-1 hidden h-4 w-px bg-border sm:block" />

            <QuranTranslationChangeButton />
            <QuranConfigurationButton />

            <div className="mx-1 hidden h-4 w-px bg-border sm:block" />

            <div className="flex items-center gap-1">
                <PreviousVerseButton verse={verse} />
                <NextVerseButton verse={verse} />
            </div>
        </aside>
    );
});

export default UtilToolButtons;