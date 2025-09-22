"use client";

import { Root } from "@/types/classes/model/Root/Root/Root";
import { WordLower } from "@/types/classes/model/Word/Word/WordLower/WordLower";
import { T_OriginalScriptureVocalizationKey } from "@/types/types";
import { TOOL_TIP_CLASS_NAMES } from "@/util/constants";
import { Link } from "@heroui/link";
import { Tooltip } from "@heroui/tooltip";
import { NextPage } from "next";
import { Fragment } from "react";

interface Props {
  word: WordLower;
  scriptureCode: string;
  variation: T_OriginalScriptureVocalizationKey;
}

const WordVerse: NextPage<Props> = ({ word, scriptureCode, variation }) => {
  const sequenceNumber = word.getSequenceNumber();

  const roots: ReadonlyArray<Root> = word.getRoots();

  const wordText: string =
    word.getVariation().getTextWithVariation(variation) ??
    word.getVariation().getUsual();

  return (
    <div className="flex flex-col gap-3 px-5 py-2 w-full border-l border-r border-b border-neutral-400/50 dark:border-gray-500 bg-white dark:bg-black text-gray-800 dark:text-gray-200">
      <div className="flex w-full items-center justify-between">
        <span>{sequenceNumber}</span>
        <span>{wordText}</span>
        <span>
          {roots.map((r, i) => (
            <Fragment key={r.getLatin()}>
              <Link href={`/root/${scriptureCode}/${r.getLatin()}`}>
                <span>{r.getOwn()}</span>
              </Link>
              {i < roots.length - 1 && (
                <Tooltip
                  content="AND/OR"
                  classNames={TOOL_TIP_CLASS_NAMES}
                  delay={10}
                  closeDelay={0}
                >
                  <span> A/O </span>
                </Tooltip>
              )}
            </Fragment>
          ))}
        </span>
      </div>
    </div>
  );
};

export default WordVerse;
