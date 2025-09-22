import axiosNoCredentialInstance from "@/lib/client/axiosNoCredentialInstance";
import { ScriptureHelper } from "@/types/classes/client/Scripture/ScriptureHelper/ScriptureHelper";
import {
  ScriptureOneLevelLower,
  T_ScriptureOneLevelLowerConstructorParametersJSON,
} from "@/types/classes/model/Scripture/ScriptureLower/ScriptureOneLevelLower/ScriptureOneLevelLower";
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

export const fetchScripture = async (
  scripture: Readonly<ScriptureHelper> | undefined
): Promise<ScriptureOneLevelLower | T_NoAuthenticationRequestErrorCode> => {
  if (scripture == undefined) return NOT_FOUND_HTTP_RESPONSE_CODE;

  const scriptureNumber = scripture.getNumber();

  try {
    const response = await axiosNoCredentialInstance.get<
      Response<T_ScriptureOneLevelLowerConstructorParametersJSON>
    >(`/verse/${scriptureNumber}`);

    if (response.status === OK_HTTP_RESPONSE_CODE) {
      console.log("Request from Scripture Page: ");

      console.log(response.request);

      console.log("Response from Scripture Page: ");
      console.log(response.data.data);
      return ScriptureOneLevelLower.createFromJSON(response.data.data);
    }

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
