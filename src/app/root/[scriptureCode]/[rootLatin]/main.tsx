"use client";
import React from "react";
import { T_RootPageParams } from "@/types/types";
import { NextPage } from "next";
import { useParams } from "next/navigation";
import { Fragment, useState } from "react";
import RootPageNotFoundComponent from "@/app/root/[scriptureCode]/[rootLatin]/components/RootPageNotFoundComponent";
import { useQuery } from "@tanstack/react-query";
import { T_NoAuthenticationRequestErrorCode } from "@/types/response";
import UIWrapper from "@/components/UI/UIWrapper";
import { IoSettingsOutline } from "react-icons/io5";
import { MdTranslate } from "react-icons/md";
import ChapterPageTranslationModel from "@/app/[scriptureCode]/[sectionNumber]/[chapterNumber]/components/ChapterPageTranslationModel";
import { Divider } from "@heroui/divider";
import Root from "@/app/root/[scriptureCode]/[rootLatin]/components/Root";
import { Accordion, AccordionItem } from "@heroui/accordion";

import { useScripturePreferences } from "@/hooks/useScripture";
import { getErrorComponent } from "@/util/reactUtil";
import {
  isNoAuthenticationRequestErrorCode,
  NOT_FOUND_HTTP_RESPONSE_CODE,
  DEFAULT_LANG_CODE,
} from "@/util/constants";

import ShareModel from "@/components/ShareModel";
import VerseAndChapterPageSettingsModel from "@/components/VerseAndChapterPageSettingsModel";
import LoadingSpinnerFullHeight from "@/components/UI/LoadingSpinnerFullHeight";
import { RootUpper } from "@/types/classes/model/Root/RootUpper/RootUpper";
import { WordUpper } from "@/types/classes/model/Word/Word/WordUpper/WordUpper";
import { ScriptureHelperCollection } from "@/types/classes/client/ScriptureHelper/ScriptureHelperCollection";
import fetchRoot from "./utils/fetchRoot";

