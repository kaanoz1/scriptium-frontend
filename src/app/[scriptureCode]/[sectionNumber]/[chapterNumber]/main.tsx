"use client";

import { T_NoAuthenticationRequestErrorCode } from "@/types/response";
import { T_ChapterPageParams } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { NextPage } from "next";
import { useParams } from "next/navigation";
import { Fragment, ReactNode, useState } from "react";
import { motion } from "framer-motion";
import ChapterPageNotFoundComponent from "@/app/[scriptureCode]/[sectionNumber]/[chapterNumber]/components/ChapterPageNotFoundComponent";
import { getErrorComponent } from "@/util/reactUtil";

import { useScripturePreferences } from "@/hooks/useScripture";
import {
  isNoAuthenticationRequestErrorCode,
  NOT_FOUND_HTTP_RESPONSE_CODE,
} from "@/util/constants";
import LoadingSpinnerFullHeight from "@/components/UI/LoadingSpinnerFullHeight";
import { ChapterUpperAndOneLevelLower } from "@/types/classes/model/Chapter/Chapter/ChapterUpper/ChapterUpperAndOneLevelLower/ChapterUpperAndOneLevelLower";
import { Translation } from "@/types/classes/model/Translation/Translation/Translation";
import { ScriptureHelperCollection } from "@/types/classes/client/ScriptureHelper/ScriptureHelperCollection";
import { BreadCrumbs } from "./components/BreadCrumbs";
import Header from "./components/Header";
import VerseContainer from "./components/VerseContainer";
import Models from "./components/Models";
import fetchChapter from "./utils/fetchChapter";

interface Props {}

const Main: NextPage<Props> = ({}): ReactNode => {
  const {
    scriptureCode: scriptureCodeParam,
    sectionNumber: sectionNumberParam,
    chapterNumber: chapterNumberParam,
  } = useParams<T_ChapterPageParams>();

  const [shareText, setShareText] = useState<string>("");

  const [isTranslationModelOpen, setIsTranslationModelOpen] =
    useState<boolean>(false);

  const [isSettingsModelOpen, setIsSettingsModelOpen] =
    useState<boolean>(false);

  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);

  const scriptureHelper =
    new ScriptureHelperCollection().getScriptureHelperIfExist(
      scriptureCodeParam
    );

  const {
    preference,
    setOriginalTextVariation,
    setShowOriginalText,
    setShowTransliterations,
    setShowTranslations,
    setShowFootnotes,
    setTranslationIdMultiple,
  } = useScripturePreferences(scriptureHelper?.getCode()); //TODO: Amend

  const isChapterExist =
    scriptureHelper !== undefined &&
    scriptureHelper.isChapterExist(
      Number(sectionNumberParam),
      Number(chapterNumberParam)
    );

  const { data: chapter = null, isLoading } = useQuery<
    ChapterUpperAndOneLevelLower | T_NoAuthenticationRequestErrorCode | null
  >({
    queryKey: [
      "chapter-page",
      scriptureCodeParam,
      sectionNumberParam,
      chapterNumberParam,
    ],
    queryFn: async () =>
      await fetchChapter(
        scriptureHelper,
        sectionNumberParam,
        chapterNumberParam
      ),
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    enabled: isChapterExist,
  });

  if (!isChapterExist || scriptureHelper == undefined)
    //Since ts wants to manuel check scriptureHelper again.

    return (
      <ChapterPageNotFoundComponent
        scriptureCode={scriptureCodeParam}
        sectionNumber={sectionNumberParam}
        chapterNumber={chapterNumberParam}
      />
    );

  if (isLoading) return <LoadingSpinnerFullHeight />;

  if (chapter == null || isNoAuthenticationRequestErrorCode(chapter))
    //TODO: Amend.
    return getErrorComponent({
      code: chapter,
      preferredErrorComponent: {
        [NOT_FOUND_HTTP_RESPONSE_CODE]: (
          <ChapterPageNotFoundComponent
            scriptureCode={scriptureCodeParam}
            sectionNumber={sectionNumberParam}
            chapterNumber={chapterNumberParam}
          />
        ),
      },
    });

  const preferredTranslations = new Set<Translation>([
    ...scriptureHelper
      .getTranslations()
      .filter((t) =>
        preference.getPreferredTranslationIdMultiple().has(t.getId())
      ),
  ]); // Impossible to exist. Since default translationId is id of a Translation that every verse has translationText of it.

  return (
    <Fragment>
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -30 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-200 pt-6 pb-16 max-w-5xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col justify-center items-center sm:block"
      >
        <div className="w-full flex justify-center sm:block">
          <BreadCrumbs chapter={chapter} />
        </div>

        <Header chapter={chapter} />

        <VerseContainer
          chapter={chapter}
          preferredTranslations={preferredTranslations}
          scriptureHelper={scriptureHelper}
          preference={preference}
          functionWhichOpensTranslationModal={() =>
            setIsTranslationModelOpen(true)
          }
          functionWhichOpensSettingsModal={() => setIsSettingsModelOpen(true)}
          functionWhichOpensShareModal={() => setIsShareModalOpen(true)}
          functionWhichSetsShareText={(shareText: string) =>
            setShareText(shareText)
          }
          functionWhichOpensShareModel={() => setIsShareModalOpen(true)}
        />
      </motion.div>

      <Models
        isSettingsModelOpen={isSettingsModelOpen}
        setIsSettingsModelOpen={setIsSettingsModelOpen}
        isTranslationModelOpen={isTranslationModelOpen}
        setIsTranslationModelOpen={setIsTranslationModelOpen}
        isShareModalOpen={isShareModalOpen}
        setIsShareModalOpen={setIsShareModalOpen}
        shareText={shareText}
        setShareText={setShareText}
        preference={preference}
        setShowTranslations={setShowTranslations}
        setShowTransliterations={setShowTransliterations}
        setShowFootnotes={setShowFootnotes}
        setShowOriginalText={setShowOriginalText}
        setOriginalTextVariation={setOriginalTextVariation}
        setTranslationIdMultiple={setTranslationIdMultiple}
        scriptureHelper={scriptureHelper}
      />
    </Fragment>
  );
};

export default Main;
