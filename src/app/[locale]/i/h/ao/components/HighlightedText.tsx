import React from "react";
import { TTextRange } from "@/dto/Islam/Hadith/ArabicOnly";

/** Renders `text` with the given ranges wrapped in <mark>. */
const HighlightedText: React.FC<{ text: string; ranges?: TTextRange[] | null }> = ({ text, ranges }) => {
  if (!ranges || ranges.length === 0) return <>{text}</>;
  const sorted = [...ranges].sort((a, b) => a.start - b.start);
  const parts: React.ReactNode[] = [];
  let cursor = 0;
  sorted.forEach((r, i) => {
    if (r.start < cursor) return;
    if (r.start > cursor) parts.push(text.slice(cursor, r.start));
    parts.push(
      <mark key={i} className="rounded bg-amber-300/40 px-0.5 text-inherit dark:bg-amber-400/25">
        {text.slice(r.start, r.end)}
      </mark>,
    );
    cursor = r.end;
  });
  if (cursor < text.length) parts.push(text.slice(cursor));
  return <>{parts}</>;
};

export default HighlightedText;
