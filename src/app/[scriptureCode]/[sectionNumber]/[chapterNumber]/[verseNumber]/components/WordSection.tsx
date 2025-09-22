"use client";

import { VerseBoth } from "@/types/classes/model/Verse/Verse/VerseBoth/VerseBoth";
import {
  T_OriginalScriptureVocalizationKey,
  T_ScriptureCode,
} from "@/types/types";
import { FC } from "react";
import { MdOutlineFormatListNumbered } from "react-icons/md";
import WordVerse from "./WordVerse";

type Props = {
  verse: VerseBoth;
  variation: T_OriginalScriptureVocalizationKey;
  scriptureCode: T_ScriptureCode;
};

const WordSection: FC<Props> = ({ verse, variation, scriptureCode }) => {
  return (
    <div className="w-full order-2 sm:order-1">
      <div className="flex flex-col">
        <div className="flex flex-row gap-3 justify-center p-2 px-4 w-full rounded-t-lg border border-neutral-400/50 dark:border-gray-500 bg-gray-100 dark:bg-black text-gray-700 dark:text-gray-200">
          <div className="w-full flex justify-start">
            <span className="p-1 bg-gray-200/80 dark:bg-dark text-gray-700 dark:text-gray-200 rounded-md inline-flex items-center gap-1">
              <MdOutlineFormatListNumbered size={20} /> Words
            </span>
          </div>
        </div>

        <div className="flex justify-center w-full py-1.5 px-2.5 border-x border-b border-neutral-300 dark:border-gray-600 bg-white dark:bg-black">
          <div className="w-full flex justify-between items-center text-sm font-medium text-gray-600 dark:text-gray-300 dark:bg-black">
            <span className="px-2">#</span>
            <span className="px-2">Word</span>
            <div className="px-2 flex gap-5">Root/Lemma(s)</div>
          </div>
        </div>

        {verse.getWords().map((w) => (
          <WordVerse
            variation={variation}
            key={w.getSequenceNumber()}
            word={w}
            scriptureCode={scriptureCode}
          />
        ))}
      </div>
    </div>
  );
};

export default WordSection;