const Main: NextPage = () => {
  const { rootLatin: rootLatinParam, scriptureCode: scriptureCodeParam } =
    useParams<T_RootPageParams>();

  const [isTranslationModelOpen, setIsTranslationModelOpen] =
    useState<boolean>(false);
  const [isSettingsModelOpen, setIsSettingsModelOpen] =
    useState<boolean>(false);

  const [shareText, setShareText] = useState<string>("");
  const [isShareModalOpen, setIsShareModelOpen] = useState<boolean>(false);

  const scriptureHelper =
    new ScriptureHelperCollection().getScriptureHelperIfExist(
      scriptureCodeParam
    );

  const { data: root = null, isLoading } = useQuery<
    RootUpper | T_NoAuthenticationRequestErrorCode | null
  >({
    queryKey: ["root", scriptureCodeParam, rootLatinParam],
    refetchOnWindowFocus: false,
    enabled: !!scriptureHelper,
    queryFn: async () => await fetchRoot(scriptureHelper, rootLatinParam),
  });

  const {
    preference,
    setOriginalTextVariation,
    setShowOriginalText,
    setShowTransliterations,
    setShowTranslations,
    setShowFootnotes,
    setTranslationIdMultiple,
  } = useScripturePreferences(scriptureHelper?.getCode());

  if (isLoading) return <LoadingSpinnerFullHeight />;

  if (root == null || isNoAuthenticationRequestErrorCode(root))
    return getErrorComponent({
      code: root,
      preferredErrorComponent: {
        [NOT_FOUND_HTTP_RESPONSE_CODE]: (
          <RootPageNotFoundComponent
            rootLatinParam={rootLatinParam}
            scriptureCodeParam={scriptureCodeParam}
          />
        ),
      },
    });

  if (scriptureHelper === undefined)
    return (
      <RootPageNotFoundComponent
        rootLatinParam={rootLatinParam}
        scriptureCodeParam={scriptureCodeParam}
      />
    );

  const rootTextInOwnLanguage: Readonly<string> = root.getOwn();
  const rootTextInLatin: Readonly<string> = root.getLatin();
  const verseCount: Readonly<number> = root.getWords().length;
  const words: ReadonlyArray<WordUpper> = root.getWords();

  const preferredFont = preference.getPreferredFont();
  return (
    <Fragment>
      <UIWrapper>
        <div className="w-full flex-col justify-center">
          <div className="w-full py-2 px-5 flex items-center justify-between">
            <div className="flex gap-2 items-center justify-start">
              <span className={`font-bold ${preferredFont} text-4xl`}>
                {rootTextInOwnLanguage}
              </span>
              <span>-</span>
              <span className="italic opacity-50">{rootTextInLatin}</span>
              <span className="italic opacity-50"> | </span>
              <span className="italic opacity-50">
                {verseCount} verses have found for including root{" "}
                {rootTextInOwnLanguage} - {rootTextInLatin}
              </span>
            </div>
            <div className="flex items-center gap-2 justify-evenly">
              <MdTranslate
                size={19}
                className="cursor-pointer hover:text-red-600 dark:hover:text-red-500 transition-colors"
                onClick={() => setIsTranslationModelOpen(true)}
              />
              <IoSettingsOutline
                size={19}
                className="cursor-pointer hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors"
                onClick={() => setIsSettingsModelOpen(true)}
              />
            </div>
          </div>

          <Divider className="w-full px-2" />
        </div>
        <Accordion selectionMode="multiple">
          {words.map((word, i) => {
            const verse = word.getVerse();

            const scriptureMeaning: Readonly<string> =
              verse
                .getChapter()
                .getSection()
                .getScripture()
                .getMeanings()
                .find(
                  (m) => m.getLanguage().getLangCode() === DEFAULT_LANG_CODE
                )
                ?.getText() ?? "Scripture";

            const sectionMeaning =
              verse
                .getChapter()
                .getSection()
                .getMeanings()
                .find(
                  (m) => m.getLanguage().getLangCode() === DEFAULT_LANG_CODE
                )
                ?.getText() ?? "Section";

            const chapterNumber = verse.getChapter().getNumber();
            const verseNumber = verse.getNumber();

            const wordText: string = word.getTextOfVariationOrUsual(
              preference.getOptions().getVariation()
            );

            const sequenceNumber = word.getSequenceNumber();

            return (
              <AccordionItem
                key={i}
                textValue={`${i}'th accordion.`}
                title={
                  <div className="w-full flex items-center">
                    <div>
                      <span>{i + 1}.</span> <span>{scriptureMeaning},</span>{" "}
                      <span>{sectionMeaning},</span>{" "}
                      <span>Chapter: {chapterNumber},</span>{" "}
                      <span>Verse: {verseNumber}</span> {" : "}
                      <span>{sequenceNumber}</span> <span>{" | "}</span>{" "}
                      <span className="text-xl">{wordText}</span>{" "}
                    </div>
                  </div>
                }
              >
                <Root
                  word={word}
                  variation={"usual"}
                  scriptureHelper={scriptureHelper}
                  preference={preference}
                  setStateFunctionOfShareText={setShareText}
                  setStateFunctionOfIsShareModelOpen={setIsShareModelOpen}
                />
              </AccordionItem>
            );
          })}
        </Accordion>
      </UIWrapper>

      <ChapterPageTranslationModel
        isModalOpen={isTranslationModelOpen}
        setIsModalOpen={setIsTranslationModelOpen}
        preference={preference}
        scriptureHelper={scriptureHelper}
        setTranslationIdMultiple={setTranslationIdMultiple}
      />

      <VerseAndChapterPageSettingsModel
        isSettingsModelOpen={isSettingsModelOpen}
        setIsSettingsModelOpen={setIsSettingsModelOpen}
        setShowOriginalText={setShowOriginalText}
        setShowTranslation={setShowTranslations}
        setShowFootnotes={setShowFootnotes}
        preference={preference}
        scriptureHelper={scriptureHelper}
        setShowTransliteration={setShowTransliterations}
        setOriginalTextVariation={setOriginalTextVariation}
      />

      <ShareModel
        isModalOpen={isShareModalOpen}
        setIsModalOpen={setIsShareModelOpen}
        shareTextState={shareText}
        stateControlFunctionOfShareTextState={setShareText}
      />
    </Fragment>
  );
};

export default Main;
