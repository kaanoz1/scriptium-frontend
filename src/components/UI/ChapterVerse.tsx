import { motion } from "framer-motion";
import {
  TranslationTextSimpleDTO,
  VerseOptions,
  ConfinedVerseDTO,
  VerseTextVariation,
} from "@/types/types";
import { FiExternalLink } from "react-icons/fi";
import { GrShareOption } from "react-icons/gr";
import { Dispatch, FC, SetStateAction } from "react";
import { DEFAULT_LANG_CODE, PROJECT_NAME } from "@/util/utils";
import { Link } from "@heroui/link";
import TranslatedTextWithFootnotes from "./TranslatedTextWithFootnotes";

type VerseOperations = {
  setShareText: Dispatch<SetStateAction<string>>;
  setIsShareModalOpen: Dispatch<SetStateAction<boolean>>;
};

type VerseDetails = {
  scriptureCode: string;
  scriptureNameInOwnLanguage: string;
  scriptureMeaning: string;
  sectionNameInOwnLanguage: string;
  sectionNumber: number;
  sectionMeaning: string;
  chapterNumber: number;
  translationName: string;
  variation: VerseTextVariation;
};

interface Props {
  verse: ConfinedVerseDTO;
  translationText: TranslationTextSimpleDTO;
  verseOptions: VerseOptions;
  operations: VerseOperations;
  verseDetails: VerseDetails;
  font: string;
}

const ChapterVerse: FC<Props> = ({
  verse,
  font,
  translationText,
  verseOptions: { showOriginalText, showTranslation, showTransliteration },
  operations: { setIsShareModalOpen, setShareText },
  verseDetails: {
    scriptureCode,
    scriptureNameInOwnLanguage,
    scriptureMeaning,
    sectionNumber,
    sectionNameInOwnLanguage,
    sectionMeaning,
    chapterNumber,
    translationName,
    variation,
  },
}) => {
  const verseText: string = verse[variation] ?? verse.text;

  const transliteration: string | JSX.Element = verse.transliterations.find(
    (t) => t.language.langCode === DEFAULT_LANG_CODE
  )?.transliteration ?? (
    <span className="italic">No transliteration available.</span>
  );

  const verseNumber: number = verse.number;

  return (
    <motion.section
      initial="hidden"
      whileHover="visible"
      className="flex flex-col gap-3 px-5 py-3 w-full border-l border-r border-b border-neutral-400/50 dark:border-gray-500 bg-white dark:bg-neutral-900 text-gray-800 dark:text-gray-200"
    >
      <div className="flex w-full items-center justify-between">
        <span className="text-sm font-light">
          <em>{verseNumber}.</em>
        </span>
        <motion.span
          className="flex gap-3"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <GrShareOption
            size={19}
            className="cursor-pointer hover:text-blue-500 transition-colors"
            onClick={() => {
              setIsShareModalOpen(true);
              setShareText(
                `${PROJECT_NAME},\n${scriptureMeaning}(${scriptureNameInOwnLanguage}), ${sectionMeaning} (${sectionNameInOwnLanguage}), Chapter: ${chapterNumber}, Verse: ${verseNumber}\n\n ${translationName}\n ${translationText.text}\n ${verseText}  \n\n${window.location.href}/${verseNumber}`
              );
            }}
          />

          <Link
            href={`/${scriptureCode}/${sectionNumber}/${chapterNumber}/${verseNumber}`}
            className="text-gray-900 dark:text-gray-200 hover:text-teal-700 m-0 p-0 h-[19px] w-[19px]"
          >
            <FiExternalLink size={19} />
          </Link>
        </motion.span>
      </div>

      {showTranslation && (
        <div className="text-base font-light leading-relaxed">
          <TranslatedTextWithFootnotes
            translationText={{
              text: translationText.text,
              footnotes: translationText.footNotes,
            }}
          />
        </div>
      )}

      {showOriginalText && (
        <div className={`text-3xl text-right leading-relaxed ${font}`}>
          {verseText}
        </div>
      )}

      {showTransliteration && (
        <div className="text-sm font-light italic text-gray-700 dark:text-gray-400">
          {transliteration}
        </div>
      )}
    </motion.section>
  );
};

export default ChapterVerse;
