import {
  RootSimpleDTO,
  VerseTextVariation,
  WordConfinedDTO,
} from "@/types/types";
import { TOOL_TIP_CLASS_NAMES } from "@/util/utils";
import { Link } from "@heroui/link";
import { Tooltip } from "@heroui/tooltip";
import { NextPage } from "next";
import { Fragment } from "react";

interface Props {
  word: WordConfinedDTO;
  scriptureCode: string;
  variation: VerseTextVariation;
}

const WordVerse: NextPage<Props> = ({ word, scriptureCode, variation }) => {
  const sequenceNumber = word.sequenceNumber;

  const roots: Array<RootSimpleDTO> = word.roots;

  const wordText: string = word[variation] ?? word.text;

  return (
    <div className="flex flex-col gap-3 px-5 py-2 w-full border-l border-r border-b border-neutral-400/50 dark:border-gray-500 bg-white dark:bg-dark text-gray-800 dark:text-gray-200">
      <div className="flex w-full items-center justify-between">
        <span>{sequenceNumber}</span>
        <span>{wordText}</span>
        <span>
          {roots.map((r, i) => (
            <Fragment key={r.latin}>
              <Link href={`/root/${scriptureCode}/${r.latin}`}>
                <span>{r.own}</span>
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
