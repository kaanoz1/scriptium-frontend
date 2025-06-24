import { TOOL_TIP_CLASS_NAMES } from "@/util/utils";
import { Tooltip } from "@heroui/tooltip";
import { FC } from "react";
import { TranslationTextDTO } from "@/types/classes/TranslationText";

interface Props {
  translationText: Readonly<TranslationTextDTO>;

  showFootnotes?: boolean;
}

const TranslatedTextWithFootnotes: FC<Props> = ({
  translationText,
  showFootnotes = true,
}) => {
  const text = translationText.getText();
  const footnotes = translationText.getFootNotes();

  if (!showFootnotes) return <div className="text-medium">{text}</div>;

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

    elements.push(
      <Tooltip
        key={`footnote-${i}`}
        content={footnoteText}
        placement="top"
        classNames={TOOL_TIP_CLASS_NAMES}
        showArrow
        delay={250}
        closeDelay={0}
      >
        <sup
          className="
            cursor-pointer 
            text-blue-600
            dark:text-blue-400
          "
        >
          [{i + 1}]
        </sup>
      </Tooltip>
    );

    lastIndex = index;
  });

  const remainingText = text.substring(lastIndex);
  if (remainingText) elements.push(remainingText);

  return <div className="text-medium">{elements}</div>;
};

export default TranslatedTextWithFootnotes;
