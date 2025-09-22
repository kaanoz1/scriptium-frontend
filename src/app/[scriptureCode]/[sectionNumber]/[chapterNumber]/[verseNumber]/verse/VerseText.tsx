"use client";

import { ScripturePreference } from "@/types/classes/client/Scripture/ScripturePreference/ScripturePreference";
import { VerseSimple } from "@/types/classes/model/Verse/VerseSimple/VerseSimple";
import { FC, ReactNode } from "react";

type Props = {
  verse: VerseSimple;
  preference: ScripturePreference;
};

const VerseText: FC<Props> = ({ verse, preference }): ReactNode => {
  const preferredFont = preference.getPreferredFont();
  const preferredVariation =
    preference.getPreferredOriginalScriptureTextVariationKey();
  const verseText: string = verse.getTextOfVariationOrUsual(preferredVariation);

  return (
    <div
      className={`
    w-full
    text-[clamp(1.25rem,3.5vw,1.5rem)]  
    sm:text-[clamp(1.25rem,2.5vw,1.5rem)]
    md:text-[clamp(1.375rem,2vw,1.625rem)]
    lg:text-[clamp(1.5rem,1.8vw,1.75rem)] 
    leading-snug md:leading-relaxed
    tracking-tight
    break-words hyphens-auto
    text-gray-900 dark:text-gray-100
    ${preferredFont}
  `}
    >
      {verseText}
    </div>
  );
};

export default VerseText;
