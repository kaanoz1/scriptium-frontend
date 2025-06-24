"use client";

import { Response, T_NoAuthenticationRequestErrorCode } from "@/types/response";
import { T_ChapterPageParams, T_ScriptureCode } from "@/types/types";
import { DEFAULT_LANG_CODE, SOMETHING_WENT_WRONG_TOAST } from "@/util/utils";
import { useQuery } from "@tanstack/react-query";
import { NextPage } from "next";
import { useParams } from "next/navigation";
import { Fragment, ReactNode, useState } from "react";
import { motion } from "framer-motion";
import { BreadcrumbItem, Breadcrumbs } from "@heroui/breadcrumbs";
import ChapterVerse from "@/app/[scriptureCode]/[sectionNumber]/[chapterNumber]/components/ChapterVerse";
import axiosNoCredentialInstance from "@/client/axiosNoCredentialInstance";
import VerseAndChapterPageSettingsModel from "@/components/VerseAndChapterPageSettingsModel";
import ChapterPageTranslationModel from "@/app/[scriptureCode]/[sectionNumber]/[chapterNumber]/components/ChapterPageTranslationModel";
import ChapterPageShareModal from "@/app/[scriptureCode]/[sectionNumber]/[chapterNumber]/components/ChapterPageShareModal";
import LoadingSpinnerFullH from "@/components/UI/LoadingSpinnerFullH";
import ChapterPageNotFoundComponent from "@/app/[scriptureCode]/[sectionNumber]/[chapterNumber]/components/ChapterPageNotFoundComponent";
import { addToast } from "@heroui/toast";
import axios from "axios";
import { getErrorComponent } from "@/util/reactUtil";
import {
  ChapterUpperAndOneLevelLowerDTO,
  T_ChapterUpperAndOneLevelLowerDTOConstructorParametersJSON,
} from "@/types/classes/Chapter";
import { useScripturePreferences } from "@/hooks/useScripture";
import ChapterPageTranslatorsIndicator from "@/app/[scriptureCode]/[sectionNumber]/[chapterNumber]/components/ChapterPageTranslatorsIndicator";
import { TranslationDTO } from "@/types/classes/Translation";
import ChapterPageTools from "@/app/[scriptureCode]/[sectionNumber]/[chapterNumber]/components/ChapterPageTools";
import {
  isNoAuthenticationRequestErrorCode,
  NOT_FOUND_HTTP_RESPONSE_CODE,
  PROJECT_URL,
  OK_HTTP_RESPONSE_CODE,
  INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE,
} from "@/util/constants";
import { getScriptureIfCodeIsValid } from "@/util/func";
import { ScriptureDetail } from "@/util/scriptureDetails";

interface Props {}

