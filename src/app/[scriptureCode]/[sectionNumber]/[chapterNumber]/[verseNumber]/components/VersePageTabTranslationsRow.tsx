"use client";

import { NextPage } from "next";
import TranslatedTextWithFootnotes from "../../../../../../components/TranslatedTextWithFootnotes";
import { TranslationText } from "@/types/classes/model/TranslationText/TranslationText/TranslationText";

interface Props {
  translationText: TranslationText;
  showFootnotes: boolean;
}

const VersePageTabTranslationsRow: NextPage<Props> = ({
  translationText,
  showFootnotes,
}) => {
  const translationName = translationText.getTranslation().getName();
  const translatorNamesGathered = translationText
    .getTranslation()
    .getTranslators()
    .map((t) => t.getName())
    .join(", ");

  return (
    <div className="w-full p-4 bg-white dark:bg-black text-gray-800 dark:text-gray-200">
      <div className="mb-2 flex items-center gap-2">
        <span className="font-semibold text-sm sm:text-base md:text-lg">
          {translationName}
        </span>
        <span className="text-gray-400 dark:text-gray-500">—</span>
        <span className="italic opacity-80 text-xs sm:text-sm md:text-base">
          {translatorNamesGathered}
        </span>
      </div>

      <div className="leading-relaxed text-[0.95rem] sm:text-base md:text-[1.0625rem] font-normal">
        <TranslatedTextWithFootnotes
          translationText={translationText}
          showFootnotes={showFootnotes}
        />
      </div>
    </div>
  );
};

export default VersePageTabTranslationsRow;
