"use client";

import { NoAuthenticationRequestErrorCode, Response } from "@/types/response";
import { T_ScripturePageParams, T_ValidScriptureCode } from "@/types/types";
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
import axios from "axios";
import { NextPage } from "next";
import { useParams } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Breadcrumbs, BreadcrumbItem } from "@heroui/breadcrumbs";
import TooManyRequest from "@/components/UI/TooManyRequest";
import ServerError from "@/components/UI/ServerError";
import LoadingSpinnerFullH from "@/components/UI/LoadingSpinnerFullH";
import ScripturePageNotFoundComponent from "@/components/ScripturePageNotFoundComponent";
import ScripturePageSectionBlockComponent from "@/components/ScripturePageSectionBlockComponent";
import { addToast } from "@heroui/toast";
import {
  ScriptureDetails,
  ScriptureOneLevelLowerDTO,
} from "@/types/classes/Scripture";

const fetchScripture = async (
  scripture: Readonly<ScriptureDetails> | null,
  setStateActionFunctionForSetError: Dispatch<
    SetStateAction<NoAuthenticationRequestErrorCode | undefined>
  >
) => {
  if (scripture == null) {
    setStateActionFunctionForSetError(INTERNAL_SERVER_ERROR_RESPONSE_CODE);
    return null;
  }

  try {
    const response = await axios.get<Response<ScriptureOneLevelLowerDTO>>(
      `/verse/${scripture.getNumber()}`
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

interface Props {}

const Page: NextPage<Props> = ({}) => {
  const [error, setError] = useState<
    NoAuthenticationRequestErrorCode | undefined
  >(undefined);

  const { scriptureCode: scriptureCodeParam } =
    useParams<T_ScripturePageParams>();

  const scripture: Readonly<ScriptureDetails> | null =
    getScriptureIfCodeIsValid(scriptureCodeParam);

  const { data: scriptureFetched = null, isLoading } =
    useQuery<ScriptureOneLevelLowerDTO | null>({
      queryKey: ["scripture-page", scriptureCodeParam],
      queryFn: async () => await fetchScripture(scripture, setError),
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    });

  if (isLoading) return <LoadingSpinnerFullH />;

  if (
    (error && error === NOT_FOUND_RESPONSE_CODE) ||
    scripture == undefined ||
    scriptureFetched == null
  )
    return (
      <ScripturePageNotFoundComponent scriptureCode={scriptureCodeParam} />
    );

  if (error && error === TOO_MANY_REQUEST_RESPONSE_CODE)
    return <TooManyRequest />;

  if (error && error === INTERNAL_SERVER_ERROR_RESPONSE_CODE)
    return <ServerError />;

  const scriptureCode: T_ValidScriptureCode = scripture.getCode();

  const scriptureMeaning: string =
    scriptureFetched
      .getMeanings()
      .find((e) => e.getLanguage().getLangCode() == DEFAULT_LANG_CODE)
      ?.getText() ?? "Torah";

  const scriptureNameInOwnLanguage = scriptureFetched.getName();

  const sections = scriptureFetched.getSections();
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="bg-white dark:bg-black pt-6 pb-16"
    >
      <div className="max-w-5xl mx-auto px-4">
        <div className="my-4">
          <Breadcrumbs size="lg">
            <BreadcrumbItem href="/">Home</BreadcrumbItem>
            <BreadcrumbItem href={`${PROJECT_URL}/${scriptureCode}`}>
              {scriptureMeaning} ({scriptureNameInOwnLanguage})
            </BreadcrumbItem>
          </Breadcrumbs>
        </div>

        <motion.h1
          className="text-center text-3xl py-5 font-bold mb-4 dark:text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {scriptureMeaning} ({scriptureNameInOwnLanguage})
        </motion.h1>

        <p className="text-center text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-8">
          Select a section to read.
        </p>

        <motion.div
          className="grid grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, scale: 0.95 },
            visible: {
              opacity: 1,
              scale: 1,
              transition: {
                staggerChildren: 0.038,
              },
            },
          }}
        >
          {sections.map((section, i) => (
            <ScripturePageSectionBlockComponent
              key={`section-${i}`}
              index={i}
              section={section}
              scriptureCode={scriptureCode}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Page;
