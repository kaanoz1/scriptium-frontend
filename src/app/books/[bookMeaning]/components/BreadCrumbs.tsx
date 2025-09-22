import { BookCover } from "@/types/classes/model/Book/Book/BookCover/BookCover";
import { DEFAULT_LANG_CODE } from "@/util/constants";
import { Breadcrumbs, BreadcrumbItem } from "@heroui/breadcrumbs";
import { FC } from "react";

type T_BreadCrumbsParams = { book: BookCover };

const BreadCrumbs: FC<T_BreadCrumbsParams> = ({ book }) => {
  const meaning = book.getMeaningTextOrDefault(DEFAULT_LANG_CODE);
  const name = book.getName();
  const heading = `${meaning} (${name})`;

  const bookBaseUrl = `/books/`;
  const bookUrl = bookBaseUrl + "/" + `${meaning}`;

  return (
    <Breadcrumbs size="lg">
      <BreadcrumbItem href="/">Home</BreadcrumbItem>
      <BreadcrumbItem href={bookBaseUrl}>Books</BreadcrumbItem>
      <BreadcrumbItem href={bookUrl}>{heading}</BreadcrumbItem>
    </Breadcrumbs>
  );
};

export default BreadCrumbs;
