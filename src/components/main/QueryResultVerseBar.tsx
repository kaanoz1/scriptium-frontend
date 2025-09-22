"use client";
import { FC } from "react";
import TranslatedTextWithFootnotes from "../TranslatedTextWithFootnotes";
import { TranslationTextWithVerseUpperMean } from "@/types/classes/model/TranslationText/TranslationText";
import { VerseUpperMean } from "@/types/classes/model/Verse/VerseMean/VerseUpperMean/VerseUpperMean";
import { DEFAULT_LANG_CODE } from "@/util/constants";

interface Props {
  translationText: TranslationTextWithVerseUpperMean;
}

const QueryResultVerseBar: FC<Props> = ({ translationText }) => {
  const verse: Readonly<VerseUpperMean> = translationText.getVerse();
  const verseText: string = verse.getVocalization().getUsual();

  const chapter = verse.getChapter();
  const section = chapter.getSection();
  const scripture = section.getScripture();

  const scriptureMeaning: string =
    scripture
      .getMeanings()
      .find((e) => e.getLanguage().getLangCode() === DEFAULT_LANG_CODE)
      ?.getText() ?? "Scripture";

  const scriptureNameInOwnLanguage: string = scripture.getName();
  const sectionNameInOwnLanguage: string = section.getName();

  const sectionMeaning: string =
    section
      .getMeanings()
      .find((e) => e.getLanguage().getLangCode() === DEFAULT_LANG_CODE)
      ?.getText() ?? "Section";

  const chapterNumber: number = chapter.getNumber();
  const verseNumber: number = verse.getNumber();

  const translatorNamesGathered: string = translationText
    .getTranslationText()
    .getTranslation()
    .getTranslators()
    .map((e) => e.getName())
    .join(", ");

  const translationName: string = translationText
    .getTranslationText()
    .getTranslation()
    .getName();

  return (
    <main className="flex flex-col gap-2 sm:gap-3 w-full">
      <div className="flex justify-start items-center gap-2 text-xs sm:text-sm">
        <span>{scriptureMeaning}</span>
        <span className="hidden sm:inline">({scriptureNameInOwnLanguage})</span>
        <span>&gt;</span>
        <span>{sectionMeaning}</span>
        <span className="hidden sm:inline">({sectionNameInOwnLanguage})</span>
        <span>&gt;</span>
        <span className="hidden sm:inline">Chapter</span>
        <span>{chapterNumber}</span>,<span>{verseNumber}:</span>
      </div>

      <TranslatedTextWithFootnotes
        showFootnotes={false}
        translationText={translationText.getTranslationText()}
      />

      <div className="text-right text-base sm:text-lg md:text-xl">
        {verseText}
      </div>
      <span className="hidden sm:inline text-xs sm:text-sm text-gray-600 dark:text-gray-400">
        {translationName} — {translatorNamesGathered}
      </span>
    </main>
  );
};

export default QueryResultVerseBar;
