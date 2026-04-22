"use client";

import React from "react";
import {motion} from "framer-motion";
import {VerseBoth} from "@/classes/Islam/Quran/Verse/Both";
import VerseWordTable from "@/app/[locale]/i/q/[chapterNumber]/[verseNumber]/components/VerseWordTable";
import VerseTranslationTable from "@/app/[locale]/i/q/[chapterNumber]/[verseNumber]/components/VerseTranslationTable";

type Props = {
    verse: VerseBoth;
}

const VerseTable: React.FC<Props> = ({verse}) => {

    return (
        <motion.div
            initial={{opacity: 0, y: 10}}
            animate={{opacity: 1, y: 0}}
            className="w-full flex flex-col-reverse xl:flex-row items-start gap-8 mt-8"
        >
            <section className="w-full xl:w-5/12 shrink-0">
                <VerseWordTable words={verse.words}/>
            </section>

            <section className="w-full xl:w-7/12 grow">
                <VerseTranslationTable translationOfVerse={verse.translations}/>
            </section>
        </motion.div>
    );
};

export default VerseTable;