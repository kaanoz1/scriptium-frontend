"use client";
import axiosNoCredentialInstance from "@/lib/client/axiosNoCredentialInstance";
import { ScriptureHelper } from "@/types/classes/client/Scripture/ScriptureHelper/ScriptureHelper";
import {
  SectionOneLevelBoth,
  T_SectionOneLevelBothConstructorParametersJSON,
} from "@/types/classes/model/Section/Section/SectionBoth/SectionOneLevelBoth/SectionOneLevelBoth";
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

export const fetchSection = async (
  scripture: Readonly<ScriptureHelper> | undefined,
  sectionNumber: number | string
): Promise<SectionOneLevelBoth | T_NoAuthenticationRequestErrorCode> => {
  const parsedSectionNumber = Number(sectionNumber);

  if (scripture == undefined || Number.isNaN(parsedSectionNumber))
    return NOT_FOUND_HTTP_RESPONSE_CODE;

  const scriptureNumber = scripture.getNumber();

  try {
    const response = await axiosNoCredentialInstance.get<
      Response<T_SectionOneLevelBothConstructorParametersJSON>
    >(`/verse/${scriptureNumber}/${sectionNumber}`);

    if (response.status === OK_HTTP_RESPONSE_CODE)
      return SectionOneLevelBoth.createFromJSON(response.data.data);

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
