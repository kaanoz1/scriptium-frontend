"use client";
import ServerError from "@/components/UI/ServerError";
import TooManyRequest from "@/components/UI/TooManyRequest";
import { NoAuthenticationRequestErrorCode, Response } from "@/types/response";
import { T_SectionPageParams, T_ValidScriptureCode } from "@/types/types";
import {
  DEFAULT_LANG_CODE,
  getScriptureIfCodeIsValid,
  INTERNAL_SERVER_ERROR_RESPONSE_CODE,
  NOT_FOUND_RESPONSE_CODE,
  OK_RESPONSE_CODE,
  PROJECT_URL,
  SOMETHING_WENT_WRONG_TOAST,
  TOO_MANY_REQUEST_RESPONSE_CODE,
} from "@/util/utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { NextPage } from "next";
import { useParams } from "next/navigation";
import { Dispatch, Fragment, SetStateAction, useState } from "react";
import { motion } from "framer-motion";
import { BreadcrumbItem, Breadcrumbs } from "@heroui/breadcrumbs";
import LoadingSpinnerFullH from "@/components/UI/LoadingSpinnerFullH";
import SectionPageNotFoundComponent from "@/components/SectionPageNotFoundComponent";
import SectionPageChapterBlockComponent from "@/components/SectionPageChapterBlockComponent";
import { addToast } from "@heroui/toast";
import { ScriptureDetails } from "@/types/classes/Scripture";
import { SectionUpperDTO } from "@/types/classes/Section";

const fetchSection = async (
  scripture: Readonly<ScriptureDetails> | null,
  sectionNumber: string | number,
  setStateActionFunctionForSetError: Dispatch<
    SetStateAction<NoAuthenticationRequestErrorCode | undefined>
  >
) => {
  const parsedSectionNumber = Number(sectionNumber);

  if (scripture == null || Number.isNaN(parsedSectionNumber)) {
    setStateActionFunctionForSetError(NOT_FOUND_RESPONSE_CODE);
    return null;
  }

  try {
    const response = await axios.get<Response<SectionUpperDTO>>(
      `/verse/${scripture.getNumber()}/${parsedSectionNumber}`
    );

    switch (response.status) {
      case OK_RESPONSE_CODE:
        setStateActionFunctionForSetError(undefined);
        return response.data.data;
      case NOT_FOUND_RESPONSE_CODE:
        setStateActionFunctionForSetError(NOT_FOUND_RESPONSE_CODE);
        return null;
      case TOO_MANY_REQUEST_RESPONSE_CODE:
        setStateActionFunctionForSetError(TOO_MANY_REQUEST_RESPONSE_CODE);
        return null;
      default:
        setStateActionFunctionForSetError(INTERNAL_SERVER_ERROR_RESPONSE_CODE);
        return null;
    }
  } catch (error) {
    addToast(SOMETHING_WENT_WRONG_TOAST);
    console.error(error);
    setStateActionFunctionForSetError(INTERNAL_SERVER_ERROR_RESPONSE_CODE);
    return null;
  }
};

const Page: NextPage = () => {
  const [error, setError] = useState<
    NoAuthenticationRequestErrorCode | undefined
  >(undefined);

  const {
    scriptureCode: scriptureCodeParam,
    sectionNumber: sectionNumberParam,
  } = useParams<T_SectionPageParams>();

  const scripture: Readonly<ScriptureDetails> | null =
    getScriptureIfCodeIsValid(scriptureCodeParam);

  const sectionNumber = parseInt(sectionNumberParam);

  const { data: section = null, isLoading } = useQuery<SectionUpperDTO | null>({
    queryKey: ["section-page", scriptureCodeParam, sectionNumberParam],
    queryFn: async () => await fetchSection(scripture, sectionNumber, setError),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <LoadingSpinnerFullH />;

  if (
    (error && error === NOT_FOUND_RESPONSE_CODE) ||
    scripture == undefined ||
    section == null
  ) {
    return (
      <SectionPageNotFoundComponent
        scriptureCode={scriptureCodeParam}
        sectionNumber={sectionNumberParam}
      />
    );
  }

  if (error && error === 429) return <TooManyRequest />;

  if (error && error === 500) return <ServerError />;

  const scriptureMeaning: string =
    section
      .getScripture()
      .getMeanings()
      .find((e) => e.getLanguage().getLangCode() === DEFAULT_LANG_CODE)
      ?.getText() ?? "Torah";

  const scriptureCode: T_ValidScriptureCode = scripture.getCode();

  const scriptureNameInOwnLanguage: string = section.getScripture().getName();

  const sectionMeaning: string =
    section
      .getMeanings()
      .find((e) => e.getLanguage().getLangCode() === DEFAULT_LANG_CODE)
      ?.getText() ?? "Section";

  const sectionNameInOwnLanguage: string = section.getName();

  const chapterCountInSection: number = 19; //TODO: Amend

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
                {scriptureMeaning} ({scriptureNameInOwnLanguage})
              </BreadcrumbItem>
              <BreadcrumbItem href={`${PROJECT_URL}/${scriptureCode}`}>
                {sectionMeaning} ({sectionNameInOwnLanguage})
              </BreadcrumbItem>
            </Breadcrumbs>
          </div>

          <motion.h1
            className="text-center text-3xl py-5 font-bold mb-4 dark:text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {sectionMeaning} ({sectionNameInOwnLanguage})
          </motion.h1>

          <p className="text-center text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            Select a chapter to read.
          </p>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, scale: 0.95 },
              visible: {
                opacity: 1,
                scale: 1,
                transition: {
                  staggerChildren: 0.019,
                },
              },
            }}
          >
            {Array.from({ length: chapterCountInSection }, (_, i) => i + 1).map(
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
