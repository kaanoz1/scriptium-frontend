"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ChapterWithVerseCount } from "@/classes/Islam/Quran/Chapter/WithVerseCount";
import ChapterCard from "@/app/[locale]/i/q/components/ChapterCard";

type Props = {
  chapters: ChapterWithVerseCount[];
};

const ChapterContainer: React.FC<Props> = ({ chapters }) => {
  const t = useTranslations("Navbar.QuickNavigation.MobileSearchModal");

  if (chapters.length === 0)
    return (
      <div className="rounded-2xl border border-dashed border-border py-20 text-center text-sm text-muted-foreground">
        {t("NoResultsFound")}
      </div>
    );

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      {chapters.map((chapter) => (
        <ChapterCard key={chapter.sequence} chapter={chapter} />
      ))}
    </motion.div>
  );
};

export default ChapterContainer;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.015 },
  },
};
