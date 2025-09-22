"use client";
import { T_NoAuthenticationRequestErrorCode } from "@/types/response";
import { T_SectionPageParams } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { NextPage } from "next";
import { useParams } from "next/navigation";
import { ReactNode } from "react";
import { motion } from "framer-motion";
import SectionPageNotFoundComponent from "./components/SectionPageNotFoundComponent";
import { getErrorComponent } from "@/util/reactUtil";

import {
  isNoAuthenticationRequestErrorCode,
  NOT_FOUND_HTTP_RESPONSE_CODE,
} from "@/util/constants";
import LoadingSpinnerFullHeight from "@/components/UI/LoadingSpinnerFullHeight";
import { SectionOneLevelBoth } from "@/types/classes/model/Section/Section/SectionBoth/SectionOneLevelBoth/SectionOneLevelBoth";
import { ScriptureHelperCollection } from "@/types/classes/client/ScriptureHelper/ScriptureHelperCollection";
import BreadCrumbs from "./components/BreadCrumbs";
import Header from "./components/Header";
import ChapterBoxes from "./components/ChapterBoxes";
import { fetchSection } from "./utils/fetchSection";

const Main: NextPage = (): ReactNode => {
  const {
    scriptureCode: scriptureCodeParam,
    sectionNumber: sectionNumberParam,
  } = useParams<T_SectionPageParams>();

  const scriptureHelper =
    new ScriptureHelperCollection().getScriptureHelperIfExist(
      scriptureCodeParam
    );

  const isSectionExists =
    scriptureHelper !== undefined &&
    scriptureHelper.isSectionExists(Number(sectionNumberParam));

  const { data: section = null, isLoading } = useQuery<
    SectionOneLevelBoth | T_NoAuthenticationRequestErrorCode | null
  >({
    queryKey: ["section-page", scriptureCodeParam, sectionNumberParam],
    queryFn: async () =>
      await fetchSection(scriptureHelper, sectionNumberParam),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    enabled: isSectionExists,
  });

  if (!isSectionExists || scriptureHelper == undefined)
    //Since ts wants to manuel check scriptureHelper again.

    return (
      <SectionPageNotFoundComponent
        scriptureCode={scriptureCodeParam}
        sectionNumber={sectionNumberParam}
      />
    );

  if (isLoading) return <LoadingSpinnerFullHeight />;

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

  return (
    <motion.main
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="min-h-[calc(100vh-130px)] bg-white dark:bg-black w-full px-3 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-[calc(64px+env(safe-area-inset-bottom))] sm:pb-16 max-w-screen-lg xl:max-w-screen-xl mx-auto space-y-6 sm:space-y-8"
      aria-labelledby="section-page-title"
    >
      <div className="w-full flex justify-center sm:block sm:w-auto">
        <BreadCrumbs section={section} />
      </div>
      <Header section={section} />

      <ChapterBoxes section={section} />
    </motion.main>
  );
};
export default Main;
