"use client";

import { BookNodeCoverOneLevelUpperBookAndOneLevelLowerText } from "@/types/classes/model/Book/BookNode/BookNodeCover/BookNodeCoverOneLevelUpper/BookNodeCoverOneLevelUpperBook/BookNodeCoverOneLevelUpperBookAndOneLevelLowerText/BookNodeCoverOneLevelUpperBookAndOneLevelLowerText";
import { BookNodeCoverOneLevelUpperBookAndOneLevelLower } from "@/types/classes/model/Book/BookNode/BookNodeCover/BookNodeCoverOneLevelUpper/BookNodeCoverOneLevelUpperBookAndOneLevelLower/BookNodeCoverOneLevelUpperBookAndOneLevelLower";
import { DEFAULT_LANG_CODE } from "@/util/constants";
import { Breadcrumbs, BreadcrumbItem } from "@heroui/breadcrumbs";
import { FC } from "react";

type T_BreadCrumbsParams = {
  partNode:
    | Readonly<BookNodeCoverOneLevelUpperBookAndOneLevelLower>
    | Readonly<BookNodeCoverOneLevelUpperBookAndOneLevelLowerText>;
};

const BreadCrumbs: FC<T_BreadCrumbsParams> = ({ partNode }) => {
  const partNodeMeaning = partNode.getMeaningTextOrDefault(DEFAULT_LANG_CODE);
  const partNodeName = partNode.getName();

  const book = partNode.getBook();
  const bookMeaning = book.getMeaningTextOrDefault(DEFAULT_LANG_CODE);
  const bookName = book.getName();

  const bookBaseUrl = `/books/`;
  const bookUrl = bookBaseUrl + "/" + `${bookMeaning ?? bookName}`;
  const partNodeUrl = bookUrl + "/" + `${partNodeMeaning ?? partNodeName}`;

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
    </Breadcrumbs>
  );
};

export default BreadCrumbs;
