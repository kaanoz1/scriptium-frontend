"use client";
import { Response, T_NoAuthenticationRequestErrorCode } from "@/types/response";
import { T_ScriptureCode, T_SectionPageParams } from "@/types/types";
import { DEFAULT_LANG_CODE, SOMETHING_WENT_WRONG_TOAST } from "@/util/utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { NextPage } from "next";
import { useParams } from "next/navigation";
import { Fragment, ReactNode } from "react";
import { motion, Variants } from "framer-motion";
import { BreadcrumbItem, Breadcrumbs } from "@heroui/breadcrumbs";
import LoadingSpinnerFullH from "@/components/UI/LoadingSpinnerFullH";
import SectionPageNotFoundComponent from "@/components/SectionPageNotFoundComponent";
import SectionPageChapterBlockComponent from "@/components/SectionPageChapterBlockComponent";
import { addToast } from "@heroui/toast";
import { getErrorComponent } from "@/util/reactUtil";
import axiosNoCredentialInstance from "@/client/axiosNoCredentialInstance";
import { ScriptureDetail } from "@/types/classes/Scripture";
import {
  SectionOneLevelBothDTO,
  T_SectionOneLevelBothDTOConstructorParametersJSON,
} from "@/types/classes/Section";
import {
  isNoAuthenticationRequestErrorCode,
  NOT_FOUND_HTTP_RESPONSE_CODE,
  PROJECT_URL,
  OK_HTTP_RESPONSE_CODE,
  INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE,
} from "@/util/constants";
import { getScriptureIfCodeIsValid } from "@/util/scriptureDetails";

const Page: NextPage = (): ReactNode => {
  const {
    scriptureCode: scriptureCodeParam,
    sectionNumber: sectionNumberParam,
  } = useParams<T_SectionPageParams>();

  const scriptureDetail: Readonly<ScriptureDetail> | null =
    getScriptureIfCodeIsValid(scriptureCodeParam);

  const { data: section = null, isLoading } = useQuery<
    SectionOneLevelBothDTO | T_NoAuthenticationRequestErrorCode | null
  >({
    queryKey: ["section-page", scriptureCodeParam, sectionNumberParam],
    queryFn: async () =>
      await fetchSection(scriptureDetail, sectionNumberParam),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <LoadingSpinnerFullH />;

  if (section == null || isNoAuthenticationRequestErrorCode(section))
    return getErrorComponent({
      code: section,
      preferredErrorComponent: {
        [NOT_FOUND_HTTP_RESPONSE_CODE]: (
          <SectionPageNotFoundComponent
            scriptureCode={scriptureCodeParam}
            sectionNumber={sectionNumberParam}
          />
        ),
      },
    });

  const scripture = section.getScripture();
  const scriptureMeaning: string =
    scripture.getMeaningTextOrDefault(DEFAULT_LANG_CODE);
  const scriptureCode: T_ScriptureCode = scripture.getCode();
  const scriptureNameInOwnLanguage: string = section.getScripture().getName();
  const sectionMeaning: string =
    section.getMeaningTextOrDefault(DEFAULT_LANG_CODE);
  const sectionNumber = section.getNumber();
  const sectionNameInOwnLanguage: string = section.getName();
  const chapterCount: number = section.getChapterCount();
  const breadCrumbTextForScripture: string = scriptureMeaning.concat(
    " ",
    "(",
    scriptureNameInOwnLanguage,
    ")"
  );
  const breadCrumbTextForSection: string = sectionMeaning.concat(
    " ",
    "(",
    sectionNameInOwnLanguage,
    ")"
  );
  const headerText: string = sectionMeaning.concat(
    " ",
    "(",
    sectionNameInOwnLanguage,
    ")"
  );

  return (
    <Fragment>
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -30 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="min-h-screen bg-white dark:bg-black pt-6 pb-16"
      >
        <div className="max-w-5xl mx-auto px-4">
          <div className="my-4">
            <Breadcrumbs size="lg">
              <BreadcrumbItem href="/">Home</BreadcrumbItem>
              <BreadcrumbItem href={`${PROJECT_URL}/${scriptureCode}`}>
                {breadCrumbTextForScripture}
              </BreadcrumbItem>
              <BreadcrumbItem href={`${PROJECT_URL}/${scriptureCode}`}>
                {breadCrumbTextForSection}
              </BreadcrumbItem>
            </Breadcrumbs>
          </div>

          <motion.h1
            className="text-center text-3xl py-5 font-bold mb-4 dark:text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {headerText}
          </motion.h1>

          <p className="text-center text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            Select a chapter to read.
          </p>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-6"
            initial="hidden"
            animate="visible"
            variants={CHAPTER_WRAPPER_VARIANTS}
          >
            {Array.from({ length: chapterCount }, (_, i) => i + 1).map(
              (chapterNumber, i) => (
                <SectionPageChapterBlockComponent
                  key={`chapter-${i}`}
                  scriptureCode={scriptureCode}
                  sectionNumber={sectionNumber}
                  chapterNumber={chapterNumber}
                />
              )
            )}
          </motion.div>
        </div>
      </motion.div>
    </Fragment>
  );
};
export default Page;

// Utils:

const CHAPTER_WRAPPER_VARIANTS: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.019,
    },
  },
};

const fetchSection = async (
  scripture: Readonly<ScriptureDetail> | null,
  sectionNumber: number | string
): Promise<SectionOneLevelBothDTO | T_NoAuthenticationRequestErrorCode> => {
  const parsedSectionNumber = Number(sectionNumber);

  if (scripture == null || Number.isNaN(parsedSectionNumber))
    return NOT_FOUND_HTTP_RESPONSE_CODE;

  const scriptureNumber = scripture.getNumber();

  try {
    const response = await axiosNoCredentialInstance.get<
      Response<T_SectionOneLevelBothDTOConstructorParametersJSON>
    >(`/verse/${scriptureNumber}/${sectionNumber}`);

    if (response.status === OK_HTTP_RESPONSE_CODE)
      return SectionOneLevelBothDTO.createFromJSON(response.data.data);

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
