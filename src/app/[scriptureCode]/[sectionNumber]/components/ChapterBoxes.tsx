import { SectionBoth } from "@/types/classes/model/Section/Section/SectionBoth/SectionBoth";
import { SectionOneLevelBoth } from "@/types/classes/model/Section/Section/SectionBoth/SectionOneLevelBoth/SectionOneLevelBoth";
import { motion } from "framer-motion";
import { FC } from "react";
import { CHAPTER_WRAPPER_VARIANTS } from "../utils/constants";
import ChapterBox from "./ChapterBox";

type Props = {
  section: SectionOneLevelBoth | SectionBoth;
};

const ChapterBoxes: FC<Props> = ({ section }) => {
  const chapters = section.getChapters();

  const scripture = section.getScripture();

  return (
    <motion.div
      className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 sm:gap-5 lg:gap-6"
      initial="hidden"
      animate="visible"
      variants={CHAPTER_WRAPPER_VARIANTS}
    >
      {chapters.map((chapter, i) => (
        <ChapterBox
          key={`chapter-${i}`}
          scripture={scripture}
          section={section}
          chapter={chapter}
        />
      ))}
    </motion.div>
  );
};

export default ChapterBoxes;
