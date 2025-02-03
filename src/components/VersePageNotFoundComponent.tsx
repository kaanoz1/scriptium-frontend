import { motion } from "framer-motion";
import { FC } from "react";
import { LuBookX } from "react-icons/lu";

interface Props {
  scriptureCode: string;
  sectionNumber: string;
  chapterNumber: string;
  verseNumber: string;
}

const VersePageNotFoundComponent: FC<Props> = ({
  scriptureCode,
  sectionNumber,
  chapterNumber,
  verseNumber,
}) => {
  return (
    <div className="w-full h-[calc(100vh-130px)] flex justify-center items-center">
      <div className="text-center">
        <motion.div
          className="mb-4 flex justify-center"
          animate={{ x: [0, -5, 5, 0] }}
          transition={{ repeat: Infinity, duration: 0.6, repeatDelay: 2.4 }}
        >
          <LuBookX size={96} className="text-gray-500 dark:text-gray-400" />
        </motion.div>
        <div className="text-lg text-gray-700 dark:text-gray-300">
          <em className="font-bold text-red-500">404.</em> We couldn&apos;t find
          any verse with:
          <br />
          Scripture Code:{" "}
          <em className="font-bold dark:text-gray-100">{scriptureCode}</em>,
          Section Number:{" "}
          <em className="font-bold dark:text-gray-100">{sectionNumber}</em>,
          Chapter Number:{" "}
          <em className="font-bold dark:text-gray-100">{chapterNumber}</em>,
          Verse Number:{" "}
          <em className="font-bold dark:text-gray-100">{verseNumber}</em>.
        </div>
      </div>
    </div>
  );
};

export default VersePageNotFoundComponent;
