"use client";

import { FC } from "react";
import TranslatedTextWithFootnotes from "@/components/TranslatedTextWithFootnotes";
import { ScripturePreference } from "@/types/classes/client/Scripture/ScripturePreference/ScripturePreference";
import { Translation } from "@/types/classes/model/Translation/Translation/Translation";
import { TranslationText as TranslationTextObj } from "@/types/classes/model/TranslationText/TranslationText/TranslationText";

type Props = {
  translation: Translation;
  translationText: TranslationTextObj | undefined;
  preference: ScripturePreference;
  showTranslationHeader: boolean;
};

const TranslationText: FC<Props> = ({
  translation,
  translationText,
  preference,
  showTranslationHeader,
}) => {
  const translationName = translation.getName();

  const translatorNamesGathered = translation
    .getTranslators()
    .map((t) => t.getName())
    .join(", ");

  const options = preference.getOptions();
  const showFootnotes = options.getShowFootnotes();

  return (
    <div className="w-full px-4 pb-2 bg-inherit text-gray-800 dark:text-gray-200">
      {showTranslationHeader && (
        <div className="mb-2 flex items-center gap-2">
          <span className="font-bold text-[0.675rem] sm:text-sm md:text-lg">
            {translationName}
          </span>

          <span className="text-gray-400 dark:text-gray-500">—</span>

          <span className="italic opacity-80 text-[0.625rem] sm:text-xs md:text-base">
            {translatorNamesGathered}
          </span>
        </div>
      )}

      <div className="leading-relaxed text-sm sm:text-base md:text-lg">
        {translationText ? (
          <TranslatedTextWithFootnotes
            translationText={translationText}
            showFootnotes={showFootnotes}
          />
        ) : (
          <span className="italic text-xs sm:text-sm md:text-base">
            This translation does not have a text for this verse.
          </span>
        )}
      </div>
    </div>
  );
};

export default TranslationText;
