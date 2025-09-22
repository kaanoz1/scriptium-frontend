"use client";
import { AutocompleteItem } from "@heroui/autocomplete";
import { FC } from "react";
import QueryResultVerseBar from "./QueryResultVerseBar";
import { TranslationTextWithVerseUpperMean } from "@/types/classes/model/TranslationText/TranslationText";

type Props = { row: TranslationTextWithVerseUpperMean };

const SearchBarVerseResultRow: FC<Props> = ({ row }) => {
  const verse = row.getVerse();

  const verseNumber = verse.getNumber();

  const chapter = verse.getChapter();
  const chapterNumber = chapter.getNumber();

  const section = chapter.getSection();
  const sectionNumber = section.getNumber();

  const scripture = section.getScripture();

  const scriptureCode = scripture.getCode();

  const url: string = `/${scriptureCode}/${sectionNumber}/${chapterNumber}/${verseNumber}`;

  return (
    <AutocompleteItem
      variant="bordered"
      href={url}
      className="w-full"
      textValue={row.getTranslationText().getText().toLowerCase()}
      aria-label={`label-result-${row.getVerse().getId()}`}
      key={`result-${row.getTranslationText().getTranslation().getId()}`}
    >
      <QueryResultVerseBar
        translationText={row}
        key={`result-${row.getVerse().getId()}`}
      />
    </AutocompleteItem>
  );
};

export default SearchBarVerseResultRow;
