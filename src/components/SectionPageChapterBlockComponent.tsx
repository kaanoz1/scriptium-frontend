import { Link } from "@heroui/link";
import { motion } from "framer-motion";
import { FC } from "react";
import {T_ScriptureCode} from "@/types/types";

interface Props {
  scriptureCode: T_ScriptureCode;
  sectionNumber: number;
  chapterNumber: number;
}

const SectionPageChapterBlockComponent: FC<Props> = ({
  scriptureCode,
  sectionNumber,
  chapterNumber,
}) => {
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
        className="flex justify-center p-5 rounded-lg  bg-white dark:bg-neutral-800  border border-gray-200 dark:border-neutral-600  shadow transition dark:shadow-gray-800 hover:shadow-md hover:scale-[1.01] transform-gpu focus:outline-none focus:ring-2  dark:focus:ring-2 hover:bg-gray-50  dark:hover:bg-neutral-700"
      >
        <h2 className="font-semibold mb-1 dark:text-white">{chapterNumber}</h2>
      </Link>
    </motion.div>
  );
};

export default SectionPageChapterBlockComponent;
