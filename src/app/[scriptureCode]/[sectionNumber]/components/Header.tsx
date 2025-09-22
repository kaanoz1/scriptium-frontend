"use client";

import { Section } from "@/types/classes/model/Section/Section/Section";
import { DEFAULT_LANG_CODE } from "@/util/constants";
import { motion } from "framer-motion";
import { FC } from "react";

type Props = {
  section: Section;
};

const Header: FC<Props> = ({ section }) => {
  const sectionMeaning = section.getMeaningTextOrDefault(DEFAULT_LANG_CODE);
  const sectionNameInOwnLanguage = section.getName();

  return (
    <header className="w-full max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8">
      <motion.h1
        className="text-center text-2xl sm:text-3xl md:text-4xl leading-tight tracking-tight py-4 sm:py-5 font-bold mb-3 sm:mb-4 dark:text-white w-full break-words hyphens-auto"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {sectionMeaning} ({sectionNameInOwnLanguage})
      </motion.h1>
      <p className="text-center text-gray-600 dark:text-gray-400 text-sm sm:text-base max-w-2xl mx-auto mb-6 sm:mb-8 leading-relaxed">
        Select a chapter to read.
      </p>
    </header>
  );
};

export default Header;
