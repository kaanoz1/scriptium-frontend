"use client";

import { FC, ReactNode } from "react";
import VerseText from "@/app/[scriptureCode]/[sectionNumber]/[chapterNumber]/[verseNumber]/verse/VerseText";
import Transliteration from "@/app/[scriptureCode]/[sectionNumber]/[chapterNumber]/[verseNumber]/verse/Transliteration";
import { ScripturePreference } from "@/types/classes/client/Scripture/ScripturePreference/ScripturePreference";
import { Translation } from "@/types/classes/model/Translation/Translation/Translation";
import { Verse as VerseObj } from "@/types/classes/model/Verse/Verse/Verse";
import TranslationTextComponent from "@/app/[scriptureCode]/[sectionNumber]/[chapterNumber]/[verseNumber]/verse/TranslationText";
import { TranslationText } from "@/types/classes/model/TranslationText/TranslationText/TranslationText";

type Props = {
  verse: VerseObj;
  selectedTranslations: Array<Translation>;
  preference: ScripturePreference;
  showTranslationHeader: boolean;
};

const Verse: FC<Props> = ({
  verse,
  selectedTranslations,
  preference,
  showTranslationHeader,
}): ReactNode => {
  const options = preference.getOptions();
  const showTranslation = options.getShowTranslation();
  const showOriginalText = options.getShowOriginalText();
  const showTransliteration = options.getShowTransliteration();

  return (
    <div className="relative flex flex-col gap-4 sm:gap-6 items-stretch w-full px-2 sm:px-0">
      {showTranslation && (
        <div className="w-full">
          {selectedTranslations.map((translation) => {
            const translationTextOfVerse: TranslationText | undefined = verse
              .getTranslationTexts()
              .find((tt) => tt.getTranslation().getId() == translation.getId());

            return (
              <div className="bg-white dark:bg-black" key={translation.getId()}>
                <TranslationTextComponent
                  showTranslationHeader={showTranslationHeader}
                  translation={translation}
                  translationText={translationTextOfVerse}
                  preference={preference}
                />
              </div>
            );
          })}
        </div>
      )}

      {showOriginalText && (
        <div className="w-full text-right">
          <VerseText verse={verse} preference={preference} />
        </div>
      )}

      <div className="flex flex-col gap-3 sm:gap-4 w-full">
        {showTransliteration && <Transliteration verse={verse} />}
      </div>
    </div>
  );
};

export default Verse;
