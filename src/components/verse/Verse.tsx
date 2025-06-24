import { FC, ReactNode } from "react";
import { VerseDTO } from "@/types/classes/Verse";
import { ScripturePreference } from "@/types/classes/Scripture";
import { TranslationDTO } from "@/types/classes/Translation";
import { TranslationTextDTO } from "@/types/classes/TranslationText";
import TranslationText from "@/components/verse/TranslationText";
import VerseText from "@/components/verse/VerseText";
import Transliteration from "@/components/verse/Transliteration";

type Props = {
  verse: VerseDTO;
  selectedTranslations: Array<TranslationDTO>;
  preference: ScripturePreference;
  Buttons?: ReactNode;
  showTranslationHeader: boolean;
};

const Verse: FC<Props> = ({
  verse,
  selectedTranslations,
  preference,
  Buttons,
  showTranslationHeader,
}): ReactNode => {
  const options = preference.getOptions();
  const showTranslation = options.getShowTranslation();
  const showOriginalText = options.getShowOriginalText();
  const showTransliteration = options.getShowTransliteration();

  return (
    <div className="flex flex-col gap-2 justify-items-center items-center w-full">
      {Buttons && (
        <div className="absolute right-4 top-4 flex items-center justify-items-center">
          {Buttons}
        </div>
      )}

      {showTranslation && (
        <div className="w-full">
          {selectedTranslations.map((translation) => {
            const translationTextOfVerse: TranslationTextDTO | undefined = verse
              .getTranslationTexts()
              .find((tt) => tt.getTranslation().getId() == translation.getId());

            return (
              <TranslationText
                key={translation.getId()}
                showTranslationHeader={showTranslationHeader}
                translation={translation}
                translationText={translationTextOfVerse}
                preference={preference}
              />
            );
          })}
        </div>
      )}

      {showOriginalText && (
        <div className="w-full">
          <VerseText verse={verse} preference={preference} />
        </div>
      )}
      <div className="flex flex-col gap-2 w-full">
        {showTransliteration && <Transliteration verse={verse} />}
      </div>
    </div>
  );
};

export default Verse;
