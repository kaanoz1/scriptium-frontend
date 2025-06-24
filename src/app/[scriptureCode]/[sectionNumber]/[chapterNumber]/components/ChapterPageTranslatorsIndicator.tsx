import { FC, ReactNode } from "react";
import { TranslationDTO } from "@/types/classes/Translation";
import { IoBookOutline } from "react-icons/io5";

type Props = {
  preferredTranslations: Set<TranslationDTO>;
};

const ChapterPageTranslatorsIndicator: FC<Props> = ({
  preferredTranslations,
}): ReactNode => {
  if (preferredTranslations.size === 1) {
    const selectedTranslation = Array.from(preferredTranslations).at(0)!; //Already checked
    const translationName = selectedTranslation.getName();
    const translatorNamesGathered = selectedTranslation
      .getTranslators()
      .map((t) => t.getName())
      .join(", ");
    return (
      <span className="py-1 px-2 mx-1 bg-gray-200 dark:bg-neutral-800text-gray-700 dark:text-gray-200 rounded-md inline-flex items-center gap-1">
        <IoBookOutline size={17} />
        <span>{translationName}</span>
        <span> / </span>
        <span>{translatorNamesGathered}</span>
      </span>
    );
  } else if (preferredTranslations.size === 0)
    return (
      <span className="py-1 px-2 mx-1 bg-gray-200 dark:bg-neutral-800text-gray-700 dark:text-gray-200 rounded-md inline-flex items-center gap-1">
        <IoBookOutline size={17} />
        <p>No translation selected.</p>
      </span>
    );
  else
    return (
      <span className="py-1 px-2 mx-1 bg-gray-200 dark:bg-neutral-800text-gray-700 dark:text-gray-200 rounded-md inline-flex items-center gap-1">
        <IoBookOutline size={17} />
        <p>Selected {preferredTranslations.size} translations</p>
      </span>
    );
};

export default ChapterPageTranslatorsIndicator;
