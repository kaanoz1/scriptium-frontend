"use client";
import { BookCover } from "@/types/classes/model/Book/Book/BookCover/BookCover";
import { BookNodeCover } from "@/types/classes/model/Book/BookNode/BookNodeCover/ BookNodeCover";
import { DEFAULT_LANG_CODE } from "@/util/constants";
import { Link } from "@heroui/link";
import { motion } from "framer-motion";
import { FC } from "react";

type Props = {
  book: BookCover;
  partNode: Readonly<BookNodeCover>;
  subPartNode: Readonly<BookNodeCover>;
  divisionNode: Readonly<BookNodeCover>;
  sectionNode: Readonly<BookNodeCover>;
};

const BookSectionBox: FC<Props> = ({
  book,
  partNode,
  subPartNode,
  divisionNode,
  sectionNode,
}) => {
  //Book
  const bookMeaning = book.getMeaningTextOrDefault(DEFAULT_LANG_CODE);

  //Book -> Part
  const bookPartNodeMeaning =
    partNode.getMeaningTextOrDefault(DEFAULT_LANG_CODE);

  const partNodeName = partNode.getName();

  //Book -> Part -> SubPart

  const subPartNodeMeaning =
    subPartNode.getMeaningTextOrDefault(DEFAULT_LANG_CODE);
  const subPartNodeName = subPartNode.getName();

  //Book -> Part -> SubPart -> Division

  const divisionNodeMeaning =
    divisionNode.getMeaningTextOrDefault(DEFAULT_LANG_CODE);

  const divisionNodeName = divisionNode.getName();

  //Book -> Part -> SubPart -> Division -> Section

  const sectionNodeMeaning =
    sectionNode.getMeaningTextOrDefault(DEFAULT_LANG_CODE);

  const sectionNodeName = sectionNode.getName();

  const description = sectionNode.getDescription() ?? "Click to read.";

  const heading = sectionNodeMeaning
    ? `${sectionNodeMeaning} (${sectionNodeName})`
    : sectionNodeName;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 },
      }}
    >
      <Link
        color="foreground"
        href={`/books/${bookMeaning}/${bookPartNodeMeaning ?? partNodeName}/${
          subPartNodeMeaning ?? subPartNodeName
        }/${divisionNodeMeaning ?? divisionNodeName}/${
          sectionNodeMeaning ?? sectionNodeName
        }`}
        className="p-5 rounded-lg bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-600 shadow dark:shadow-gray-800 hover:shadow-md hover:scale-[1.01] transform-gpu focus:outline-none focus:ring-2 dark:focus:ring-2 hover:bg-gray-50 dark:hover:bg-neutral-700 flex flex-col gap-1"
      >
        <h2 className="font-semibold mb-1 dark:text-white">{heading}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {description}
        </p>
      </Link>
    </motion.div>
  );
};

export default BookSectionBox;
