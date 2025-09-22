"use client";

import { ChapterUpperAndOneLevelLower } from "@/types/classes/model/Chapter/Chapter/ChapterUpper/ChapterUpperAndOneLevelLower/ChapterUpperAndOneLevelLower";
import { DEFAULT_LANG_CODE } from "@/util/constants";
import { motion } from "framer-motion";
import { FC } from "react";

type Props = { chapter: ChapterUpperAndOneLevelLower };

const Header: FC<Props> = ({ chapter }) => {
  const section = chapter.getSection();
  const sectionMeaning = section.getMeaningTextOrDefault(DEFAULT_LANG_CODE);
  const chapterNumber = chapter.getNumber();

  return (
    <motion.h1
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-[90ch] px-2 text-center font-semibold md:font-bold leading-tight md:leading-snug tracking-tight break-words hyphens-auto text-[clamp(1.5rem,5.5vw,2.5rem)] md:text-[clamp(2rem,4.5vw,3rem)] py-4 md:py-6 text-gray-900 dark:text-gray-100"
    >
      {sectionMeaning} {chapterNumber}
    </motion.h1>
  );
};

export default Header;
