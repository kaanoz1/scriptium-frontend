"use client";

import { NoAuthenticationRequestErrorCode, Response } from "@/types/response";
import {
  AvailableScriptureKey,
  ScripturePageParams,
  ScriptureDTO,
  ScriptureDetails,
} from "@/types/types";
import {
  DEFAULT_LANG_CODE,
  getScripture,
  INTERNAL_SERVER_ERROR_RESPONSE_CODE,
  NOT_FOUND_RESPONSE_CODE,
  OK_RESPONSE_CODE,
  PROJECT_URL, SOMETHING_WENT_WRONG_TOAST,
  TOO_MANY_REQUEST_RESPONSE_CODE,
} from "@/util/utils";
import axios from "axios";
import { NextPage } from "next";
import { useParams } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Breadcrumbs, BreadcrumbItem } from "@heroui/breadcrumbs";
import TooManyRequest from "@/components/UI/TooManyRequest";
import ServerError from "@/components/UI/ServerError";
import LoadingSpinnerFullH from "@/components/UI/LoadingSpinnerFullH";
import ScripturePageNotFoundComponent from "@/components/ScripturePageNotFoundComponent";
import ScripturePageSectionBlockComponent from "@/components/ScripturePageSectionBlockComponent";
import {addToast} from "@heroui/toast";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  const [error, setError] = useState<
    NoAuthenticationRequestErrorCode | undefined
  >(undefined);

  const { scriptureCode: scriptureCodeParam } =
    useParams<ScripturePageParams>();

  const scripture: ScriptureDetails | undefined =
    getScripture(scriptureCodeParam);

  const fetchScripture = async () => {
    if (scripture == undefined) {
      setError(INTERNAL_SERVER_ERROR_RESPONSE_CODE);
      return null;
    }

    try {
      const response = await axios.get<Response<ScriptureDTO>>(
        `/verse/${scripture.number}`
      );

      switch (response.status) {
        case OK_RESPONSE_CODE:
          setError(undefined);
          return response.data.data;
        case NOT_FOUND_RESPONSE_CODE:
          setError(NOT_FOUND_RESPONSE_CODE);
          return null;
        case TOO_MANY_REQUEST_RESPONSE_CODE:
          setError(TOO_MANY_REQUEST_RESPONSE_CODE);
          return null;
        default:
          setError(INTERNAL_SERVER_ERROR_RESPONSE_CODE);
          return null;
      }
    } catch (error) {
      addToast(SOMETHING_WENT_WRONG_TOAST);
      console.error(error);
      setError(INTERNAL_SERVER_ERROR_RESPONSE_CODE);
      return null;
    }
  };

  const { data: scriptureFetched = null, isLoading } =
    useQuery<ScriptureDTO | null>({
      queryKey: ["scripture-page", scriptureCodeParam],
      queryFn: async () => await fetchScripture(),
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

  const scriptureCode: AvailableScriptureKey = scripture.code;

  const scriptureMeaning: string =
    scriptureFetched.meanings.find(
      (e) => e.language.langCode == DEFAULT_LANG_CODE
    )?.meaning ?? "Torah";

  const scriptureNameInOwnLanguage = scriptureFetched.name;

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
          {scriptureFetched.sections.map((section, i) => (
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
