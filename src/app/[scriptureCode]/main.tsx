"use client";

import { T_NoAuthenticationRequestErrorCode } from "@/types/response";
import { T_ScripturePageParams } from "@/types/types";
import { NextPage } from "next";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import ScripturePageNotFoundComponent from "./components/ScripturePageNotFoundComponent";
import { getErrorComponent } from "@/util/reactUtil";
import { ReactNode } from "react";
import {
  isNoAuthenticationRequestErrorCode,
  NOT_FOUND_HTTP_RESPONSE_CODE,
} from "@/util/constants";
import LoadingSpinnerFullHeight from "@/components/UI/LoadingSpinnerFullHeight";
import { ScriptureOneLevelLower } from "@/types/classes/model/Scripture/ScriptureLower/ScriptureOneLevelLower/ScriptureOneLevelLower";
import { ScriptureHelperCollection } from "@/types/classes/client/ScriptureHelper/ScriptureHelperCollection";
import BreadCrumbs from "./components/Breadcrumbs";
import { fetchScripture } from "./utils/fetchScripture";
import Header from "./components/Header";
import SectionBoxes from "./components/SectionBoxes";

const Main: NextPage = (): ReactNode => {
  const { scriptureCode: scriptureCodeParam } =
    useParams<T_ScripturePageParams>();

  const scriptureDetail =
    new ScriptureHelperCollection().getScriptureHelperIfExist(
      scriptureCodeParam
    );

  const { data: scripture = null, isLoading } = useQuery<
    ScriptureOneLevelLower | T_NoAuthenticationRequestErrorCode | null
  >({
    queryKey: ["scripture-page", scriptureCodeParam],
    queryFn: async () => await fetchScripture(scriptureDetail),
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  if (isLoading) return <LoadingSpinnerFullHeight />;

  if (scriptureDetail === null)
    return (
      <ScripturePageNotFoundComponent scriptureCodeParam={scriptureCodeParam} />
    );

  if (scripture === null || isNoAuthenticationRequestErrorCode(scripture))
    return getErrorComponent({
      code: scripture,
      preferredErrorComponent: {
        [NOT_FOUND_HTTP_RESPONSE_CODE]: (
          <ScripturePageNotFoundComponent
            scriptureCodeParam={scriptureCodeParam}
          />
        ),
      },
    });

  return (
    <motion.main
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="bg-white dark:bg-black w-full px-3 sm:px-6 lg:px-8 pt-6 sm:pt-8 sm:pb-16 max-w-screen-lg xl:max-w-screen-xl mx-auto space-y-6 sm:space-y-8"
      aria-labelledby="scripture-page-main"
    >
      <div className="w-full flex justify-center sm:block sm:w-auto">
        <BreadCrumbs scripture={scripture} />
      </div>
      <Header scripture={scripture} />

      <SectionBoxes scripture={scripture} />
    </motion.main>
  );
};

export default Main;
