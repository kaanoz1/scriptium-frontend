"use client";
import { SectionBoth } from "@/types/classes/model/Section/Section/SectionBoth/SectionBoth";
import { SectionOneLevelBoth } from "@/types/classes/model/Section/Section/SectionBoth/SectionOneLevelBoth/SectionOneLevelBoth";
import { SectionUpper } from "@/types/classes/model/Section/Section/SectionUpper/SectionUpper";
import { DEFAULT_LANG_CODE } from "@/util/constants";
import { Breadcrumbs, BreadcrumbItem } from "@heroui/breadcrumbs";
import { FC } from "react";

type Props = { section: SectionUpper | SectionBoth | SectionOneLevelBoth };

const BreadCrumbs: FC<Props> = ({ section }) => {
  const sectionMeaning = section.getMeaningTextOrDefault(DEFAULT_LANG_CODE);
  const sectionNameInOwnLanguage = section.getName();
  const sectionNumber = section.getNumber();
  const scripture = section.getScripture();

  const scriptureMeaning = scripture.getMeaningTextOrDefault(DEFAULT_LANG_CODE);
  const scriptureNameInOwnLanguage = scripture.getName();
  const scriptureCode = scripture.getCode();

  return (
    <Breadcrumbs size="lg" className="my-4">
      <BreadcrumbItem href="/">Home</BreadcrumbItem>

      <BreadcrumbItem href={`/${scriptureCode}`}>
        {scriptureMeaning}
        <span className="hidden sm:inline">({scriptureNameInOwnLanguage})</span>
      </BreadcrumbItem>

      <BreadcrumbItem href={`/${scriptureCode}/${sectionNumber}`}>
        {sectionMeaning}
        <span className="hidden sm:inline"> ({sectionNameInOwnLanguage})</span>
      </BreadcrumbItem>
    </Breadcrumbs>
  );
};

export default BreadCrumbs;
