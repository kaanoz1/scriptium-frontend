"use client";

import React from "react";
import { observer } from "mobx-react-lite";
import { ChapterWithVerses } from "@/classes/Islam/Quran/Chapter/WithVerses";
import TranslationIndicator from "@/app/[locale]/i/q/[chapterNumber]/components/TranslationIndicator";
import UtilToolButtons from "@/app/[locale]/i/q/[chapterNumber]/components/UtilToolButtons";

type Props = {
    chapter: ChapterWithVerses
};

const VerseContainerHeader: React.FC<Props> = observer(({ chapter }) => {
    return (
        <header className="flex w-full flex-col items-center justify-between gap-4 py-2 sm:flex-row">
            <div className="flex w-full justify-center sm:justify-start sm:w-auto">
                <TranslationIndicator />
            </div>
            <div className="flex w-full justify-center sm:justify-end sm:w-auto">
                <UtilToolButtons chapter={chapter} />
            </div>

        </header>
    );
});

export default VerseContainerHeader;