"use client";

import { DEFAULT_LANG_CODE } from "@/util/utils";
import { NextPage } from "next";
import TranslatedTextWithFootnotes from "./TranslatedTextWithFootnotes";
import { TranslationTextDTO } from "@/types/classes/TranslationText";
import { WordUpperDTO } from "@/types/classes/Word";
import { T_OriginalScriptureTextVariationKey } from "@/types/types";
import { ScriptureDetail } from "@/types/classes/Scripture";

interface Props {
  word: WordUpperDTO;
  variation: T_OriginalScriptureTextVariationKey;
  showTranslation: boolean;
  showFootnotes: boolean;
  showOriginalText: boolean;
  showTransliteration: boolean;
  preferredFont: string;
  preferredTranslationId: number;
  scriptureDetails: Readonly<ScriptureDetail>;
}

const Root: NextPage<Props> = ({
  word,
  variation,
  scriptureDetails,
  preferredTranslationId,

  showFootnotes,
  showOriginalText,
  showTranslation,
  showTransliteration,

  preferredFont,
}) => {
  const verse = word.getVerse();

  const verseText: string =
    verse.getVariation().getTextWithVariation(variation) ??
    verse.getVariation().getUsual();

  const transliteration: string | JSX.Element = verse
    .getTransliterations()
    .find((t) => t.getLanguage().getLangCode() === DEFAULT_LANG_CODE)
    ?.getTransliteration() ?? (
    <span className="italic">No transliteration available.</span>
  );

  const translationText: TranslationTextDTO =
    verse
      .getTranslationTexts()
      .find((tt) => preferredTranslationId === tt.getTranslation().getId()) ??
    verse
      .getTranslationTexts()
      .find(
        (tt) =>
          tt.getTranslation().getId() ===
          scriptureDetails.getDefaultTranslationId()
      )!;

  const translation = translationText.getTranslation();

  const translationName: string = translation.getName();

  const translatorNamesGathered: string = translation
    .getTranslators()
    .map((t) => t.getName())
    .join(", ");

  return (
    <main className="flex flex-col gap-8">
      {showTranslation && (
        <section className="pb-4">
          <span className="italic text-sm block text-gray-600 dark:text-gray-400">
            {`${translationName} - ${translatorNamesGathered}`}
          </span>
          <div className="py-2 px-3 w-full leading-relaxed">
            <TranslatedTextWithFootnotes
              translationText={translationText}
              showFootnotes={showFootnotes}
            />
          </div>
        </section>
      )}

      <div className="flex flex-col gap-2">
        {showOriginalText && (
          <p className={`text-3xl text-right leading-relaxed ${preferredFont}`}>
            {verseText}
          </p>
        )}

        {showTransliteration && (
          <p className="text-sm font-light italic pt-2 text-gray-700 dark:text-gray-400">
            {transliteration}
          </p>
        )}
      </div>
    </main>
  );
};

export default Root;
