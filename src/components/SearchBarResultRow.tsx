import {
  FootNoteDTO,
  TranslationTextExtendedVerseDTO,
  VerseSimpleDTO,
} from "@/types/types";
import { FC } from "react";
import TranslatedTextWithFootnotes from "./UI/TranslatedTextWithFootnotes";
import { DEFAULT_LANG_CODE } from "@/util/utils";

interface Props {
  translationText: TranslationTextExtendedVerseDTO;
}

const SearchBarResultRow: FC<Props> = ({ translationText }) => {
  const text: string = translationText.text;
  const footnotes: Array<FootNoteDTO> = translationText.footNotes;
  const verse: VerseSimpleDTO = translationText.verse;

  const verseText: string = verse.textWithoutVowel ?? verse.text;

  const scriptureMeaning: string =
    verse.chapter.section.scripture.meanings.find(
      (e) => e.language.langCode === DEFAULT_LANG_CODE
    )?.meaning ?? "Scripture";

  const scriptureNameInOwnLanguage: string =
    verse.chapter.section.scripture.name;

  const sectionNameInOwnLanguage: string = verse.chapter.section.name;

  const sectionMeaning: string =
    verse.chapter.section.meanings.find(
      (e) => e.language.langCode === DEFAULT_LANG_CODE
    )?.meaning ?? "Section";

  const chapterNumber: number = verse.chapter.number;

  const verseNumber: number = verse.number;

  const translatorNamesGathered: string =
    translationText.translation.translators.map((e) => e.name).join(", ");

  const translationName: string = translationText.translation.name;

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
