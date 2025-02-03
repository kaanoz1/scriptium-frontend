"use client";
import {
  RootSimpleDTO,
  TranslationDTO,
  TranslationTextSimpleDTO,
  VerseExpendedWordDTO,
  VerseTextVariation,
} from "@/types/types";
import { DEFAULT_LANG_CODE } from "@/util/utils";
import { NextPage } from "next";
import TranslatedTextWithFootnotes from "./TranslatedTextWithFootnotes";

interface Props {
  translationText: TranslationTextSimpleDTO;
  translation: TranslationDTO;
  verse: VerseExpendedWordDTO;
  verseTextVariation: VerseTextVariation;
  showTranslation: boolean;
  showFootnotes: boolean;
  showOriginalText: boolean;
  showTransliteration: boolean;
  preferredFont: string;
  root: RootSimpleDTO;
}

const Root: NextPage<Props> = ({
  verse,
  translationText,
  translation,
  verseTextVariation: variation,
  showFootnotes,
  showOriginalText,
  showTranslation,
  showTransliteration,
  preferredFont,
}) => {
  const verseText: string = verse[variation] ?? verse.text;

  const transliteration: string | JSX.Element = verse.transliterations.find(
    (t) => t.language.langCode === DEFAULT_LANG_CODE
  )?.transliteration ?? (
    <span className="italic">No transliteration available.</span>
  );

  const translationName: string = translation.name;

  const translatorNamesGathered: string = translation.translators
    .map((t) => t.name)
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
              translationText={{
                text: translationText.text,
                footnotes: translationText.footNotes,
              }}
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
