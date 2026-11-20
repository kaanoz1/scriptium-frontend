"use client";

import React from "react";
import { observer } from "mobx-react-lite";
import { HadithViewPreferences } from "@/configuration/UserPreferences/Islam/Hadith/HadithViewPreferences";
import { cn } from "@/lib/utils";

type Props = {
  as?: "p" | "span" | "h1" | "h2" | "div";
  /** Size relative to the reading size chosen in the settings. */
  scale?: number;
  minSize?: number;
  className?: string;
  children: React.ReactNode;
};

/**
 * Arabic hadith text in the reader's chosen font and size. Every hadith text
 * outside <HadithText> goes through this, so the reading settings apply to
 * the whole page at once.
 */
const ReadingText: React.FC<Props> = observer(({ as: Tag = "p", scale = 1, minSize = 14, className, children }) => {
  const prefs = HadithViewPreferences.getInstance();
  // Not rounded: rounding swallowed most 1px steps of the slider at scale < 1.
  const fontSize = Math.max(minSize, prefs.fontSize * scale);
  return (
    <Tag dir="rtl" lang="ar" className={cn(prefs.font.className, className)} style={{ fontSize }}>
      {children}
    </Tag>
  );
});

export default ReadingText;
