"use client";
import { BookNodeCoverFourLevelUpperBookAndOneLevelLower } from "@/types/classes/model/Book/BookNode/BookNodeCover/BookNodeCoverFourLevelUpperBookAndOneLevelLowerCover/BookNodeCoverFourLevelUpperBookAndOneLevelLowerCover";
import { BookNodeCoverFourLevelUpperBookAndOneLevelLowerText } from "@/types/classes/model/Book/BookNode/BookNodeCover/BookNodeCoverFourLevelUpperBookAndOneLevelLowerText/BookNodeCoverFourLevelUpperBookAndOneLevelLowerText";
import { DEFAULT_LANG_CODE } from "@/util/constants";
import { Breadcrumbs, BreadcrumbItem } from "@heroui/breadcrumbs";
import { FC } from "react";

type T_BreadCrumbsParams = {
  sectionNode:
    | BookNodeCoverFourLevelUpperBookAndOneLevelLower
    | BookNodeCoverFourLevelUpperBookAndOneLevelLowerText;
};

const BreadCrumbs: FC<T_BreadCrumbsParams> = ({ sectionNode }) => {
  // Section
  const sectionName = sectionNode.getName();
  const sectionMeaning = sectionNode.getMeaningTextOrDefault(DEFAULT_LANG_CODE);

  // Division
  const divisionNode = sectionNode.getParent();
  const divisionName = divisionNode.getName();
  const divisionMeaning =
    divisionNode.getMeaningTextOrDefault(DEFAULT_LANG_CODE);

  // SubPart
  const subPartNode = divisionNode.getParent();
  const subPartNodeMeaning =
    subPartNode.getMeaningTextOrDefault(DEFAULT_LANG_CODE);
  const subPartNodeName = subPartNode.getName();

  // Part
  const partNode = subPartNode.getParent();
  const partNodeMeaning = partNode.getMeaningTextOrDefault(DEFAULT_LANG_CODE);
  const partNodeName = partNode.getName();

  // Book
  const book = partNode.getBook();
  const bookName = book.getName();
  const bookMeaning = book.getMeaningTextOrDefault(DEFAULT_LANG_CODE);

  // URLs
  const bookBaseUrl = `/books/`;
  const bookUrl = `${bookBaseUrl}/${bookMeaning ?? bookName}`;
  const partNodeUrl = `${bookUrl}/${partNodeMeaning ?? partNodeName}`;
  const subPartUrl = `${partNodeUrl}/${subPartNodeMeaning ?? subPartNodeName}`;
  const divisionUrl = `${subPartUrl}/${divisionMeaning ?? divisionName}`;
  const sectionUrl = `${divisionUrl}/${sectionMeaning ?? sectionName}`;

  return (
    <Breadcrumbs size="lg">
      <BreadcrumbItem href="/">Home</BreadcrumbItem>
      <BreadcrumbItem href={bookBaseUrl}>Books</BreadcrumbItem>

      <BreadcrumbItem href={bookUrl}>
        {bookMeaning} <span className="hidden sm:inline">({bookName})</span>
      </BreadcrumbItem>

      <BreadcrumbItem href={partNodeUrl}>
        {partNodeMeaning}{" "}
        <span className="hidden sm:inline">({partNodeName})</span>
      </BreadcrumbItem>

      <BreadcrumbItem href={subPartUrl}>
        {subPartNodeMeaning}{" "}
        <span className="hidden sm:inline">({subPartNodeName})</span>
      </BreadcrumbItem>

      <BreadcrumbItem href={divisionUrl}>
        {divisionMeaning}{" "}
        <span className="hidden sm:inline">({divisionName})</span>
      </BreadcrumbItem>

      <BreadcrumbItem href={sectionUrl}>
        {sectionMeaning}{" "}
        <span className="hidden sm:inline">({sectionName})</span>
      </BreadcrumbItem>
    </Breadcrumbs>
  );
};

export default BreadCrumbs;
