"use client";

import { Translation } from "@/types/classes/model/Translation/Translation/Translation";
import { FC, ReactNode } from "react";
import { IoBookOutline } from "react-icons/io5";

type Props = {
  preferredTranslations: Set<Translation>;
};

const classNames =
  "inline-flex items-center gap-1 px-2 py-1 mx-1 bg-gray-200 dark:bg-neutral-900 text-gray-700 dark:text-gray-300 text-[0.75rem] sm:text-[0.8125rem] md:text-[0.875rem] leading-5 flex-col sm:flex-row text-center sm:text-left";

const iconCls = "w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5";

const ChapterPageTranslatorsIndicator: FC<Props> = ({
  preferredTranslations,
}): ReactNode => {
  if (preferredTranslations.size === 1) {
    const selectedTranslation = Array.from(preferredTranslations).at(0)!;
    const translationName = selectedTranslation.getName();
    const translatorNamesGathered = selectedTranslation
      .getTranslators()
      .map((t) => t.getName())
      .join(", ");

    return (
      <div className="rounded-md bg-gray-200 dark:bg-neutral-900 w-full flex justify-center items-center px-2 py-1">
        <span className={classNames} aria-label="Selected translation">
          <IoBookOutline className={iconCls} />

          <span className="font-medium">{translationName}</span>

          <span className="hidden sm:inline" aria-hidden>
            /
          </span>

          <span>{translatorNamesGathered}</span>
        </span>
      </div>
    );
  } else if (preferredTranslations.size === 0) {
    return (
      <div className="rounded-md bg-gray-200 dark:bg-neutral-900 w-full flex justify-center items-center px-2 py-1">
        <span className={classNames} aria-label="No translation selected">
          <IoBookOutline className={iconCls} />
          <span>No translation selected.</span>
        </span>
      </div>
    );
  } else {
    return (
      <div className="rounded-md bg-gray-200 dark:bg-neutral-900 w-full flex justify-center items-center px-2 py-1">
        <span
          className={classNames}
          aria-label={`${preferredTranslations.size} translations selected`}
        >
          <IoBookOutline className={iconCls} />
          <span>Selected {preferredTranslations.size} translations</span>
        </span>
      </div>
    );
  }
};

export default ChapterPageTranslatorsIndicator;
