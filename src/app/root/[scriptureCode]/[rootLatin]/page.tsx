"use client";
import {
  RootPageParams,
  T_ScriptureTextVariationKey,
  T_ValidScriptureCode,
} from "@/types/types";
import {
  DEFAULT_LANG_CODE,
  getScriptureIfCodeIsValid,
  INTERNAL_SERVER_ERROR_RESPONSE_CODE,
  NOT_FOUND_RESPONSE_CODE,
  OK_RESPONSE_CODE,
  SOMETHING_WENT_WRONG_TOAST,
  TOO_MANY_REQUEST_RESPONSE_CODE,
} from "@/util/utils";
import { NextPage } from "next";
import { useParams } from "next/navigation";
import { Dispatch, Fragment, Key, SetStateAction, useState } from "react";
import ServerError from "@/components/UI/ServerError";
import TooManyRequest from "@/components/UI/TooManyRequest";
import RootPageNotFoundComponent from "@/components/RootPageNotFoundComponent";
import { useQuery } from "@tanstack/react-query";
import axiosNoCredentialInstance from "@/client/axiosNoCredentialInstance";
import { NoAuthenticationRequestErrorCode, Response } from "@/types/response";
import LoadingSpinnerFullH from "@/components/UI/LoadingSpinnerFullH";
import { useScripture } from "@/hooks/useScripture";
import UIWrapper from "@/components/UI/UIWrapper";
import VerseAndChapterPageSettingsModel from "@/components/VerseAndChapterPageSettingsModel";
import { IoSettingsOutline } from "react-icons/io5";
import { MdTranslate } from "react-icons/md";
import ChapterPageTranslationModel from "@/components/ChapterPageTranslationModel";
import { Divider } from "@heroui/divider";
import Root from "@/components/UI/Root";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { addToast } from "@heroui/toast";

import { ScriptureDetails } from "@/types/classes/Scripture";
import { RootUpperDTO } from "@/types/classes/Root";
import { WordUpperDTO } from "@/types/classes/Word";
import { TranslationTextDTO } from "@/types/classes/TranslationText";

const fetchRoot = async (
  scripture: Readonly<ScriptureDetails> | null,
  rootLatinParam: string,
  setError: Dispatch<
    SetStateAction<NoAuthenticationRequestErrorCode | undefined>
  >
): Promise<RootUpperDTO | null> => {
  if (scripture == null) {
    setError(NOT_FOUND_RESPONSE_CODE);
    return null;
  }

  try {
    const response = await axiosNoCredentialInstance.get<
      Response<RootUpperDTO>
    >(`/root/${scripture.getNumber()}/${rootLatinParam}`);

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
    setError(INTERNAL_SERVER_ERROR_RESPONSE_CODE);
    return null;
  }
};

