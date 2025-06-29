import { motion, Variants } from "framer-motion";
import { GoBookmarkFill } from "react-icons/go";
import { FC, useState } from "react";
import { DEFAULT_LANG_CODE } from "@/util/utils";
import { BreadcrumbItem, Breadcrumbs } from "@heroui/breadcrumbs";
import { FiExternalLink } from "react-icons/fi";
import { Link } from "@heroui/link";
import TranslatedTextWithFootnotes from "./TranslatedTextWithFootnotes";
import { CollectionDTO } from "@/types/classes/Collection";
import { VerseBaseDTO, VerseUpperDTO } from "@/types/classes/Verse";
import { RefetchDataFunctionType, T_ScriptureCode } from "@/types/types";
import { handleUnsaveClick } from "./CollectionComponent";
import { PROJECT_URL } from "@/util/constants";
import { ScripturePreference } from "@/types/classes/Scripture";
import { ScripturesDetails } from "@/util/scriptureDetails";

const containerVariants: Variants = {
  initial: {
    backgroundColor: "transparent",
  },
  hover: {
    transition: {
      duration: 0.2,
      when: "beforeChildren",
    },
  },
};

const iconContainerVariants: Variants = {
  initial: { opacity: 0 },
  hover: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
};

interface Props {
  collection: CollectionDTO;
  verse: VerseUpperDTO;
  preference: ScripturePreference;
  refetchDataFunction: RefetchDataFunctionType<unknown>;
}

const CollectionVerseTableRow: FC<Props> = ({
  verse,
  refetchDataFunction,
  collection,
  preference,
}) => {
  const [isUnsaveLoading, setIsUnsaveLoading] = useState(false);

  const variation = preference.getPreferredOriginalScriptureTextVariationKey();

  const verseText: string = verse.getTextOfVariationOrUsual(variation);

  const chapter = verse.getChapter();
  const section = chapter.getSection();
  const scripture = section.getScripture();

  const font = preference.getPreferredFont();

  const preferredTranslationId = preference.getPreferredTranslationId();

  const translationText =
    verse
      .getTranslationTexts()
      .find((tt) => tt.getTranslation().getId() == preferredTranslationId) ||
    verse
      .getTranslationTexts()
      .find(
        (tt) =>
          tt.getTranslation().getId() ==
          ScripturesDetails[scriptureCode].getDefaultTranslationId()
      )!;

  const scriptureMeaning: string =
    scripture.getMeaningTextOrDefault(DEFAULT_LANG_CODE);

  const sectionMeaning: string =
    section.getMeaningTextOrDefault(DEFAULT_LANG_CODE);

  const transliteration: string | JSX.Element =
    verse.getTransliterationTextOrNull(DEFAULT_LANG_CODE) ?? (
      <span className="italic">No transliteration available.</span>
    );

  const scriptureCode: T_ScriptureCode = scripture.getCode();
  const scriptureNameInOwnLanguage: string = scripture.getName();
  const sectionNumber: number = section.getNumber();
  const sectionNameInOwnLanguage: string = section.getName();
  const chapterNumber: number = chapter.getNumber();
  const verseNumber: number = verse.getNumber();

  return (
    <motion.div
      className="flex flex-col w-full gap-3 px-5 py-2 border-b border-neutral-400/50 dark:border-gray-500 bg-white dark:bg-dark2 text-gray-800 dark:text-gray-200 dark:hover:bg-gray-500"
      variants={containerVariants}
      initial="initial"
      whileHover="hover"
    >
      <div className="flex items-center justify-between">
        <Breadcrumbs>
          <BreadcrumbItem href={`${PROJECT_URL}/${scriptureCode}`}>
            {`${scriptureMeaning} (${scriptureNameInOwnLanguage})`}
          </BreadcrumbItem>
          <BreadcrumbItem
            href={`${PROJECT_URL}/${scriptureCode}/${sectionNumber}`}
          >
            {`${sectionMeaning} (${sectionNameInOwnLanguage})`}
          </BreadcrumbItem>
          <BreadcrumbItem
            href={`${PROJECT_URL}/${scriptureCode}/${sectionNumber}/${chapterNumber}`}
          >
            {`Chapter ${chapterNumber}`}
          </BreadcrumbItem>
          <BreadcrumbItem>{verseNumber}</BreadcrumbItem>
        </Breadcrumbs>

        <motion.div
          className="flex items-center gap-3"
          variants={iconContainerVariants}
        >
          <motion.button
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
            disabled={isUnsaveLoading}
            onClick={async () =>
              await handleUnsaveClick(
                verse,
                collection,
                refetchDataFunction,
                setIsUnsaveLoading
              )
            }
            className="group flex items-center justify-center w-9 h-9 rounded-full bg-transparent cursor-pointer text-violet-700 dark:text-violet-400"
          >
            <GoBookmarkFill size={17} />
            <sup
              className="cursor-pointer text-red-600 dark:text-red-500 
                   opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            >
              ?
            </sup>
          </motion.button>

          <Link
            href={`/${scriptureCode}/${sectionNumber}/${chapterNumber}/${verseNumber}`}
            className="flex items-center gap-1 text-sm hover:underline"
          >
            <span>Go to verse page</span>
            <FiExternalLink size={15} />
          </Link>
        </motion.div>
      </div>

      <div className="text-base font-light leading-relaxed">
        <TranslatedTextWithFootnotes translationText={translationText} />
      </div>

      <div className={`text-2xl text-right leading-relaxed ${font}`}>
        <p>{verseText}</p>
      </div>

      <div className="text-sm font-light italic text-gray-700 dark:text-gray-400">
        {transliteration}
      </div>
    </motion.div>
  );
};

export default CollectionVerseTableRow;
