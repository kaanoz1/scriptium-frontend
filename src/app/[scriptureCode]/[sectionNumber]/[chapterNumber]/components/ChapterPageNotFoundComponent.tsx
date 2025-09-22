"use client";

import { motion } from "framer-motion";
import { FC } from "react";
import { LuBookX } from "react-icons/lu";

interface Props {
  scriptureCode: string | number;
  sectionNumber: string | number;
  chapterNumber: string | number;
}

const ChapterPageNotFoundComponent: FC<Props> = ({
  scriptureCode,
  sectionNumber,
  chapterNumber,
}) => {
  return (
    <section
      className="w-full min-h-[60vh] sm:min-h-[calc(100vh-130px)] flex justify-center items-center px-4"
      aria-labelledby="chapter-not-found-title"
    >
      <h1 id="chapter-not-found-title" className="sr-only">
        Chapter Not Found
      </h1>
      <div className="text-center max-w-screen-md">
        <motion.div
          className="mb-4 flex justify-center"
          animate={{ x: [0, -5, 5, 0] }}
          transition={{ repeat: Infinity, duration: 0.6, repeatDelay: 2.4 }}
        >
          <LuBookX className="text-gray-500 dark:text-gray-400 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24" />
        </motion.div>
        <p className="text-base sm:text-lg lg:text-xl text-gray-700 dark:text-gray-300 leading-relaxed break-words hyphens-auto">
          <span className="font-bold text-red-500">404.</span> We couldn&apos;t
          find any chapter with scripture code:
          <em className="font-bold dark:text-gray-100">{scriptureCode}</em>,
          section number:
          <em className="font-bold dark:text-gray-100">{sectionNumber}</em>, and
          chapter number:
          <em className="font-bold dark:text-gray-100">{chapterNumber}</em>
        </p>
      </div>
    </section>
  );
};

export default ChapterPageNotFoundComponent;
