import { FootNoteDTO } from "@/types/types";
import { Tooltip } from "@heroui/tooltip";
import { MdVerified } from "react-icons/md";

export const RoleIcon: Record<
  string,
  {
    icon: (props: { size?: number; className?: string }) => JSX.Element;
    backgroundColor: string;
  }
> = {
  Admin: {
    icon: ({ size = 20, className = "text-violet-700" }) => (
      <MdVerified size={size} className={className} />
    ),
    backgroundColor: "bg-violet-700",
  },
  Verified: {
    icon: ({ size = 20, className = "text-blue-500" }) => (
      <MdVerified size={size} className={className} />
    ),
    backgroundColor: "bg-blue-500",
  },
} as const;

export function injectTooltips(
  text: string,
  footnotes: FootNoteDTO[]
): Array<string | JSX.Element> {
  const sortedFootnotes = [...footnotes].sort((a, b) => a.index - b.index);

  const result: Array<string | JSX.Element> = [];
  let lastIndex = 0;

  sortedFootnotes.forEach(({ index, text }, i) => {
    if (index > lastIndex) result.push(text.slice(lastIndex, index));

    if (index < text.length) {
      const charAtIndex = text[index];
      result.push(charAtIndex);

      result.push(
        <Tooltip key={`tooltip-${i}`} content={text} placement="top">
          <sup className="ml-1 text-xs align-super cursor-pointer underline text-blue-600">
            {i + 1}
          </sup>
        </Tooltip>
      );

      lastIndex = index + 1;
    }
  });

  if (lastIndex < text.length) result.push(text.slice(lastIndex));

  return result;
}
