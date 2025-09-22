"use client";
import { ChapterUpperAndOneLevelLower } from "@/types/classes/model/Chapter/Chapter/ChapterUpper/ChapterUpperAndOneLevelLower/ChapterUpperAndOneLevelLower";
import { DEFAULT_LANG_CODE } from "@/util/constants";
import { Breadcrumbs, BreadcrumbItem } from "@heroui/breadcrumbs";
import { FC } from "react";

type Props = {
  chapter: ChapterUpperAndOneLevelLower;
};

export const BreadCrumbs: FC<Props> = ({ chapter }) => {
  const chapterNumber = chapter.getNumber();
  const section = chapter.getSection();
  const sectionNumber = section.getNumber();
  const sectionMeaning = section.getMeaningTextOrDefault(DEFAULT_LANG_CODE);
  const sectionNameInOwnLanguage = section.getName();

  const scripture = section.getScripture();
  const scriptureCode = scripture.getCode();
  const scriptureMeaning = scripture.getMeaningTextOrDefault(DEFAULT_LANG_CODE);
  const scriptureNameInOwnLanguage = scripture.getName();

  return (
    <Breadcrumbs size="lg">
      <BreadcrumbItem href="/">Home</BreadcrumbItem>

      <BreadcrumbItem href={`/${scriptureCode}`}>
        {scriptureMeaning}
        <span className="hidden sm:inline">
          {" "}
          ({scriptureNameInOwnLanguage})
        </span>
      </BreadcrumbItem>

      <BreadcrumbItem href={`/${scriptureCode}/${sectionNumber}`}>
        {sectionMeaning}
        <span className="hidden sm:inline"> ({sectionNameInOwnLanguage})</span>
      </BreadcrumbItem>

      <BreadcrumbItem
        href={`/${scriptureCode}/${sectionNumber}/${chapterNumber}`}
      >
        <span className="hidden sm:inline">Chapter </span>
        {chapterNumber}
      </BreadcrumbItem>
    </Breadcrumbs>
  );
};
