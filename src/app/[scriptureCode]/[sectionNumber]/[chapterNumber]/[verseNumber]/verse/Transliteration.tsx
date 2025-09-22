"use client";

import { VerseSimple } from "@/types/classes/model/Verse/VerseSimple/VerseSimple";
import { DEFAULT_LANG_CODE } from "@/util/constants";
import { FC, ReactNode } from "react";

type Props = {
  verse: VerseSimple;
};

const Transliteration: FC<Props> = ({ verse }): ReactNode => {
  const transliteration: string | ReactNode =
    verse.getTransliterationTextOrNull(DEFAULT_LANG_CODE) ?? (
      <span className="italic">No transliteration available.</span>
    );

  return (
    <div className="text-sm font-light italic pt-2 text-gray-700 dark:text-gray-400">
      {transliteration}
    </div>
  );
};

export default Transliteration;
