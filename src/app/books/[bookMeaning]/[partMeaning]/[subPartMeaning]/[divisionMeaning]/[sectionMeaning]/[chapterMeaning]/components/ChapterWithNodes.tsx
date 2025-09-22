import { BOOK_PARTS_WRAPPER_VARIANT } from "@/app/books/[bookMeaning]/utils/constants";
import { DEFAULT_LANG_CODE } from "@/util/constants";
import { motion } from "framer-motion";
import { FC } from "react";
import BreadCrumbs from "./BreadCrumbs";
import BookSubChapterBox from "./BookSubChapterBox";
import { BookNodeCoverFiveLevelUpperBookAndOneLevelLower } from "@/types/classes/model/Book/BookNode/BookNodeCover/BookNodeCoverFiveLevelUpperBookAndOneLevelLower/BookNodeCoverFiveLevelUpperBookAndOneLevelLower";

type Props = {
  chapterNode: BookNodeCoverFiveLevelUpperBookAndOneLevelLower;
};

const ChapterWithNodes: FC<Props> = ({ chapterNode }) => {
  //Book -> Part -> SubPart -> Division -> Section -> Chapter

  const subChapters = chapterNode.getNodes();

  //Book -> Part -> SubPart -> Division -> Section

  const sectionNode = chapterNode.getParent();

  const sectionName = sectionNode.getName();
  const sectionMeaning = sectionNode.getMeaningTextOrDefault(DEFAULT_LANG_CODE);

  const description = sectionNode.getDescription();

  //Book -> Part -> SubPart -> Division
  const divisionNode = sectionNode.getParent();

  const divisionName = divisionNode.getName();
  const divisionMeaning =
    divisionNode.getMeaningTextOrDefault(DEFAULT_LANG_CODE);

  //Book -> Part -> SubPart
  const subPartNode = divisionNode.getParent();

  //Book -> Part
  const partNode = subPartNode.getParent();

  //Book

  const book = partNode.getBook();

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="bg-white dark:bg-black pt-6 pb-16 min-h-[calc(100vh-130px)]"
    >
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center sm:block">
        <BreadCrumbs chapterNode={chapterNode} />

        <motion.h1
          className="text-center text-3xl py-5 font-bold mb-4 dark:text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {sectionMeaning
            ? `${sectionMeaning} (${sectionName})`
            : `${divisionMeaning} - ${divisionName}`}
        </motion.h1>

        {description && (
          <motion.h3
            className="text-center text-xl py-5 font-thin mb-4 dark:text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {description}
          </motion.h3>
        )}

        <p className="text-center text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-8">
          Select a part to read.
        </p>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={BOOK_PARTS_WRAPPER_VARIANT}
        >
          {subChapters.map((subChapter, i) => (
            <BookSubChapterBox
              key={i}
              book={book}
              partNode={partNode}
              subPartNode={subPartNode}
              divisionNode={divisionNode}
              sectionNode={sectionNode}
              chapterNode={chapterNode}
              subChapterNode={subChapter}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ChapterWithNodes;
