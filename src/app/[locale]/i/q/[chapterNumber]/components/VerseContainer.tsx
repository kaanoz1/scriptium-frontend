"use client";

import React from "react";
import {motion, Variants} from "framer-motion";
import {observer} from "mobx-react-lite";
import {ChapterWithVerses} from "@/classes/Islam/Quran/Chapter/WithVerses";
import VerseBox from "@/app/[locale]/i/q/[chapterNumber]/components/VerseBox";
import VerseContainerHeader from "@/app/[locale]/i/q/[chapterNumber]/components/VerseContainerHeader";

type Props = {
    chapter: ChapterWithVerses
}


const VerseContainer: React.FC<Props> = observer(({chapter}) => {
    return (
        <section className="flex w-full flex-col gap-6">

            <div
                className="sticky top-22 z-20 w-full rounded-2xl border border-border/60 bg-background/80 p-1.5 shadow-lg shadow-black/[0.03] backdrop-blur-xl supports-backdrop-filter:bg-background/60 sm:px-3 sm:py-1.5">
                <VerseContainerHeader chapter={chapter}/>
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col gap-3"
            >
                {chapter.verses.map((verse) => (
                    <motion.div
                        key={verse.sequence}
                        variants={itemVariants}
                        className="w-full"
                    >
                        <VerseBox chapter={chapter} verse={verse}/>
                    </motion.div>
                ))}
            </motion.div>

        </section>
    );
});

export default VerseContainer;


const containerVariants: Variants = {
    hidden: {opacity: 0},
    visible: {
        opacity: 1,
        transition: {delayChildren: 0.05}
    }
};

const itemVariants: Variants = {
    hidden: {opacity: 0, y: 20},
    visible: {opacity: 1, y: 0, transition: {type: "spring", stiffness: 300, damping: 24}}
};