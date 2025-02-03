import { FootNoteDTO } from "@/types/types";
import { TOOL_TIP_CLASS_NAMES } from "@/util/utils";
import { Tooltip } from "@heroui/tooltip";
import { FC } from "react";

interface Props {
  translationText: {
    text: string;
    footnotes: FootNoteDTO[];
  };

  showFootnotes?: boolean;
}

const TranslatedTextWithFootnotes: FC<Props> = ({
  translationText: { text, footnotes },
  showFootnotes = true,
}) => {
  if (!showFootnotes) return <div className="text-medium">{text}</div>;

  const sortedFootnotes = [...footnotes].sort((a, b) => a.index - b.index);

  const elements = [];
  let lastIndex = 0;

  sortedFootnotes.forEach((footnote, i) => {
    const { index, text: footnoteText } = footnote;

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
