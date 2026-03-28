"use client"

import React from "react";
import { VerseBoth } from "@/classes/Islam/Quran/Verse/Both";
import Breadcrumbs from "@/app/[locale]/i/q/[chapterNumber]/[verseNumber]/components/Breadcrumbs";
import VerseTranslation from "@/app/[locale]/i/q/[chapterNumber]/[verseNumber]/components/VerseTranslation";
import VerseTransliteration from "@/app/[locale]/i/q/[chapterNumber]/[verseNumber]/components/VerseTransliteration";
import VerseTable from "@/app/[locale]/i/q/[chapterNumber]/[verseNumber]/components/VerseTable";
import UtilToolButtons from "@/app/[locale]/i/q/[chapterNumber]/[verseNumber]/components/UtilToolButtons";
import VerseText from "@/app/[locale]/i/q/[chapterNumber]/components/VerseText";

type Props = {
    verse: VerseBoth
}

const Main: React.FC<Props> = ({verse}) => {

    return (
        <main className="flex flex-col items-center w-full max-w-480 mx-auto pb-24">

            <div className="w-full px-4 sm:px-8 md:px-12 lg:px-24 xl:px-48 pt-6 pb-12 flex flex-row justify-between items-center gap-4">
                <div className="overflow-x-auto scrollbar-hide flex items-center">
                    <Breadcrumbs verse={verse}/>
                </div>

                <div className="flex shrink-0 items-center">
                    <UtilToolButtons verse={verse}/>
                </div>
            </div>

            <section className="flex flex-col lg:flex-row w-full gap-12 lg:gap-24 px-4 sm:px-8 md:px-12 lg:px-24 xl:px-48 items-start relative">

                <div className="w-full flex-1 lg:sticky lg:top-32">
                    <VerseTranslation verse={verse}/>
                </div>

                <div className="w-full flex-1 pt-2 lg:sticky lg:top-32">
                    <VerseText verse={verse}/>
                </div>

            </section>

            <section className="w-full px-4 sm:px-8 md:px-12 lg:px-24 xl:px-48 mt-12 flex justify-start">
                <div className="w-full text-center">
                    <VerseTransliteration verse={verse}/>
                </div>
            </section>

            <section className="w-full px-4 sm:px-8 md:px-12 lg:px-24 xl:px-48 mt-20 justify-center">
                <div className="w-full border-t border-border/40 pt-16">
                    <VerseTable verse={verse}/>
                </div>
            </section>

        </main>
    );
}

export default Main;