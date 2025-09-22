"use client";

import { motion } from "framer-motion";
import { FC } from "react";
import { SECTION_WRAPPER_VARIANTS } from "../utils/constants";
import { ScriptureOneLevelLower } from "@/types/classes/model/Scripture/ScriptureLower/ScriptureOneLevelLower/ScriptureOneLevelLower";
import SectionBox from "./SectionBox";

type Props = {
  scripture: ScriptureOneLevelLower;
};

const SectionBoxes: FC<Props> = ({ scripture }) => {
  const sections = scripture.getSections();

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full"
      initial="hidden"
      animate="visible"
      variants={SECTION_WRAPPER_VARIANTS}
    >
      {sections.map((section, i) => (
        <SectionBox
          key={`section-${i}`}
          section={section}
          scripture={scripture}
        />
      ))}
    </motion.div>
  );
};

export default SectionBoxes;
