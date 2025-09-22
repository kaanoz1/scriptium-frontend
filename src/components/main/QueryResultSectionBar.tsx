"use client";
import { SectionUpperMean } from "@/types/classes/model/Section/SectionMean/SectionUpperMean/SectionUpperMean";
import { DEFAULT_LANG_CODE } from "@/util/constants";
import { FC } from "react";

type Props = {
  section: SectionUpperMean;
};

const QueryResultSectionBar: FC<Props> = ({ section }) => {
  const sectionName = section.getName();
  const sectionNumber = section.getNumber();
  const sectionMeaning = section.getMeaningTextOrDefault(DEFAULT_LANG_CODE);

  const scripture = section.getScripture();
  const scriptureName = scripture.getName();
  const scriptureMeaning = scripture.getMeaningTextOrDefault(DEFAULT_LANG_CODE);

  const rowHeader = `${scriptureMeaning} (${scriptureName}) > ${sectionNumber}. ${sectionMeaning} (${sectionName})`;

  return <p>{rowHeader}</p>;
};

export default QueryResultSectionBar;
