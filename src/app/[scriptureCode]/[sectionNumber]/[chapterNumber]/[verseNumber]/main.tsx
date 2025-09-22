"use client";
import { T_VersePageParams } from "@/types/types";

import { Divider } from "@heroui/divider";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { NextPage } from "next";
import { useParams } from "next/navigation";
import { Fragment, useState } from "react";
import VersePageNotFoundComponent from "@/app/[scriptureCode]/[sectionNumber]/[chapterNumber]/[verseNumber]/components/VersePageNotFoundComponent";

import { getErrorComponent } from "@/util/reactUtil";
import { useScripturePreferences } from "@/hooks/useScripture";
import {
  getShareTextOfVerse,
  isNoAuthenticationRequestErrorCode,
  NOT_FOUND_HTTP_RESPONSE_CODE,
} from "@/util/constants";
import Verse from "@/app/[scriptureCode]/[sectionNumber]/[chapterNumber]/[verseNumber]/verse/Verse";
import LoadingSpinnerFullHeight from "@/components/UI/LoadingSpinnerFullHeight";
import { ScriptureHelperCollection } from "@/types/classes/client/ScriptureHelper/ScriptureHelperCollection";
import Header from "./components/Header";
import WordSection from "./components/WordSection";
import Tabs from "./components/Tabs";
import fetchVerse from "./utils/fetchVerse";
import Models from "./components/Models";

const Main: NextPage = () => {
  const [shareText, setShareText] = useState<string>("");
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const [isTranslationModelOpen, setIsTranslationModelOpen] =
    useState<boolean>(false);
  const [isSettingsModelOpen, setIsSettingsModelOpen] =
    useState<boolean>(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [isCollectionModalOpen, setIsCollectionModalOpen] =
    useState<boolean>(false);

  const {
    scriptureCode: scriptureCodeParam,
    sectionNumber: sectionNumberParam,
    chapterNumber: chapterNumberParam,
    verseNumber: verseNumberParam,
  } = useParams<T_VersePageParams>();

  const scriptureHelper =
    new ScriptureHelperCollection().getScriptureHelperIfExist(
      scriptureCodeParam
    );

  const {
    preference,
    setTranslationIdMultiple,
    setShowTranslations,
    setShowTransliterations,
    setShowOriginalText,
    setOriginalTextVariation,
    setShowFootnotes,
  } = useScripturePreferences("t"); //TODO: Amend;

  const isVerseExist =
    scriptureHelper !== undefined &&
    scriptureHelper.isVerseExist(
      Number(sectionNumberParam),
      Number(chapterNumberParam),
      Number(verseNumberParam)
    );

  const { data: verse = null, isLoading } = useQuery({
    queryKey: [
      "verse-page",
      scriptureCodeParam,
      sectionNumberParam,
      chapterNumberParam,
      verseNumberParam,
    ],
    queryFn: async () =>
      await fetchVerse(
        scriptureHelper,
        sectionNumberParam,
        chapterNumberParam,
        verseNumberParam
      ),
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    enabled: isVerseExist,
  });

  // const { user, isUserLoading } = useUser();  // This context is currently disabled and not in use since this project does not have adequate financial resources to afford legal processes to store, maintain and protect user data.
  const user = null;
  const isUserLoading: boolean = false;
  //Placeholders for user context.

  if (!isVerseExist || scriptureHelper === undefined)
    //Since ts wants to manuel check scriptureHelper again.

    return (
      <VersePageNotFoundComponent
        scriptureCode={scriptureCodeParam}
        sectionNumber={sectionNumberParam}
        chapterNumber={chapterNumberParam}
        verseNumber={verseNumberParam}
      />
    );

  if (isLoading || isUserLoading) return <LoadingSpinnerFullHeight />;

  if (verse == null || isNoAuthenticationRequestErrorCode(verse))
    return getErrorComponent({
      code: verse,
      preferredErrorComponent: {
        [NOT_FOUND_HTTP_RESPONSE_CODE]: (
          <VersePageNotFoundComponent
            scriptureCode={scriptureCodeParam}
            sectionNumber={sectionNumberParam}
            chapterNumber={chapterNumberParam}
            verseNumber={verseNumberParam}
          />
        ),
      },
    });

  const options = preference.getOptions();

  const chapter = verse.getChapter();
  const section = chapter.getSection();
  const scripture = section.getScripture();
  const scriptureCode = scripture.getCode();

  const translationTexts = verse.getTranslationTexts();

  const textVariation = options.getVariation();

  const selectedTranslations =
    scriptureHelper.getSelectedTranslations(preference);

  return (
    <Fragment>
      <main className="bg-white dark:bg-black min-h-[60vh] sm:min-h-screen">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="w-full max-w-screen-lg xl:max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8 pt-6 sm:pt-8 pb-[calc(64px+env(safe-area-inset-bottom))] sm:pb-16 text-gray-900 dark:text-gray-200"
        >
          <Header
            verse={verse}
            isSaved={isSaved}
            scriptureHelper={scriptureHelper}
            functionThatMakesIsCollectionModelOpenStateTrue={() =>
              setIsCollectionModalOpen(true)
            }
            functionThatMakesIsTranslationModelOpenStateTrue={() =>
              setIsTranslationModelOpen(true)
            }
            functionThatMakesIsSettingsModelOpenStateTrue={() =>
              setIsSettingsModelOpen(true)
            }
            functionThatMakesIsShareModelOpenStateTrueAndSetsShareText={() => {
              setShareText(
                getShareTextOfVerse(
                  verse,
                  chapter,
                  verse.getTranslationTextOfTranslations(selectedTranslations)
                )
              );

              setIsShareModalOpen(true);
            }}
            setShareText={(shareText: string) => setShareText(shareText)}
          />

          <Divider className="my-4 sm:my-6 text-xss dark:opacity-25 opacity-75" />

          <div className="flex flex-col gap-8">
            <Verse
              verse={verse}
              selectedTranslations={selectedTranslations}
              preference={preference}
              showTranslationHeader
            />
            <div className="grid grid-cols-1 sm:[--left:30%] sm:[--right:70%] sm:[grid-template-columns:var(--left)_var(--right)] w-full pt-8 sm:pt-10 gap-6 lg:gap-10">
              <WordSection
                verse={verse}
                variation={textVariation}
                scriptureCode={scriptureCode}
              />

              <Tabs
                verse={verse}
                user={user}
                preference={preference}
                translationTexts={translationTexts}
              />
            </div>
          </div>
        </motion.div>
      </main>

      <Models
        isTranslationModelOpen={isTranslationModelOpen}
        preference={preference}
        scriptureHelper={scriptureHelper}
        setTranslationIdMultiple={setTranslationIdMultiple}
        isSettingsModelOpen={isSettingsModelOpen}
        setIsSettingsModelOpen={setIsSettingsModelOpen}
        setIsTranslationModelOpen={setIsTranslationModelOpen}
        setShowTranslations={setShowTranslations}
        setShowTransliterations={setShowTransliterations}
        setShowFootnotes={setShowFootnotes}
        setShowOriginalText={setShowOriginalText}
        setOriginalTextVariation={setOriginalTextVariation}
        isShareModalOpen={isShareModalOpen}
        setIsShareModalOpen={setIsShareModalOpen}
        shareText={shareText}
        setShareText={setShareText}
        isCollectionModalOpen={isCollectionModalOpen}
        setIsCollectionModalOpen={setIsCollectionModalOpen}
        setIsSaved={setIsSaved}
        verse={verse}
        user={user}
      />
    </Fragment>
  );
};

export default Main;
