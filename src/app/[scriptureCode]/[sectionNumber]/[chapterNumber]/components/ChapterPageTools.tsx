import { Dispatch, FC, ReactNode, SetStateAction } from "react";
import { Link } from "@heroui/link";
import { GrNext, GrPrevious, GrShareOption } from "react-icons/gr";
import { Tooltip } from "@heroui/tooltip";
import { DEFAULT_LANG_CODE, TOOL_TIP_CLASS_NAMES } from "@/util/utils";
import { IoPlayOutline, IoSettingsOutline } from "react-icons/io5";
import { MdTranslate } from "react-icons/md";
import { ChapterUpperAndOneLevelLowerDTO } from "@/types/classes/Chapter";
import { T_ScriptureCode } from "@/types/types";
import { PROJECT_NAME } from "@/util/constants";
import { ScriptureDetail } from "@/util/scriptureDetails";

type Props = {
  chapter: ChapterUpperAndOneLevelLowerDTO;
  scriptureDetail: Readonly<ScriptureDetail>;
  functionWhichOpensSettingsModal: () => void;
  functionWhichOpensTranslationModal: () => void;
  functionWhichOpensShareModal: () => void;
  shareTextSetStateFunction: Dispatch<SetStateAction<string>>;
};

const ChapterPageTools: FC<Props> = ({
  chapter,
  scriptureDetail,
  functionWhichOpensTranslationModal,
  functionWhichOpensSettingsModal,
  functionWhichOpensShareModal,
  shareTextSetStateFunction,
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

  const { doesPreviousChapterExists, doesNextChapterExists } =
    scriptureDetail.getChapterInformation(sectionNumber, chapterNumber); //Since we already checked in fetchChapter function

  return (
    <div className="py-1 px-2 flex items-center justify-evenly gap-5">
      <Link
        color="foreground"
        href={`/${scriptureCode}/${sectionNumber}/${chapterNumber - 1}`}
        isDisabled={!doesPreviousChapterExists}
      >
        <GrPrevious
          size={18}
          className="cursor-pointer hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
        />
      </Link>
      <Link
        color="foreground"
        href={`/${scriptureCode}/${sectionNumber}/${chapterNumber + 1}`}
        isDisabled={!doesNextChapterExists}
      >
        <GrNext
          size={18}
          className="cursor-pointer hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
        />
      </Link>

      <Tooltip
        content="Not supported yet."
        classNames={TOOL_TIP_CLASS_NAMES}
        showArrow
        delay={250}
        closeDelay={0}
      >
        <span className="flex items-center justify-center">
          {/*Since items-center tag does not affect this span as it is located in Tooltip, I had to adjust it again. */}
          <Link isDisabled={true} color="foreground">
            <IoPlayOutline size={21} />
          </Link>
        </span>
      </Tooltip>
      <IoSettingsOutline
        className="cursor-pointer hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors"
        onClick={functionWhichOpensSettingsModal}
        size={19}
      />
      <MdTranslate
        className="cursor-pointer hover:text-red-600 dark:hover:text-red-500 transition-colors"
        onClick={functionWhichOpensTranslationModal}
        size={19}
      />
      <GrShareOption
        size={19}
        className="cursor-pointer hover:text-teal-700 dark:hover:text-teal-500 transition-colors"
        onClick={() => {
          functionWhichOpensShareModal();
          shareTextSetStateFunction(
            `${PROJECT_NAME},\n${scriptureMeaning}(${scriptureNameInOwnLanguage}), ${sectionMeaning} (${sectionNameInOwnLanguage}), Chapter: ${chapterNumber} \n\n${window.location.href}`
          );
        }}
      />
    </div>
  );
};

export default ChapterPageTools;
