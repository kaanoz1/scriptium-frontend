"use client";
import { RootPageParams } from "@/types/types";
import { DEFAULT_LANG_CODE, SOMETHING_WENT_WRONG_TOAST } from "@/util/utils";
import { NextPage } from "next";
import { useParams } from "next/navigation";
import { Fragment, useState } from "react";
import RootPageNotFoundComponent from "@/components/RootPageNotFoundComponent";
import { useQuery } from "@tanstack/react-query";
import axiosNoCredentialInstance from "@/client/axiosNoCredentialInstance";
import { Response, T_NoAuthenticationRequestErrorCode } from "@/types/response";
import LoadingSpinnerFullH from "@/components/UI/LoadingSpinnerFullH";
import UIWrapper from "@/components/UI/UIWrapper";
import VerseAndChapterPageSettingsModel from "@/components/VerseAndChapterPageSettingsModel";
import { IoSettingsOutline } from "react-icons/io5";
import { MdTranslate } from "react-icons/md";
import ChapterPageTranslationModel from "@/app/[scriptureCode]/[sectionNumber]/[chapterNumber]/components/ChapterPageTranslationModel";
import { Divider } from "@heroui/divider";
import Root from "@/components/UI/Root";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { addToast } from "@heroui/toast";

import {
  RootUpperDTO,
  T_RootUpperDTOConstructorParametersJSON,
} from "@/types/classes/Root";
import { WordUpperDTO } from "@/types/classes/Word";
import { useScripturePreferences } from "@/hooks/useScripture";
import { getErrorComponent } from "@/util/reactUtil";
import axios from "axios";
import {
  isNoAuthenticationRequestErrorCode,
  NOT_FOUND_HTTP_RESPONSE_CODE,
  OK_HTTP_RESPONSE_CODE,
  INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE,
} from "@/util/constants";
import { getScriptureIfCodeIsValid } from "@/util/func";
import { ScriptureDetail } from "@/util/scriptureDetails";
import ShareModel from "@/app/[scriptureCode]/[sectionNumber]/[chapterNumber]/[verseNumber]/components/ShareModel";

const Page: NextPage = ({}) => {
  const { rootLatin: rootLatinParam, scriptureCode: scriptureCodeParam } =
    useParams<RootPageParams>();

  const [isTranslationModelOpen, setIsTranslationModelOpen] =
    useState<boolean>(false);
  const [isSettingsModelOpen, setIsSettingsModelOpen] =
    useState<boolean>(false);

  const [shareText, setShareText] = useState<string>("");
  const [isShareModalOpen, setIsShareModelOpen] = useState<boolean>(false);

  const scriptureDetail: Readonly<ScriptureDetail> | null =
    getScriptureIfCodeIsValid(scriptureCodeParam);

  const { data: root = null, isLoading } = useQuery<
    RootUpperDTO | T_NoAuthenticationRequestErrorCode | null
  >({
    queryKey: ["root", scriptureCodeParam, rootLatinParam],
    refetchOnWindowFocus: false,
    enabled: !!scriptureDetail,
    queryFn: async () => await fetchRoot(scriptureDetail, rootLatinParam),
  });

  const {
    preference,
    setOriginalTextVariation,
    setShowOriginalText,
    setShowTransliterations,
    setShowTranslations,
    setShowFootnotes,
    setTranslationIdMultiple,
  } = useScripturePreferences(scriptureDetail?.getCode());

  if (isLoading) return <LoadingSpinnerFullH />;

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

  if (scriptureDetail === null)
    return (
      <RootPageNotFoundComponent
        rootLatinParam={rootLatinParam}
        scriptureCodeParam={scriptureCodeParam}
      />
    );

  const rootTextInOwnLanguage: Readonly<string> = root.getOwn();
  const rootTextInLatin: Readonly<string> = root.getLatin();
  const verseCount: Readonly<number> = root.getWords().length;
  const words: ReadonlyArray<WordUpperDTO> = root.getWords();

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
                  variation={"usual"}
                  scriptureDetail={scriptureDetail}
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
        scriptureDetail={scriptureDetail}
        setTranslationIdMultiple={setTranslationIdMultiple}
      />

      <VerseAndChapterPageSettingsModel
        isSettingsModelOpen={isSettingsModelOpen}
        setIsSettingsModelOpen={setIsSettingsModelOpen}
        setShowOriginalText={setShowOriginalText}
        setShowTranslation={setShowTranslations}
        setShowFootnotes={setShowFootnotes}
        scriptureDetail={scriptureDetail}
        preference={preference}
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

const fetchRoot = async (
  scripture: Readonly<ScriptureDetail> | null,
  rootLatinParam: string
): Promise<RootUpperDTO | T_NoAuthenticationRequestErrorCode> => {
  if (scripture == null) return NOT_FOUND_HTTP_RESPONSE_CODE;

  try {
    const scriptureNumber = scripture.getNumber();

    const response = await axiosNoCredentialInstance.get<
      Response<T_RootUpperDTOConstructorParametersJSON>
    >(`/root/${scriptureNumber}/${rootLatinParam}`);

    if (response.status === OK_HTTP_RESPONSE_CODE)
      return RootUpperDTO.createFromJSON(response.data.data);

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

export default Page;
