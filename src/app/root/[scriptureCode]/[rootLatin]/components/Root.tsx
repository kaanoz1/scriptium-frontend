"use client";
import React, { FC } from "react";

import TranslationText from "../../../../[scriptureCode]/[sectionNumber]/[chapterNumber]/[verseNumber]/verse/TranslationText";
import { Dispatch, JSX, SetStateAction } from "react";
import Link from "next/link";
import { FiExternalLink } from "react-icons/fi";
import { GrShareOption } from "react-icons/gr";
import { ScripturePreference } from "@/types/classes/client/Scripture/ScripturePreference/ScripturePreference";
import { Translation } from "@/types/classes/model/Translation/Translation/Translation";
import { WordUpper } from "@/types/classes/model/Word/Word/WordUpper/WordUpper";
import { DEFAULT_LANG_CODE, getShareTextOfVerse } from "@/util/constants";
import { T_OriginalScriptureVocalizationKey } from "@/types/types";
import { ScriptureHelper } from "@/types/classes/client/Scripture/ScriptureHelper/ScriptureHelper";

interface Props {
  word: WordUpper;
  variation: T_OriginalScriptureVocalizationKey;
  scriptureHelper: Readonly<ScriptureHelper>;
  preference: ScripturePreference;
  setStateFunctionOfShareText: Dispatch<SetStateAction<string>>;
  setStateFunctionOfIsShareModelOpen: Dispatch<SetStateAction<boolean>>;
}

const Root: FC<Props> = ({
  word,
  scriptureHelper,
  preference,
  setStateFunctionOfIsShareModelOpen,
  setStateFunctionOfShareText,
}) => {
  const options = preference.getOptions();

  const isTransliterationShown = options.getShowTransliteration();
  const isOriginalTextShown = options.getShowOriginalText();
  const isTranslationShown = options.getShowTranslation();

  const preferredFont = preference.getPreferredFont();
  const preferredVariation =
    preference.getPreferredOriginalScriptureTextVariationKey();

  const verse = word.getVerse();

  const verseText: string = verse.getTextOfVariationOrUsual(preferredVariation);

  const transliteration: string | JSX.Element =
    verse.getTransliterationTextOrNull(DEFAULT_LANG_CODE) ?? (
      <span className="italic">No transliteration available.</span>
    );

  const selectedTranslations: Array<Translation> = scriptureHelper
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

  const chapter = verse.getChapter();
  const section = chapter.getSection();
  const scripture = section.getScripture();

  const href = `/${scripture.getCode()}/${section.getNumber()}/${chapter.getNumber()}/${verse.getNumber()}`;

  return (
    <main className="flex flex-col gap-8">
      <div className="flex w-full items-center justify-between">
        <span className="text-sm font-light">
          <em>{verse.getNumber()}.</em>
        </span>
        <span className="flex gap-3">
          <GrShareOption
            size={19}
            className="cursor-pointer hover:text-blue-500 transition-colors"
            onClick={() => {
              setStateFunctionOfIsShareModelOpen(true);
              setStateFunctionOfShareText(
                getShareTextOfVerse(verse, chapter, preferredTranslationTexts)
              );
            }}
          />

          <Link
            href={href}
            className="text-gray-900 dark:text-gray-200 hover:text-teal-700 m-0 p-0 h-[19px] w-[19px]"
          >
            <FiExternalLink size={19} />
          </Link>
        </span>
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

      <div className="flex flex-col gap-2">
        {isOriginalTextShown && (
          <p
            className={`text-xl sm:text-2xl md:text-3xl text-right leading-relaxed ${preferredFont}`}
          >
            {verseText}
          </p>
        )}

        {isTransliterationShown && (
          <p className="text-sm font-light italic pt-2 text-gray-700 dark:text-gray-400">
            {transliteration}
          </p>
        )}
      </div>
    </main>
  );
};

export default Root;
