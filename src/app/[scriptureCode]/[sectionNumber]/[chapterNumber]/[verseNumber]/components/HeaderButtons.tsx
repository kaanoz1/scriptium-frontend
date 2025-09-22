"use client";

import { ScriptureHelper } from "@/types/classes/client/Scripture/ScriptureHelper/ScriptureHelper";
import { VerseBoth } from "@/types/classes/model/Verse/Verse/VerseBoth/VerseBoth";
import { TOOL_TIP_CLASS_NAMES } from "@/util/constants";
import { Link } from "@heroui/link";
import { Tooltip } from "@heroui/react";
import { FC } from "react";
import { GoBookmarkFill, GoBookmark } from "react-icons/go";
import { GrShareOption, GrPrevious, GrNext } from "react-icons/gr";
import { IoPlayOutline, IoSettingsOutline } from "react-icons/io5";
import { MdTranslate } from "react-icons/md";

type Props = {
  verse: VerseBoth;
  isSaved: boolean;
  scriptureHelper: Readonly<ScriptureHelper>;
  functionThatMakesIsCollectionModelOpenStateTrue: () => void;
  functionThatMakesIsTranslationModelOpenStateTrue: () => void;
  functionThatMakesIsSettingsModelOpenStateTrue: () => void;
  functionThatMakesIsShareModelOpenStateTrueAndSetsShareText: () => void;
};

const HeaderButtons: FC<Props> = ({
  verse,
  isSaved,
  functionThatMakesIsCollectionModelOpenStateTrue,
  functionThatMakesIsSettingsModelOpenStateTrue,
  functionThatMakesIsTranslationModelOpenStateTrue,
  scriptureHelper,
  functionThatMakesIsShareModelOpenStateTrueAndSetsShareText,
}) => {
  const chapter = verse.getChapter();
  const section = chapter.getSection();
  const scripture = section.getScripture();

  const verseNumber = verse.getNumber();
  const chapterNumber = chapter.getNumber();
  const sectionNumber = section.getNumber();
  const scriptureCode = scripture.getCode();

  const doesPreviousVerseExists = scriptureHelper.isVerseExist(
    sectionNumber,
    chapterNumber,
    verseNumber - 1
  );

  const doesNextVerseExists = scriptureHelper.isVerseExist(
    sectionNumber,
    chapterNumber,
    verseNumber + 1
  );

  return (
    <div className="w-full flex justify-between items-center sm:flex-wrap sm:justify-start sm:items-center gap-3 sm:gap-4 md:gap-5 pe-0 sm:pe-6 md:pe-10">
      <Tooltip
        content="Not supported yet."
        classNames={TOOL_TIP_CLASS_NAMES}
        delay={30}
        closeDelay={5}
        showArrow
        placement="bottom"
      >
        <span>
          {isSaved ? (
            <GoBookmarkFill
              className="cursor-pointer text-violet-700 dark:text-violet-300 opacity-50 rounded-md hover:bg-black/5 dark:hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-400 dark:focus-visible:ring-neutral-500"
              onClick={functionThatMakesIsCollectionModelOpenStateTrue}
              size={20}
              role="button"
              aria-label="Open collections"
              tabIndex={0}
            />
          ) : (
            <GoBookmark
              className="opacity-50 cursor-pointer rounded-md hover:bg-black/5 dark:hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-400 dark:focus-visible:ring-neutral-500"
              onClick={functionThatMakesIsCollectionModelOpenStateTrue}
              size={20}
              role="button"
              aria-label="Open collections"
              tabIndex={0}
            />
          )}
        </span>
      </Tooltip>

      <Tooltip
        content="Not supported yet."
        classNames={TOOL_TIP_CLASS_NAMES}
        showArrow
        delay={250}
        closeDelay={0}
      >
        <span className="flex items-center justify-center">
          <Link
            isDisabled
            color="foreground"
            aria-label="Play audio (coming soon)"
          >
            <IoPlayOutline size={21} />
          </Link>
        </span>
      </Tooltip>

      <GrShareOption
        size={19}
        className="cursor-pointer hover:text-teal-700 dark:hover:text-teal-500 transition-colors rounded-md hover:bg-black/5 dark:hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-400 dark:focus-visible:ring-neutral-500"
        onClick={functionThatMakesIsShareModelOpenStateTrueAndSetsShareText}
        aria-label="Share verse"
        role="button"
      />

      <MdTranslate
        size={19}
        className="cursor-pointer hover:text-red-600 dark:hover:text-red-500 transition-colors rounded-md hover:bg-black/5 dark:hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-400 dark:focus-visible:ring-neutral-500"
        onClick={functionThatMakesIsTranslationModelOpenStateTrue}
        aria-label="Select translations"
        role="button"
      />

      <IoSettingsOutline
        size={19}
        className="cursor-pointer hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors rounded-md hover:bg-black/5 dark:hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-400 dark:focus-visible:ring-neutral-500"
        onClick={functionThatMakesIsSettingsModelOpenStateTrue}
        aria-label="Open settings"
        role="button"
      />

      <Link
        color="foreground"
        href={`/${scriptureCode}/${sectionNumber}/${chapterNumber}/${
          verseNumber - 1
        }`}
        isDisabled={!doesPreviousVerseExists}
        aria-label={`Previous verse ${verseNumber - 1}`}
      >
        <GrPrevious
          size={18}
          className="cursor-pointer hover:text-blue-700 transition-colors rounded-md hover:bg-black/5 dark:hover:bg-white/5"
        />
      </Link>

      <Link
        color="foreground"
        href={`/${scriptureCode}/${sectionNumber}/${chapterNumber}/${
          verseNumber + 1
        }`}
        isDisabled={!doesNextVerseExists}
        aria-label={`Next verse ${verseNumber + 1}`}
      >
        <GrNext
          size={18}
          className="cursor-pointer hover:text-blue-700 transition-colors rounded-md hover:bg-black/5 dark:hover:bg-white/5"
        />
      </Link>
    </div>
  );
};

export default HeaderButtons;
