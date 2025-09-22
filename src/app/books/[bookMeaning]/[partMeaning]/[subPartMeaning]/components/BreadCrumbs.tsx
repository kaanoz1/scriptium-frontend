"use client";

import { BookNodeCoverTwoLevelUpperBookAndOneLevelLower } from "@/types/classes/model/Book/BookNode/BookNodeCover/BookNodeCoverTwoLevelUpperBookAndOneLevelLower/BookNodeCoverTwoLevelUpperBookAndOneLevelLower";
import { BookNodeCoverTwoLevelUpperBookAndOneLevelLowerText } from "@/types/classes/model/Book/BookNode/BookNodeCover/BookNodeCoverTwoLevelUpperBookAndOneLevelLowerText/BookNodeCoverTwoLevelUpperBookAndOneLevelLowerText";
import { DEFAULT_LANG_CODE } from "@/util/constants";
import { Breadcrumbs, BreadcrumbItem } from "@heroui/breadcrumbs";
import { FC } from "react";

type T_BreadCrumbsParams = {
  subPartNode:
    | BookNodeCoverTwoLevelUpperBookAndOneLevelLower
    | BookNodeCoverTwoLevelUpperBookAndOneLevelLowerText;
};

const BreadCrumbs: FC<T_BreadCrumbsParams> = ({ subPartNode }) => {
  // SubPart
  const subPartNodeMeaning =
    subPartNode.getMeaningTextOrDefault(DEFAULT_LANG_CODE);
  const subPartNodeName = subPartNode.getName();

  // Part
  const partNode = subPartNode.getParent();
  const partNodeMeaning = partNode.getMeaningTextOrDefault(DEFAULT_LANG_CODE);
  const partNodeName = partNode.getName();

  // Book
  const book = partNode.getBook();
  const bookMeaning = book.getMeaningTextOrDefault(DEFAULT_LANG_CODE);
  const bookName = book.getName();

  // URL's
  const bookBaseUrl = `/books/`;
  const bookUrl = bookBaseUrl + "/" + `${bookMeaning ?? bookName}`;
  const partNodeUrl = bookUrl + "/" + `${partNodeMeaning ?? partNodeName}`;
  const subPartUrl =
    partNodeUrl + "/" + `${subPartNodeMeaning ?? subPartNodeName}`;

  return (
    <Breadcrumbs size="lg">
      <BreadcrumbItem href="/">Home</BreadcrumbItem>
      <BreadcrumbItem href={bookBaseUrl}>Books</BreadcrumbItem>
      <BreadcrumbItem href={bookUrl}>
        {bookMeaning}{" "}
        <span className="hidden sm:inline">({bookName})</span>
      </BreadcrumbItem>
      <BreadcrumbItem href={partNodeUrl}>
        {partNodeMeaning}{" "}
        <span className="hidden sm:inline">({partNodeName})</span>
      </BreadcrumbItem>
      <BreadcrumbItem href={subPartUrl}>
        {subPartNodeMeaning}{" "}
        <span className="hidden sm:inline">({subPartNodeName})</span>
      </BreadcrumbItem>
    </Breadcrumbs>
  );
};

export default BreadCrumbs;
