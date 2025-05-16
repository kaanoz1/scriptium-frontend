import { motion } from "framer-motion";
import { T_ScriptureTextVariationKey, VerseOptions } from "@/types/types";
import { FiExternalLink } from "react-icons/fi";
import { GrShareOption } from "react-icons/gr";
import { Dispatch, FC, SetStateAction } from "react";
import { DEFAULT_LANG_CODE, PROJECT_NAME } from "@/util/utils";
import { Link } from "@heroui/link";
import TranslatedTextWithFootnotes from "./TranslatedTextWithFootnotes";
import { VerseLowerDTO } from "@/types/classes/Verse";
import { TranslationTextDTO } from "@/types/classes/TranslationText";
import { TranslationDTO } from "@/types/classes/Translation";
import { ScriptureDetails } from "@/types/classes/Scripture";

type VerseOperations = {
  setStateActionFunctionForShareTextControl: Dispatch<SetStateAction<string>>;
  setStateActionFunctionForShareModelControl: Dispatch<SetStateAction<boolean>>;
};

type VerseDetails = {
  scriptureCode: string;
  scriptureNameInOwnLanguage: string;
  scriptureMeaning: string;
  sectionNameInOwnLanguage: string;
  sectionNumber: number;
  sectionMeaning: string;
  chapterNumber: number;
  variation: T_ScriptureTextVariationKey;
  selectedTranslation: Readonly<TranslationDTO> | undefined;
  scriptureDetails: Readonly<ScriptureDetails>;
};

interface Props {
  verse: VerseLowerDTO;
  options: VerseOptions;
  operations: VerseOperations;
  verseDetails: VerseDetails;
  font: string;
}

const ChapterVerse: FC<Props> = ({
  verse,
  font,
  options: {
    stateIsOrignalTextShown,
    stateIsTranslationShown,
    stateIsTransliterationShown,
  },
  operations: {
    setStateActionFunctionForShareModelControl,
    setStateActionFunctionForShareTextControl,
  },
  verseDetails: {
    scriptureCode,
    scriptureNameInOwnLanguage,
    scriptureMeaning,
    sectionNumber,
    sectionNameInOwnLanguage,
    sectionMeaning,
    chapterNumber,
    variation,
    scriptureDetails,
    selectedTranslation,
  },
}) => {
  const transliteration: string | JSX.Element = verse
    .getTransliterations()
    .find((t) => t.getLanguage().getLangCode() === DEFAULT_LANG_CODE)
    ?.getTransliteration() ?? (
    <span className="italic">No transliteration available.</span>
  );

  const verseNumber: number = verse.getNumber();
  const verseText: string =
    verse.getVariation().getTextWithVariation(variation) ??
    verse.getVariation().getUsual();

  const translationText: TranslationTextDTO =
    verse
      .getTranslationTexts()
      .find(
        (t) => t.getTranslation().getId() == selectedTranslation?.getId()
      ) ??
    verse
      .getTranslationTexts()
      .find(
        (t) =>
          t.getTranslation().getId() ==
          scriptureDetails.getDefaultTranslationId()
      )!;

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
              setStateActionFunctionForShareModelControl(true);
              setStateActionFunctionForShareTextControl(
                `${PROJECT_NAME},\n${scriptureMeaning}(${scriptureNameInOwnLanguage}), ${sectionMeaning} (${sectionNameInOwnLanguage}), Chapter: ${chapterNumber}, Verse: ${verseNumber}\n\n ${translationText
                  .getTranslation()
                  .getName()}\n ${translationText.getText()}\n ${verseText}  \n\n${
                  window.location.href
                }/${verseNumber}`
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

      {stateIsTranslationShown && (
        <div className="text-base font-light leading-relaxed">
          <TranslatedTextWithFootnotes
            translationText={{
              text: translationText.getText(),
              footnotes: translationText.getFootNotes(),
            }}
          />
        </div>
      )}

      {stateIsOrignalTextShown && (
        <div className={`text-3xl text-right leading-relaxed ${font}`}>
          {verseText}
        </div>
      )}

      {stateIsTransliterationShown && (
        <div className="text-sm font-light italic text-gray-700 dark:text-gray-400">
          {transliteration}
        </div>
      )}
    </motion.section>
  );
};

export default ChapterVerse;
