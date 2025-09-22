import { BookTranslation } from "@/types/classes/model/Book/BookTranslation/BookTranslation/BookTranslation";
import { FC } from "react";
import { IoBookOutline } from "react-icons/io5";

type Props = {
  translation: Readonly<BookTranslation> | undefined;
};

const TranslationIndicator: FC<Props> = ({ translation }) => {
  if (translation === undefined)
    return (
      <span className="py-1 px-2 mx-1 bg-gray-200 dark:bg-neutral-800 text-gray-700 dark:text-gray-200 rounded-md inline-flex items-center gap-1">
        <IoBookOutline size={17} />
        <p>Unknown translation.</p>
      </span>
    );

  const translationName = translation.getName();
  const translators = translation.getTranslators();

  const translatorNamesGathered = translators
    .map((t) => t.getName())
    .join(", ");

  return (
    <span className="py-1 px-2 mx-1 bg-gray-200 dark:bg-neutral-800 text-gray-700 dark:text-gray-200 rounded-md inline-flex items-center gap-1">
      <IoBookOutline size={17} />
      <span>{translationName}</span>
      {translatorNamesGathered && (
        <>
          <span> / </span>
          <span>{translatorNamesGathered}</span>
        </>
      )}
    </span>
  );
};

export default TranslationIndicator;
