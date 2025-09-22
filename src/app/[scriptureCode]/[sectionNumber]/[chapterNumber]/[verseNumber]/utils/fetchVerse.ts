"use client";
import axiosNoCredentialInstance from "@/lib/client/axiosNoCredentialInstance";
import { ScriptureHelper } from "@/types/classes/client/Scripture/ScriptureHelper/ScriptureHelper";
import {
  VerseBoth,
  T_VerseBothConstructorParametersJSON,
} from "@/types/classes/model/Verse/Verse/VerseBoth/VerseBoth";
import { Response, T_NoAuthenticationRequestErrorCode } from "@/types/response";
import {
  NOT_FOUND_HTTP_RESPONSE_CODE,
  OK_HTTP_RESPONSE_CODE,
  SOMETHING_WENT_WRONG_TOAST,
  isNoAuthenticationRequestErrorCode,
  INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE,
} from "@/util/constants";
import { addToast } from "@heroui/toast";
import axios from "axios";

const fetchVerse = async (
  scriptureHelper: Readonly<ScriptureHelper> | undefined,
  sectionNumber: number | string,
  chapterNumber: number | string,
  verseNumber: number | string
): Promise<VerseBoth | T_NoAuthenticationRequestErrorCode> => {
  const parsedSectionNumber = Number(sectionNumber);
  const parsedChapterNumber = Number(chapterNumber);
  const parsedVerseNumber = Number(verseNumber);

  if (
    scriptureHelper == undefined ||
    Number.isNaN(parsedSectionNumber) ||
    Number.isNaN(parsedChapterNumber) ||
    Number.isNaN(parsedVerseNumber)
  )
    return NOT_FOUND_HTTP_RESPONSE_CODE;

  const scriptureNumber = scriptureHelper.getNumber();
  try {
    // Normally, axiosCredentialInstance should be used since isSaved information shall be fetched. But since Scriptium yet not deal with user data axiosNoCredentialInstance will be adequate.

    const response = await axiosNoCredentialInstance.get<
      Response<T_VerseBothConstructorParametersJSON>
    >(
      `/verse/${scriptureNumber}/${parsedSectionNumber}/${parsedChapterNumber}/${parsedVerseNumber}`
    );

    if (response.status === OK_HTTP_RESPONSE_CODE)
      return VerseBoth.createFromJSON(response.data.data);

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

export default fetchVerse;
