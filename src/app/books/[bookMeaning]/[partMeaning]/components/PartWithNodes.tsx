import { DEFAULT_LANG_CODE } from "@/util/constants";
import { motion } from "framer-motion";
import { FC } from "react";
import { BOOK_PARTS_WRAPPER_VARIANT } from "../../utils/constants";
import BookSubPartBox from "./BookSubPartBox";
import BreadCrumbs from "./BreadCrumbs";
import { BookNodeCoverOneLevelUpperBookAndOneLevelLower } from "@/types/classes/model/Book/BookNode/BookNodeCover/BookNodeCoverOneLevelUpper/BookNodeCoverOneLevelUpperBookAndOneLevelLower/BookNodeCoverOneLevelUpperBookAndOneLevelLower";

type Props = {
  partNode: BookNodeCoverOneLevelUpperBookAndOneLevelLower;
};

const PartWithNodes: FC<Props> = ({ partNode }) => {
  const child = partNode.getNodes();

  const description = partNode.getDescription();

  const bookMeaning = partNode.getMeaningTextOrDefault(DEFAULT_LANG_CODE);
  const bookName = partNode.getName();

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
        <BreadCrumbs partNode={partNode} />

        <motion.h1
          className="text-center text-3xl py-5 font-bold mb-4 dark:text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {bookMeaning} ({bookName})
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
          {child.map((childBookSubPartNode, i) => (
            <BookSubPartBox
              key={i}
              book={book}
              partNode={partNode}
              childBookSubPartNode={childBookSubPartNode}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PartWithNodes;
