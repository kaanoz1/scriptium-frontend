import { RootDTO } from "@/types/classes/Root";
import { WordLowerDTO } from "@/types/classes/Word";
import { T_ScriptureTextVariationKey } from "@/types/types";
import { TOOL_TIP_CLASS_NAMES } from "@/util/utils";
import { Link } from "@heroui/link";
import { Tooltip } from "@heroui/tooltip";
import { NextPage } from "next";
import { Fragment } from "react";

interface Props {
  word: WordLowerDTO;
  scriptureCode: string;
  variation: T_ScriptureTextVariationKey;
}

const WordVerse: NextPage<Props> = ({ word, scriptureCode, variation }) => {
  const sequenceNumber = word.getSequenceNumber();

  const roots: ReadonlyArray<RootDTO> = word.getRoots();

  const wordText: string =
    word.getVariation().getTextWithVariation(variation) ??
    word.getVariation().getUsual();

  return (
    <div className="flex flex-col gap-3 px-5 py-2 w-full border-l border-r border-b border-neutral-400/50 dark:border-gray-500 bg-white dark:bg-dark text-gray-800 dark:text-gray-200">
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
