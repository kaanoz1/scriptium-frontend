import { BookTranslationText } from "@/types/classes/model/Book/BookTranslationText/BookTranslationText/BookTranslationText";
import { Footnote } from "@/types/classes/model/Footnote/Footnote";
import { TranslationText } from "@/types/classes/model/TranslationText/TranslationText/TranslationText";
import { TOOL_TIP_CLASS_NAMES } from "@/util/constants";
import { FC } from "react";
import { FootnoteMarker } from "./UI/FootnoteMarket";

interface Props {
  translationText: Readonly<TranslationText> | Readonly<BookTranslationText>;
  showFootnotes?: boolean;
}

const TranslatedTextWithFootnotes: FC<Props> = ({
  translationText,
  showFootnotes = true,
}) => {
  const text = translationText.getText();
  const footnotes = translationText.getFootnotes();

  if (!showFootnotes) {
    return (
      <div className="leading-relaxed text-[0.95rem] sm:text-base md:text-[1.0625rem]">
        {text}
      </div>
    );
  }

  const sortedFootnotes = [...footnotes].sort(
    (a, b) => a.getIndex() - b.getIndex()
  );

  const elements = [];
  let lastIndex = 0;

  sortedFootnotes.forEach((footnote, i) => {
    const index = footnote.getIndex();
    const footnoteText = footnote.getText();

    const precedingText = text.substring(lastIndex, index);
    if (precedingText) elements.push(precedingText);

    const indicator =
      footnote instanceof Footnote ? i + 1 : footnote.getIndicator();

    elements.push(
      <FootnoteMarker
        key={`footnote-${i}`}
        indicator={indicator}
        content={footnoteText}
        tooltipClassNames={TOOL_TIP_CLASS_NAMES}
      />
    );

    lastIndex = index;
  });

  const remainingText = text.substring(lastIndex);
  if (remainingText) elements.push(remainingText);

  return (
    <div className="leading-relaxed text-[0.95rem] sm:text-base md:text-[1.0625rem]">
      {elements}
    </div>
  );
};

export default TranslatedTextWithFootnotes;
