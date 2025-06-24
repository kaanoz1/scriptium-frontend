import { FC } from "react";
import TranslatedTextWithFootnotes from "../../../../../../components/UI/TranslatedTextWithFootnotes";
import { TranslationTextDTO } from "@/types/classes/TranslationText";

interface Props {
  translationText: TranslationTextDTO;
  showFootnotes?: boolean;
}

const VersePageTranslationBoxComponent: FC<Props> = ({
  translationText,
  showFootnotes = true,
}) => {

  const translatorNamesGathered: string = translationText
    .getTranslation()
    .getTranslators()
    .map((t) => t.getName())
    .join(", ");

  const translation = translationText.getTranslation();

  const translationName = translation.getName();

  return (
    <div className="pb-4">
      <span className="italic text-sm block text-gray-600 dark:text-gray-400">
        {translationName} - {translatorNamesGathered}
      </span>
      <div className="py-2 px-3 w-full leading-relaxed">
        <TranslatedTextWithFootnotes
          translationText={translationText}
          showFootnotes={showFootnotes}
        />
      </div>
    </div>
  );
};

export default VersePageTranslationBoxComponent;
