"use client";

import { NextPage } from "next";
import VersePageTabTranslationsRow from "./VersePageTabTranslationsRow";
import { TranslationText } from "@/types/classes/model/TranslationText/TranslationText/TranslationText";

interface Props {
  readonly translationTexts: ReadonlyArray<TranslationText>;
  showFootnotes: boolean;
}

const VersePageTabTranslations: NextPage<Props> = ({
  translationTexts,
  showFootnotes,
}) => {
  return (
    <div className="w-full flex flex-col divide-y divide-gray-200 dark:divide-gray-700">
      {translationTexts.map((tt, i) => (
        <VersePageTabTranslationsRow
          key={i}
          translationText={tt}
          showFootnotes={showFootnotes}
        />
      ))}
    </div>
  );
};

export default VersePageTabTranslations;
