import axiosNoCredentialInstance from "@/lib/client/axiosNoCredentialInstance";
import {
  TranslationWithScripture,
  T_TranslationWithScriptureConstructorParametersJSON,
} from "@/types/classes/model/Translation/TranslationWithScripture";
import { Response, T_NoAuthenticationRequestErrorCode } from "@/types/response";
import {
  OK_HTTP_RESPONSE_CODE,
  SOMETHING_WENT_WRONG_TOAST,
  isNoAuthenticationRequestErrorCode,
  INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE,
} from "@/util/constants";
import { addToast } from "@heroui/toast";
import axios from "axios";

const fetchTranslators = async (): Promise<
  Array<TranslationWithScripture> | T_NoAuthenticationRequestErrorCode
> => {
  try {
    const response = await axiosNoCredentialInstance.get<
      Response<Array<T_TranslationWithScriptureConstructorParametersJSON>>
    >(`/translations/`);

    if (response.status === OK_HTTP_RESPONSE_CODE)
      return response.data.data.map((t) =>
        TranslationWithScripture.createFromJSON(t)
      );

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

export default fetchTranslators;