const Page: NextPage = ({}) => {
  const [error, setError] = useState<
    NoAuthenticationRequestErrorCode | undefined
  >(undefined);

  //Params from route
  const { rootLatin: rootLatinParam, scriptureCode: scriptureCodeParam } =
    useParams<RootPageParams>();

  //Settings
  const [preferredTranslationId, setPreferredTranslationId] = useState<
    Set<Key>
  >(new Set([]));

  const [showTranslation, setShowTranslation] = useState<boolean>(true);
  const [showOriginalText, setShowOriginalText] = useState<boolean>(true);
  const [showTransliteration, setShowTransliteration] =
    useState<boolean>(false);
  const [showFootnotes, setShowFootnotes] = useState<boolean>(true);

  const [textVariation, setTextVariation] =
    useState<T_ScriptureTextVariationKey>("usual");

  //Models
  const [isTranslationModelOpen, setIsTranslationModelOpen] =
    useState<boolean>(false);
  const [isSettingsModelOpen, setIsSettingsModelOpen] =
    useState<boolean>(false);

  const { preferredScriptureContext } = useScripture();

  const scriptureDetails: Readonly<ScriptureDetails> | null =
    getScriptureIfCodeIsValid(scriptureCodeParam);

  const { data: root = null, isLoading } = useQuery<RootUpperDTO | null>({
    queryKey: ["root", scriptureCodeParam, rootLatinParam],
    refetchOnWindowFocus: false,
    enabled: !!scriptureDetails,
    queryFn: async () =>
      await fetchRoot(scriptureDetails, rootLatinParam, setError),
  });

  if (isLoading) return <LoadingSpinnerFullH />;

  if (
    (error && error === NOT_FOUND_RESPONSE_CODE) ||
    scriptureDetails == null ||
    root == null
  )
    return (
      <RootPageNotFoundComponent
        rootLatinParam={rootLatinParam}
        scriptureCodeParam={scriptureCodeParam}
      />
    );

  if (error && error === TOO_MANY_REQUEST_RESPONSE_CODE)
    return <TooManyRequest />;

  if (error && error === INTERNAL_SERVER_ERROR_RESPONSE_CODE)
    return <ServerError />;

  const scriptureCode: Readonly<T_ValidScriptureCode> =
    scriptureDetails.getCode();

  const preferredScripture =
    preferredScriptureContext.preferencesByScripture[scriptureCode];

  setPreferredTranslationId(preferredScripture.preferredTranslationIdSingle);

  const rootTextInOwnLanguage: Readonly<string> = root.getOwn();
  const rootTextInLatin: Readonly<string> = root.getLatin();
  const verseCount: Readonly<number> = root.getWords().length;
  const words: ReadonlyArray<WordUpperDTO> = root.getWords();

  const translations: ReadonlyArray<TranslationTextDTO> = Array.from(
    new Map(
      [...words]
        .map((w) => w.getVerse())
        .flatMap((v) => v.getTranslationTexts())
        .map((t) => [t.getTranslation().getId(), t])
    ).values()
  );

  return (
    <Fragment>
      <UIWrapper>
        <div className="w-full flex-col justify-center">
          <div className="w-full py-2 px-5 flex items-center justify-between">
            <div className="flex gap-2 items-center justify-start">
              <span
                className={`font-bold ${preferredScripture.preferredScriptureFont} text-4xl`}
              >
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

            const wordText: string =
              word.getVariation().getTextWithVariation(textVariation) ??
              word.getVariation().getUsual();

            const sequenceNumber = word.getSequenceNumber();

            return (
              <AccordionItem
                key={i}
                textValue={`${i}'th accordion.`}
                title={
                  <div className="w-full flex items-center">
                    <div>
                      <span>#{i + 1}</span> <span>{scriptureMeaning},</span>{" "}
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
                  showFootnotes={showFootnotes}
                  showOriginalText={showOriginalText}
                  showTranslation={showTranslation}
                  showTransliteration={showTransliteration}
                  variation={textVariation}
                  preferredFont={preferredScripture.preferredScriptureFont}
                  preferredTranslationId={preferredTranslationId}
                  scriptureDetails={scriptureDetails}
                />
              </AccordionItem>
            );
          })}
        </Accordion>
      </UIWrapper>

      <ChapterPageTranslationModel
        isModalOpen={isTranslationModelOpen}
        setIsModalOpen={setIsTranslationModelOpen}
        preferredTranslationId={preferredTranslationId}
        stateControlFunctionOfPreferredTranslationId={setPreferredTranslationId}
        translations={translations}
      />

      <VerseAndChapterPageSettingsModel
        isSettingsModelOpen={isSettingsModelOpen}
        setIsSettingsModelOpen={setIsSettingsModelOpen}
        showTranslation={showTranslation}
        setShowTransliteration={setShowTransliteration}
        textSymbol={scriptureDetails.getVaritionSymbols().getUsual()}
        textSimplifiedSymbol={scriptureDetails
          .getVaritionSymbols()
          .getSimplified()}
        textWithoutVowelSymbol={scriptureDetails
          .getVaritionSymbols()
          .getSimplified()}
        setShowOriginalText={setShowOriginalText}
        setShowTranslation={setShowTranslation}
        showOriginalText={showOriginalText}
        showTransliteration={showTransliteration}
        preferredFont={preferredScripture.preferredScriptureFont}
        setTextVariation={setTextVariation}
        textVariation={textVariation}
        showFootnotes={showFootnotes}
        setShowFootnotes={setShowFootnotes}
      />
    </Fragment>
  );
};

export default Page;
