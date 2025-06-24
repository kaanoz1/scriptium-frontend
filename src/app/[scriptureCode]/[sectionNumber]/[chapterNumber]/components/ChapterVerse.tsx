import { motion } from "framer-motion";
import { FiExternalLink } from "react-icons/fi";
import { GrShareOption } from "react-icons/gr";
import { Dispatch, FC, ReactNode, SetStateAction } from "react";
import { DEFAULT_LANG_CODE, getShareTextOfVerse } from "@/util/utils";
import { Link } from "@heroui/link";
import { VerseDTO } from "@/types/classes/Verse";
import { ScripturePreference } from "@/types/classes/Scripture";
import { ChapterUpperAndOneLevelLowerDTO } from "@/types/classes/Chapter";
import { TranslationDTO } from "@/types/classes/Translation";
import { ScriptureDetail } from "@/util/scriptureDetails";
import TranslationText from "@/components/verse/TranslationText";

interface Props {
  verse: VerseDTO;
  chapter: ChapterUpperAndOneLevelLowerDTO;
  preference: ScripturePreference;
  setStateActionFunctionForShareText: Dispatch<SetStateAction<string>>;
  functionWhichOpensShareModel: () => void;
  scriptureDetail: Readonly<ScriptureDetail>;
}

const ChapterVerse: FC<Props> = ({
  verse,
  chapter,
  preference,
  functionWhichOpensShareModel,
  setStateActionFunctionForShareText,
  scriptureDetail,
}) => {
  console.log(
    "render:",
    preference.getPreferredOriginalScriptureTextVariationKey()
  );

  const transliteration: string | ReactNode =
    verse.getTransliterationTextOrNull(DEFAULT_LANG_CODE) ?? (
      <span className="italic">No transliteration available.</span>
    );

  const verseNumber: number = verse.getNumber();
  const verseText: string = verse.getTextOfVariationOrUsual(
    preference.getPreferredOriginalScriptureTextVariationKey()
  );

  const chapterNumber = chapter.getNumber();

  const section = chapter.getSection();
  const sectionNumber = section.getNumber();

  const scripture = section.getScripture();
  const scriptureCode = scripture.getCode();

  //TODO: Fix

  const selectedTranslations: Array<TranslationDTO> = scriptureDetail
    .getTranslations()
    .filter((t) =>
      preference.getPreferredTranslationIdMultiple().has(t.getId())
    );

  const preferredTranslationTexts = verse
    .getTranslationTexts()
    .filter((tt) =>
      selectedTranslations
        .map((t) => t.getId())
        .includes(tt.getTranslation().getId())
    );

  const options = preference.getOptions();

  const isTransliterationShown = options.getShowTransliteration();
  const isOriginalTextShown = options.getShowOriginalText();
  const isTranslationShown = options.getShowTranslation();

  const preferredFont = preference.getPreferredFont();

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
              4;
              functionWhichOpensShareModel();
              setStateActionFunctionForShareText(
                getShareTextOfVerse(verse, chapter, preferredTranslationTexts)
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

      {isTranslationShown && (
        <div className="text-base font-light leading-relaxed">
          <div className="flex-column gap-2">
            {selectedTranslations.map((tt) => {
              const correspondingTranslationText = verse
                .getTranslationTexts()
                .find((ttx) => ttx.getTranslation().getId() === tt.getId());

              return (
                <TranslationText
                  showTranslationHeader={selectedTranslations.length !== 1}
                  key={`verse-${verse.getId()}-translation-${tt.getId()}`}
                  translationText={correspondingTranslationText}
                  translation={tt}
                  preference={preference}
                />
              );
            })}
          </div>
        </div>
      )}

      {isOriginalTextShown && (
        <div className={`text-3xl text-right leading-relaxed ${preferredFont}`}>
          {verseText}
        </div>
      )}

      {isTransliterationShown && (
        <div className="text-sm font-light italic text-gray-700 dark:text-gray-400">
          {transliteration}
        </div>
      )}
    </motion.section>
  );
};

export default ChapterVerse;
