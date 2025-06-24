"use client";

import { Response, T_NoAuthenticationRequestErrorCode } from "@/types/response";
import { T_ScriptureCode, T_ScripturePageParams } from "@/types/types";
import { DEFAULT_LANG_CODE, SOMETHING_WENT_WRONG_TOAST } from "@/util/utils";
import axios from "axios";
import { NextPage } from "next";
import { useParams } from "next/navigation";
import { motion, Variants } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { BreadcrumbItem, Breadcrumbs } from "@heroui/breadcrumbs";
import LoadingSpinnerFullH from "@/components/UI/LoadingSpinnerFullH";
import ScripturePageNotFoundComponent from "@/components/ScripturePageNotFoundComponent";
import ScripturePageSectionBlockComponent from "@/components/ScripturePageSectionBlockComponent";
import { addToast } from "@heroui/toast";
import {
  ScriptureDetail,
  ScriptureOneLevelLowerDTO,
  T_ScriptureOneLevelLowerDTOConstructorParametersJSON,
} from "@/types/classes/Scripture";
import axiosNoCredentialInstance from "@/client/axiosNoCredentialInstance";
import { getErrorComponent } from "@/util/reactUtil";
import { ReactNode } from "react";
import {
  INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE,
  isNoAuthenticationRequestErrorCode,
  NOT_FOUND_HTTP_RESPONSE_CODE,
  OK_HTTP_RESPONSE_CODE,
  PROJECT_URL,
} from "@/util/constants";
import { getScriptureIfCodeIsValid } from "@/util/scriptureDetails";

interface Props {}

const Page: NextPage<Props> = ({}): ReactNode => {
  const { scriptureCode: scriptureCodeParam } =
    useParams<T_ScripturePageParams>();

  const scriptureDetail: Readonly<ScriptureDetail> | null =
    getScriptureIfCodeIsValid(scriptureCodeParam);

  const { data: scripture = null, isLoading } = useQuery<
    ScriptureOneLevelLowerDTO | T_NoAuthenticationRequestErrorCode | null
  >({
    queryKey: ["scripture-page", scriptureCodeParam],
    queryFn: async () => await fetchScripture(scriptureDetail),
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  if (isLoading) return <LoadingSpinnerFullH />;

  if (scripture === null || isNoAuthenticationRequestErrorCode(scripture))
    //Here
    return getErrorComponent({
      code: scripture,
      preferredErrorComponent: {
        [NOT_FOUND_HTTP_RESPONSE_CODE]: (
          <ScripturePageNotFoundComponent scriptureCode={scriptureCodeParam} />
        ),
      },
    });

  if (scriptureDetail === null)
    return (
      <ScripturePageNotFoundComponent scriptureCode={scriptureCodeParam} />
    );

  const scriptureCode: T_ScriptureCode = scripture.getCode();
  const scriptureMeaning: string =
    scripture.getMeaningTextOrDefault(DEFAULT_LANG_CODE);
  const scriptureNameInOwnLanguage = scripture.getName();
  const sections = scripture.getSections();
  const breadCrumbText: string = scriptureMeaning.concat(
    " ",
    "(",
    scriptureNameInOwnLanguage,
    ")"
  );
  const headerText: string = scriptureMeaning.concat(
    " ",
    "(",
    scriptureNameInOwnLanguage,
    ")"
  );
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
              {breadCrumbText}
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
          Select a section to read.
        </p>

        <motion.div
          className="grid grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={SECTION_WRAPPER_VARIANTS}
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

// Utils:

const fetchScripture = async (
  scripture: Readonly<ScriptureDetail> | null
): Promise<ScriptureOneLevelLowerDTO | T_NoAuthenticationRequestErrorCode> => {
  if (scripture == null) return NOT_FOUND_HTTP_RESPONSE_CODE;

  const scriptureNumber = scripture.getNumber();

  try {
    const response = await axiosNoCredentialInstance.get<
      Response<T_ScriptureOneLevelLowerDTOConstructorParametersJSON>
    >(`/verse/${scriptureNumber}`);

    if (response.status === OK_HTTP_RESPONSE_CODE)
      return ScriptureOneLevelLowerDTO.createFromJSON(response.data.data);

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

const SECTION_WRAPPER_VARIANTS: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.038,
    },
  },
};
