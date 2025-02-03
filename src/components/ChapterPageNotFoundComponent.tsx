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
    <section className="w-full h-[calc(100vh-130px)] flex justify-center items-center">
      <div className="text-center">
        <motion.div
          className="mb-4 flex justify-center"
          animate={{ x: [0, -5, 5, 0] }}
          transition={{ repeat: Infinity, duration: 0.6, repeatDelay: 2.4 }}
        >
          <LuBookX size={96} className="text-gray-500 dark:text-gray-400" />
        </motion.div>
        <div className="text-lg text-gray-700 dark:text-gray-300">
          <span className="font-bold text-red-500">404.</span> We couldn&apos;t{" "}
          find any chapter with scripture code:{" "}
          <em className="font-bold dark:text-gray-100">{scriptureCode}</em>
          {", "}
          and section number:{" "}
          <em className="font-bold dark:text-gray-100">{sectionNumber}</em>
          {", "}
          and chapter number:{" "}
          <em className="font-bold dark:text-gray-100">{chapterNumber}</em>
        </div>
      </div>
    </section>
  );
};

export default ChapterPageNotFoundComponent;
