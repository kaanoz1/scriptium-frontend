import { Link } from "@heroui/link";
import { motion } from "framer-motion";
import { FC } from "react";
import { Scripture } from "@/types/classes/model/Scripture/Scripture/Scripture";
import { Section } from "@/types/classes/model/Section/Section/Section";
import { Chapter } from "@/types/classes/model/Chapter/Chapter/Chapter";

interface Props {
  scripture: Readonly<Scripture>;
  section: Readonly<Section>;
  chapter: Readonly<Chapter>;
}

const ChapterBox: FC<Props> = ({ scripture, section, chapter }) => {
  const chapterNumber = chapter.getNumber();
  const sectionNumber = section.getNumber();
  const scriptureCode = scripture.getCode();

  return (
    <motion.div
      key={chapterNumber}
      variants={{
        hidden: { opacity: 0, y: 10 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.1 },
        },
      }}
    >
      <Link
        color="foreground"
        href={`/${scriptureCode}/${sectionNumber}/${chapterNumber}`}
        aria-label={`Open chapter ${chapterNumber} of section ${sectionNumber} in ${scriptureCode}`}
        title={`Chapter ${chapterNumber}`}
        className="flex justify-center items-center p-4 sm:p-5 lg:p-6 rounded-lg sm:rounded-xl bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-600 shadow-sm dark:shadow-gray-800 hover:shadow-md hover:scale-[1.02] transform-gpu transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-400 dark:focus-visible:ring-neutral-500 hover:bg-gray-50 dark:hover:bg-neutral-700 w-full h-16 sm:h-20 lg:h-24"
      >
        <h2 className="font-semibold dark:text-white text-base sm:text-lg md:text-xl">
          {chapterNumber}
        </h2>
      </Link>
    </motion.div>
  );
};

export default ChapterBox;
