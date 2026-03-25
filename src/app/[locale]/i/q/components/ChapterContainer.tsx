"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChapterWithVerseCount } from "@/classes/Islam/Quran/Chapter/WithVerseCount";
import ChapterCard from "@/app/[locale]/i/q/components/ChapterCard";

type Props = {
    chapters: ChapterWithVerseCount[]
}



const ChapterContainer: React.FC<Props> = ({ chapters }) => {
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
            {chapters.map((chapter) => (
                <ChapterCard key={chapter.sequence} chapter={chapter} />
            ))}
        </motion.div>
    );
}

export default ChapterContainer;

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.05 }
    }
};