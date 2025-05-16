import { NextPage } from "next";
import TranslatedTextWithFootnotes from "./UI/TranslatedTextWithFootnotes";
import { TranslationTextDTO } from "@/types/classes/TranslationText";

interface Props {
  translationText: TranslationTextDTO;
  showFootnotes: boolean;
}

const VersePageTabTranslationsRow: NextPage<Props> = ({
  translationText,
  showFootnotes,
}) => {
  const translationName = translationText.getTranslation().getName();
  const translatorNamesGathered = translationText
    .getTranslation()
    .getTranslators()
    .map((t) => t.getName())
    .join(", ");

  return (
    <div className="w-full p-4 bg-white dark:bg-black text-gray-800 dark:text-gray-200">
      <div className="mb-2 flex items-center gap-2">
        <span className="font-bold">{translationName}</span>
        <span className="text-gray-400 dark:text-gray-500">—</span>
        <span className="italic text-sm opacity-80">
          {translatorNamesGathered}
        </span>
      </div>

      <div className="leading-relaxed">
        <TranslatedTextWithFootnotes
          translationText={{
            text: translationText.getText(),
            footnotes: translationText.getFootNotes(),
          }}
          showFootnotes={showFootnotes}
        />
      </div>
    </div>
  );
};

export default VersePageTabTranslationsRow;
