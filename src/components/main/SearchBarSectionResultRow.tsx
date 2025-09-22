"use client";
import { FC } from "react";
import QueryResultSectionBar from "./QueryResultSectionBar";
import { DEFAULT_LANG_CODE } from "@/util/constants";
import { AutocompleteItem } from "@heroui/react";
import { SectionUpperMean } from "@/types/classes/model/Section/SectionMean/SectionUpperMean/SectionUpperMean";

type Props = {
  row: SectionUpperMean;
};

const SearchBarSectionResultRow: FC<Props> = ({ row }) => {
  const section = row;
  const sectionName = section.getName();
  const sectionNumber = section.getNumber();
  const sectionMeaning = section.getMeaningTextOrDefault(DEFAULT_LANG_CODE);

  const scripture = section.getScripture();
  const scriptureName = scripture.getName();
  const scriptureMeaning = scripture.getMeaningTextOrDefault(DEFAULT_LANG_CODE);
  const scriptureCode = scripture.getCode();
  const url: string = `/${scriptureCode}/${sectionNumber}`;

  const rowHeader = `${scriptureMeaning} (${scriptureName}), ${sectionMeaning} (${sectionName})`;

  return (
    <AutocompleteItem
      variant="bordered"
      href={url}
      className="w-full"
      textValue={rowHeader}
      aria-label={`Section Result Row-${section.getNumber()}`}
      key={`result-section-${section.getNumber()}`}
    >
      <QueryResultSectionBar section={section} />
    </AutocompleteItem>
  );
};

export default SearchBarSectionResultRow;