const Page: NextPage<Props> = ({}): ReactNode => {
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

  const scriptureDetail: Readonly<ScriptureDetail> | null =
    getScriptureIfCodeIsValid(scriptureCodeParam);

  const {
    preference,
    setOriginalTextVariation,
    setShowOriginalText,
    setShowTransliterations,
    setShowTranslations,
    setShowFootnotes,
    setTranslationIdMultiple,
  } = useScripturePreferences(scriptureDetail?.getCode()); //TODO: Amend

  const { data: chapter = null, isLoading } = useQuery<
    ChapterUpperAndOneLevelLowerDTO | T_NoAuthenticationRequestErrorCode | null
  >({
    queryKey: [
      "chapter-page",
      scriptureCodeParam,
      sectionNumberParam,
      chapterNumberParam,
    ],
    queryFn: async () =>
      await fetchChapter(
        scriptureDetail,
        sectionNumberParam,
        chapterNumberParam
      ),
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  if (isLoading) return <LoadingSpinnerFullH />;

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

  if (scriptureDetail == null) {
    return getErrorComponent({
      code: NOT_FOUND_HTTP_RESPONSE_CODE,
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
  }

  const chapterNumber = chapter.getNumber();
  const verses = chapter.getVerses();

  const section = chapter.getSection();
  const sectionNumber = section.getNumber();
  const sectionNameInOwnLanguage = section.getName();
  const sectionMeaning: string =
    section.getMeaningTextOrDefault(DEFAULT_LANG_CODE);

  const scripture = section.getScripture();
  const scriptureNameInOwnLanguage = scripture.getName();
  const scriptureMeaning: string =
    scripture.getMeaningTextOrDefault(DEFAULT_LANG_CODE);
  const scriptureCode: T_ScriptureCode = scripture.getCode();

  const preferredTranslations = new Set<TranslationDTO>([
    ...scriptureDetail
      .getTranslations()
      .filter((t) =>
        preference.getPreferredTranslationIdMultiple().has(t.getId())
      ),
  ]); // Impossible to exist. Since default translationId is id of a Translation that ever verse has translationText of it.

  return (
    <Fragment>
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -30 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="min-h-screen bg-white dark:bg-black/80 text-gray-900 dark:text-gray-200 transition-colors duration-300 pt-6 pb-16"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="my-4 flex justify-between">
            <Breadcrumbs size="lg">
              <BreadcrumbItem href="/">Home</BreadcrumbItem>
              <BreadcrumbItem href={`${PROJECT_URL}/${scriptureCode}`}>
                {scriptureMeaning} ({scriptureNameInOwnLanguage})
              </BreadcrumbItem>
              <BreadcrumbItem
                href={`${PROJECT_URL}/${scriptureCode}/${sectionNumber}`}
              >
                {sectionMeaning} ({sectionNameInOwnLanguage})
              </BreadcrumbItem>
              <BreadcrumbItem>Chapter {chapterNumber}</BreadcrumbItem>
            </Breadcrumbs>
          </div>

          <motion.h1
            className="text-center text-3xl py-5 sm:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {sectionMeaning} {chapterNumber}
          </motion.h1>

          <div className="flex flex-col">
            <div className="flex justify-center w-full py-1.5 px-2.5 rounded-t-lg border border-neutral-300 dark:border-gray-600 bg-white dark:bg-neutral-900">
              <div className="w-full flex justify-between items-center px-1">
                <ChapterPageTranslatorsIndicator
                  preferredTranslations={preferredTranslations}
                />
                <ChapterPageTools
                  chapter={chapter}
                  functionWhichOpensTranslationModal={() =>
                    setIsTranslationModelOpen(true)
                  }
                  functionWhichOpensSettingsModal={() =>
                    setIsSettingsModelOpen(true)
                  }
                  functionWhichOpensShareModal={() => setIsShareModalOpen(true)}
                  scriptureDetail={scriptureDetail!}
                  shareTextSetStateFunction={setShareText}
                />
              </div>
            </div>

            {verses.map((v) => (
              <ChapterVerse
                key={v.getId()}
                verse={v}
                scriptureDetail={scriptureDetail}
                chapter={chapter}
                functionWhichOpensShareModel={() => setIsShareModalOpen(true)}
                preference={preference}
                setStateActionFunctionForShareText={setShareText}
              />
            ))}
          </div>
        </div>
      </motion.div>

      <VerseAndChapterPageSettingsModel
        isSettingsModelOpen={isSettingsModelOpen}
        setIsSettingsModelOpen={setIsSettingsModelOpen}
        scriptureDetail={scriptureDetail}
        preference={preference}
        setShowTranslation={setShowTranslations}
        setShowTransliteration={setShowTransliterations}
        setShowFootnotes={setShowFootnotes}
        setShowOriginalText={setShowOriginalText}
        setOriginalTextVariation={setOriginalTextVariation}
      />
      <ChapterPageTranslationModel
        isModalOpen={isTranslationModelOpen}
        setIsModalOpen={setIsTranslationModelOpen}
        scriptureDetail={scriptureDetail}
        preference={preference}
        setTranslationIdMultiple={setTranslationIdMultiple}
      />

      <ChapterPageShareModal
        isModalOpen={isShareModalOpen}
        setIsModalOpen={setIsShareModalOpen}
        shareText={shareText}
        stateControlFunctionOfShareText={setShareText}
        handleShareFunction={handleShare}
      />
    </Fragment>
  );
};

export default Page;

const fetchChapter = async (
  scriptureDetail: Readonly<ScriptureDetail> | null,
  sectionNumber: string | number,
  chapterNumber: string | number
): Promise<
  ChapterUpperAndOneLevelLowerDTO | T_NoAuthenticationRequestErrorCode
> => {
  const parsedSectionNumber = Number(sectionNumber);
  const parsedChapterNumber = Number(chapterNumber);

  if (
    scriptureDetail == null ||
    Number.isNaN(parsedSectionNumber) ||
    Number.isNaN(parsedChapterNumber)
  )
    return NOT_FOUND_HTTP_RESPONSE_CODE;

  const scriptureNumber = scriptureDetail.getNumber();

  try {
    const response = await axiosNoCredentialInstance.get<
      Response<T_ChapterUpperAndOneLevelLowerDTOConstructorParametersJSON>
    >(
      `/verse/${scriptureNumber}/${parsedSectionNumber}/${parsedChapterNumber}`
    );

    if (response.status === OK_HTTP_RESPONSE_CODE)
      return ChapterUpperAndOneLevelLowerDTO.createFromJSON(response.data.data);

    throw new Error("Unexpected result. Status: " + response.status);
  } catch (error) {
    addToast(SOMETHING_WENT_WRONG_TOAST);
    console.error(error);

    if (
      !axios.isAxiosError(error) ||
      !error.response ||
      !isNoAuthenticationRequestErrorCode(error.response.status)
    )
      return INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE;

    return error.response.status;
  }
};

const handleShare = (platform: string) => {
  console.log(`Sharing content to: ${platform}`);
  //TODO: Will be implemented.
};
