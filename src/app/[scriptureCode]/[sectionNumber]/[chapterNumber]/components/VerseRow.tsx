"use client";

import { motion } from "framer-motion";
import { FiExternalLink } from "react-icons/fi";
import { GrShareOption } from "react-icons/gr";
import { FC, ReactNode } from "react";
import { Link } from "@heroui/link";
import TranslationText from "@/app/[scriptureCode]/[sectionNumber]/[chapterNumber]/[verseNumber]/verse/TranslationText";
import { ScripturePreference } from "@/types/classes/client/Scripture/ScripturePreference/ScripturePreference";
import { ChapterUpperAndOneLevelLower } from "@/types/classes/model/Chapter/Chapter/ChapterUpper/ChapterUpperAndOneLevelLower/ChapterUpperAndOneLevelLower";
import { Translation } from "@/types/classes/model/Translation/Translation/Translation";
import { Verse } from "@/types/classes/model/Verse/Verse/Verse";
import { DEFAULT_LANG_CODE } from "@/util/constants";
import { ScriptureHelper } from "@/types/classes/client/Scripture/ScriptureHelper/ScriptureHelper";

interface Props {
  verse: Verse;
  chapter: ChapterUpperAndOneLevelLower;
  preference: ScripturePreference;
  functionWhichOpensShareModel: () => void;
  scriptureDetail: Readonly<ScriptureHelper>;
  functionWhichSetsShareTextToVerse: () => void;
}

const VerseRow: FC<Props> = ({
  verse,
  chapter,
  preference,
  functionWhichOpensShareModel,
  functionWhichSetsShareTextToVerse,
  scriptureDetail,
}) => {
  const transliteration: string | ReactNode =
    verse.getTransliterationTextOrNull(DEFAULT_LANG_CODE) ?? (
      <span className="italic">No transliteration available.</span>
    );

  const verseNumber = verse.getNumber();
  const verseText = verse.getTextOfVariationOrUsual(
    preference.getPreferredOriginalScriptureTextVariationKey()
  );

  const chapterNumber = chapter.getNumber();
  const section = chapter.getSection();
  const sectionNumber = section.getNumber();
  const scripture = section.getScripture();
  const scriptureCode = scripture.getCode();

  const selectedTranslations: Array<Translation> = scriptureDetail
    .getTranslations()
    .filter((t) =>
      preference.getPreferredTranslationIdMultiple().has(t.getId())
    );

  const options = preference.getOptions();
  const isTransliterationShown = options.getShowTransliteration();
  const isOriginalTextShown = options.getShowOriginalText();
  const isTranslationShown = options.getShowTranslation();

  const preferredFont = preference.getPreferredFont();

  return (
    <motion.section className="verse-row w-full border-l border-r border-b border-neutral-400/50 dark:border-gray-500 bg-white dark:bg-dark text-gray-800 dark:text-gray-200 px-3 py-2 sm:px-4 sm:py-3 md:px-5 md:py-4 flex flex-col">
      <div className="flex w-full items-center justify-between">
        <span className="text-xs sm:text-sm md:text-base font-light">
          <em>{verseNumber}.</em>
        </span>

        <span className="verse-actions flex gap-2 sm:gap-3 md:gap-4">
          <GrShareOption
            className="
              w-4 h-4 sm:w-5 sm:h-5 md:w-[20px] md:h-[20px]
              cursor-pointer transition-colors
              hover:text-blue-500
            "
            onClick={() => {
              functionWhichSetsShareTextToVerse();
              functionWhichOpensShareModel();
            }}
            aria-label="Share verse"
          />

          <Link
            href={`/${scriptureCode}/${sectionNumber}/${chapterNumber}/${verseNumber}`}
            className="m-0 p-0 inline-flex items-center justify-center"
            aria-label="Open verse"
          >
            <FiExternalLink className="w-4 h-4 sm:w-5 sm:h-5 md:w-[20px] md:h-[20px] text-gray-900 dark:text-gray-200 hover:text-teal-700" />
          </Link>
        </span>
      </div>

      {isTranslationShown && (
        <div className="font-light leading-relaxed text-[0.95rem] sm:text-base md:text-[1.0625rem]">
          <div className="flex flex-col gap-2">
            {selectedTranslations.map((tt) => {
              const correspondingTranslationText = verse
                .getTranslationTexts()
                .find((ttx) => ttx.getTranslation().getId() === tt.getId());

              return (
                <div className="bg-white dark:bg-dark">
                  <TranslationText
                    showTranslationHeader={selectedTranslations.length !== 1}
                    key={`verse-${verse.getId()}-translation-${tt.getId()}`}
                    translationText={correspondingTranslationText}
                    translation={tt}
                    preference={preference}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {isOriginalTextShown && (
        <div
          className={`text-right leading-relaxed ${preferredFont} text-xl sm:text-2xl md:text-[1.75rem] tracking-tight`}
        >
          {verseText}
        </div>
      )}

      {isTransliterationShown && (
        <div className="italic font-light text-[0.85rem] sm:text-sm md:text-base text-gray-700 dark:text-gray-400">
          {transliteration}
        </div>
      )}

      <style jsx>{`
        @media (hover: hover) and (pointer: fine) {
          :global(.verse-row .verse-actions) {
            opacity: 0;
            transition: opacity 0.2s ease-in-out;
          }
          :global(.verse-row:hover .verse-actions),
          :global(.verse-row:focus-within .verse-actions) {
            opacity: 1;
          }
        }
      `}</style>
    </motion.section>
  );
};

export default VerseRow;
