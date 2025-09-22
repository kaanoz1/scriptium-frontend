"use client";

import { FC, Fragment, ReactNode } from "react";
import { Link } from "@heroui/link";
import { GrNext, GrPrevious, GrShareOption } from "react-icons/gr";
import { Tooltip } from "@heroui/tooltip";
import { IoPlayOutline, IoSettingsOutline } from "react-icons/io5";
import { MdTranslate } from "react-icons/md";
import { T_ScriptureCode } from "@/types/types";
import { DEFAULT_LANG_CODE, TOOL_TIP_CLASS_NAMES } from "@/util/constants";
import { ChapterUpperAndOneLevelLower } from "@/types/classes/model/Chapter/Chapter/ChapterUpper/ChapterUpperAndOneLevelLower/ChapterUpperAndOneLevelLower";
import { ScriptureHelper } from "@/types/classes/client/Scripture/ScriptureHelper/ScriptureHelper";

type Props = {
  chapter: ChapterUpperAndOneLevelLower;
  scriptureDetail: Readonly<ScriptureHelper>;
  functionWhichOpensSettingsModal: () => void;
  functionWhichOpensTranslationModal: () => void;
  functionWhichOpensShareModal: () => void;
  functionWhichSetsShareText: (shareText: string) => void;
};

const ChapterPageTools: FC<Props> = ({
  chapter,
  scriptureDetail,
  functionWhichOpensTranslationModal,
  functionWhichOpensSettingsModal,
  functionWhichOpensShareModal,
  functionWhichSetsShareText,
}): ReactNode => {
  const chapterNumber = chapter.getNumber();

  const section = chapter.getSection();
  const sectionNumber = section.getNumber();
  const sectionMeaning = section.getMeaningTextOrDefault(DEFAULT_LANG_CODE);
  const sectionNameInOwnLanguage = section.getName();

  const scripture = section.getScripture();
  const scriptureCode: T_ScriptureCode = scripture.getCode();
  const scriptureMeaning = scripture.getMeaningTextOrDefault(DEFAULT_LANG_CODE);
  const scriptureNameInOwnLanguage = scripture.getName();

  const doesPreviousChapterExists = scriptureDetail.isChapterExist(
    sectionNumber,
    chapterNumber - 1
  );

  const doesNextChapterExists = scriptureDetail.isChapterExist(
    sectionNumber,
    chapterNumber + 1
  );

  return (
    <Fragment>
      <Link
        color="foreground"
        href={`/${scriptureCode}/${sectionNumber}/${chapterNumber - 1}`}
        isDisabled={!doesPreviousChapterExists}
      >
        <GrPrevious className="w-4 h-4 md:w-5 md:h-5 cursor-pointer hover:text-blue-700 dark:hover:text-blue-300 transition-colors" />
      </Link>

      <Link
        color="foreground"
        href={`/${scriptureCode}/${sectionNumber}/${chapterNumber + 1}`}
        isDisabled={!doesNextChapterExists}
      >
        <GrNext className="w-4 h-4 md:w-5 md:h-5 cursor-pointer hover:text-blue-700 dark:hover:text-blue-300 transition-colors" />
      </Link>

      <Tooltip
        content="Not supported yet."
        classNames={TOOL_TIP_CLASS_NAMES}
        showArrow
        delay={250}
        closeDelay={0}
      >
        <span className="flex items-center justify-center">
          <Link isDisabled color="foreground">
            <IoPlayOutline className="w-4 h-4 md:w-5 md:h-5" />
          </Link>
        </span>
      </Tooltip>

      <IoSettingsOutline
        onClick={functionWhichOpensSettingsModal}
        className="w-4 h-4 md:w-5 md:h-5 cursor-pointer hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors"
      />

      <MdTranslate
        onClick={functionWhichOpensTranslationModal}
        className="w-4 h-4 md:w-5 md:h-5 cursor-pointer hover:text-red-600 dark:hover:text-red-500 transition-colors"
      />

      <GrShareOption
        onClick={() => {
          functionWhichOpensShareModal();
          functionWhichSetsShareText(
            `${scriptureMeaning} (${scriptureNameInOwnLanguage}), ${sectionMeaning} (${sectionNameInOwnLanguage}), Chapter: ${chapterNumber}\n\n${window.location.href}`
          );
        }}
        className="w-4 h-4 md:w-5 md:h-5 cursor-pointer hover:text-teal-700 dark:hover:text-teal-500 transition-colors"
      />
    </Fragment>
  );
};

export default ChapterPageTools;
