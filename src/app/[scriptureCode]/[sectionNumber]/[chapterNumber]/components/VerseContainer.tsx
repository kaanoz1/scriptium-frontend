"use client";

import { ScriptureHelper } from "@/types/classes/client/Scripture/ScriptureHelper/ScriptureHelper";
import { ChapterUpperAndOneLevelLower } from "@/types/classes/model/Chapter/Chapter/ChapterUpper/ChapterUpperAndOneLevelLower/ChapterUpperAndOneLevelLower";
import { Translation } from "@/types/classes/model/Translation/Translation/Translation";
import { FC } from "react";
import ChapterPageTools from "./ChapterPageTools";
import ChapterPageTranslatorsIndicator from "./ChapterPageTranslatorsIndicator";
import VerseRow from "./VerseRow";
import { ScripturePreference } from "@/types/classes/client/Scripture/ScripturePreference/ScripturePreference";
import { getShareTextOfVerse } from "@/util/constants";

type Props = {
  chapter: ChapterUpperAndOneLevelLower;
  preferredTranslations: Set<Translation>;
  scriptureHelper: Readonly<ScriptureHelper>;
  preference: ScripturePreference;
  functionWhichOpensTranslationModal: () => void;
  functionWhichOpensSettingsModal: () => void;
  functionWhichOpensShareModal: () => void;
  functionWhichSetsShareText: (text: string) => void;
  functionWhichOpensShareModel: () => void;
};

const VerseContainer: FC<Props> = ({
  chapter,
  preferredTranslations,
  scriptureHelper,
  preference,
  functionWhichOpensSettingsModal,
  functionWhichOpensTranslationModal,
  functionWhichOpensShareModal,
  functionWhichSetsShareText,
  functionWhichOpensShareModel,
}) => {
  const verses = chapter.getVerses();

  return (
    <div className="flex flex-col">
      <div className="w-full flex flex-col gap-2 sm:gap-0 sm:flex-row justify-between items-center py-1.5 px-2.5 rounded-t-lg border border-neutral-300 dark:border-gray-600 bg-white dark:bg-dark">
        <div className="w-full sm:w-auto flex justify-center sm:justify-start px-2 text-lg font-semibold sm:text-medium sm:font-normal">
          <ChapterPageTranslatorsIndicator
            preferredTranslations={preferredTranslations}
          />
        </div>

        <div className="w-full sm:w-auto mt-1 sm:mt-0 flex items-center justify-evenly gap-3 sm:gap-4 py-1 px-2">
          <ChapterPageTools
            chapter={chapter}
            functionWhichOpensTranslationModal={
              functionWhichOpensTranslationModal
            }
            functionWhichOpensSettingsModal={functionWhichOpensSettingsModal}
            functionWhichOpensShareModal={functionWhichOpensShareModal}
            scriptureDetail={scriptureHelper}
            functionWhichSetsShareText={functionWhichSetsShareText}
          />
        </div>
      </div>

      {verses.map((v) => (
        <VerseRow
          key={v.getId()}
          verse={v}
          scriptureDetail={scriptureHelper}
          chapter={chapter}
          functionWhichOpensShareModel={functionWhichOpensShareModel}
          preference={preference}
          functionWhichSetsShareTextToVerse={() =>
            functionWhichSetsShareText(
              getShareTextOfVerse(
                v,
                chapter,
                v.getTranslationTextOfTranslations(
                  Array.from(preferredTranslations)
                )
              )
            )
          }
        />
      ))}
    </div>
  );
};

export default VerseContainer;
