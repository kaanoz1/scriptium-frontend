import { TranslationTextDTO } from "@/types/types";
import { FC } from "react";
import TranslatedTextWithFootnotes from "./UI/TranslatedTextWithFootnotes";

interface Props {
  translationText: TranslationTextDTO;
  showFootnotes?: boolean;
}

const VersePageTranslationBoxComponent: FC<Props> = ({
  translationText,
  showFootnotes = true,
}) => {
  const translatorNamesGathered: string =
    translationText.translation.translators.map((t) => t.name).join(", ");

  return (
    <div className="pb-4">
      <span className="italic text-sm block text-gray-600 dark:text-gray-400">
        {translationText.translation.name} - {translatorNamesGathered}
      </span>
      <div className="py-2 px-3 w-full leading-relaxed">
        <TranslatedTextWithFootnotes
          translationText={{
            text: translationText.text,
            footnotes: translationText.footNotes,
          }}
          showFootnotes={showFootnotes}
        />
      </div>
    </div>
  );
};

export default VersePageTranslationBoxComponent;
