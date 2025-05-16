import { FC } from "react";
import TranslatedTextWithFootnotes from "./UI/TranslatedTextWithFootnotes";
import { DEFAULT_LANG_CODE } from "@/util/utils";
import { FootNoteDTO } from "@/types/classes/FootNote";
import { VerseUpperMeanDTO } from "@/types/classes/Verse";
import { TranslationTextWithVerseUpperMeanDTO } from "@/types/classes/TranslationText";

interface Props {
  translationText: TranslationTextWithVerseUpperMeanDTO;
}

const SearchBarResultRow: FC<Props> = ({ translationText }) => {
  const text: string = translationText.getTranslationText().getText();
  const footnotes: ReadonlyArray<FootNoteDTO> = translationText
    .getTranslationText()
    .getFootNotes();
  const verse: Readonly<VerseUpperMeanDTO> = translationText.getVerse();

  const verseText: string =
    verse.getTextVarition().getWithoutVowel() ??
    verse.getTextVarition().getUsual();

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
    <main className="flex flex-col gap-2">
      <div className="flex justify-start items-center gap-2">
        <span>
          {scriptureMeaning} ({scriptureNameInOwnLanguage})
        </span>
        <span>&gt;</span>{" "}
        <span>
          {sectionMeaning} ({sectionNameInOwnLanguage})
        </span>
        <span>&gt;</span> <span>Chapter {chapterNumber},</span>
        <span>{verseNumber}:</span>{" "}
      </div>
      <TranslatedTextWithFootnotes
        showFootnotes={false}
        translationText={{
          text: text,
          footnotes: footnotes,
        }}
      />

      <div className="">{verseText}</div>
      <span>
        {translationName} - {translatorNamesGathered}
      </span>
    </main>
  );
};

export default SearchBarResultRow;
