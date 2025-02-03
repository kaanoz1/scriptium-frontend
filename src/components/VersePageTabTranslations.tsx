import { TranslationTextDTO } from "@/types/types";
import { NextPage } from "next";
import VersePageTabTranslationsRow from "./VersePageTabTranslationsRow";

interface Props {
  translationTexts: TranslationTextDTO[];
  showFootnotes: boolean;
}

const VersePageTabTranslations: NextPage<Props> = ({
  translationTexts,
  showFootnotes,
}) => {
  return (
    <div className="w-full flex flex-col divide-y divide-gray-200 dark:divide-gray-700">
      {translationTexts.map((tt, i) => (
        <VersePageTabTranslationsRow
          key={i}
          translationText={tt}
          showFootnotes={showFootnotes}
        />
      ))}
    </div>
  );
};

export default VersePageTabTranslations;
