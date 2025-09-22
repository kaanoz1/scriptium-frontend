"use client";
import { Scripture } from "@/types/classes/model/Scripture/Scripture/Scripture";
import { DEFAULT_LANG_CODE } from "@/util/constants";
import { BreadcrumbItem, Breadcrumbs } from "@heroui/breadcrumbs";
import { FC } from "react";

type Props = {
  scripture: Scripture;
};

const BreadCrumbs: FC<Props> = ({ scripture }) => {
  const scriptureCode = scripture.getCode();
  const scriptureNameInOwnLanguage = scripture.getName();
  const scriptureMeaning = scripture.getMeaningTextOrDefault(DEFAULT_LANG_CODE);

  return (
    <Breadcrumbs size="lg" className="my-">
      <BreadcrumbItem href="/">Home</BreadcrumbItem>
      <BreadcrumbItem href={`/${scriptureCode}`}>
        {scriptureMeaning}
        <span className="hidden sm:inline">
          {" "}
          ({scriptureNameInOwnLanguage})
        </span>
      </BreadcrumbItem>
    </Breadcrumbs>
  );
};

export default BreadCrumbs;
