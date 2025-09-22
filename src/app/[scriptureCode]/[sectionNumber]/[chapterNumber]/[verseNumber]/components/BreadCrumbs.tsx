"use client";
import { VerseBoth } from "@/types/classes/model/Verse/Verse/VerseBoth/VerseBoth";
import { DEFAULT_LANG_CODE } from "@/util/constants";
import { Breadcrumbs, BreadcrumbItem } from "@heroui/breadcrumbs";
import { FC } from "react";

type Props = {
  verse: VerseBoth;
};

const BreadCrumbs: FC<Props> = ({ verse }) => {
  const chapter = verse.getChapter();
  const section = chapter.getSection();
  const scripture = section.getScripture();

  const verseNumber = verse.getNumber();
  const chapterNumber = chapter.getNumber();
  const sectionMeaning = section.getMeaningTextOrDefault(DEFAULT_LANG_CODE);
  const sectionNumber = section.getNumber();
  const sectionNameInOwnLanguage = section.getName();

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

      <BreadcrumbItem
        href={`/${scriptureCode}/${sectionNumber}/${chapterNumber}/${verseNumber}`}
      >
        {verseNumber}
      </BreadcrumbItem>
    </Breadcrumbs>
  );
};

export default BreadCrumbs;
