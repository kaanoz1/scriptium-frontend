import axiosNoCredentialInstance from "@/lib/client/axiosNoCredentialInstance";
import {
  BookNodeCoverTwoLevelUpperBookAndOneLevelLower,
  T_BookNodeCoverTwoLevelUpperBookAndOneLevelLowerConstructorParametersJSON,
} from "@/types/classes/model/Book/BookNode/BookNodeCover/BookNodeCoverTwoLevelUpperBookAndOneLevelLower/BookNodeCoverTwoLevelUpperBookAndOneLevelLower";
import {
  BookNodeCoverTwoLevelUpperBookAndOneLevelLowerText,
  T_BookNodeCoverTwoLevelUpperBookAndOneLevelLowerTextConstructorParametersJSON,
} from "@/types/classes/model/Book/BookNode/BookNodeCover/BookNodeCoverTwoLevelUpperBookAndOneLevelLowerText/BookNodeCoverTwoLevelUpperBookAndOneLevelLowerText";

import { Response, T_NoAuthenticationRequestErrorCode } from "@/types/response";
import {
  OK_HTTP_RESPONSE_CODE,
  INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE,
  isNoAuthenticationRequestErrorCode,
  SOMETHING_WENT_WRONG_TOAST,
} from "@/util/constants";
import { addToast } from "@heroui/toast";
import axios from "axios";

export const fetchSubPartBookNodesAndSectionNodesOrTexts = async (
  ...partNames: string[]
): Promise<
  | BookNodeCoverTwoLevelUpperBookAndOneLevelLower
  | BookNodeCoverTwoLevelUpperBookAndOneLevelLowerText
  | T_NoAuthenticationRequestErrorCode
> => {
  const url = `/book/${partNames.join("/")}`;

  try {
    const response = await axiosNoCredentialInstance.get<
      Response<
        | T_BookNodeCoverTwoLevelUpperBookAndOneLevelLowerConstructorParametersJSON
        | T_BookNodeCoverTwoLevelUpperBookAndOneLevelLowerTextConstructorParametersJSON
      >
    >(url);

    if (response.status === OK_HTTP_RESPONSE_CODE) {
      const data = response.data.data;

      if (isBookNodeConstructorParameters(data)) {
        return BookNodeCoverTwoLevelUpperBookAndOneLevelLower.createFromJSON(
          data
        );
      } else if (isTextNodeConstructorParameters(data)) {
        return BookNodeCoverTwoLevelUpperBookAndOneLevelLowerText.createFromJSON(
          data
        );
      } else {
        return INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE;
      }
    }

    throw new Error(`Unexpected response status: ${response.status}`);
  } catch (error) {
    console.error(error);
    addToast(SOMETHING_WENT_WRONG_TOAST);

    if (
      axios.isAxiosError(error) &&
      error.response &&
      isNoAuthenticationRequestErrorCode(error.response.status)
    ) {
      return error.response.status;
    }

    return INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE;
  }
};

function isTextNodeConstructorParameters(
  input: unknown
): input is T_BookNodeCoverTwoLevelUpperBookAndOneLevelLowerTextConstructorParametersJSON {
  return (
    typeof input === "object" &&
    input !== null &&
    "texts" in input &&
    Array.isArray((input as any).texts) &&
    (input as any).texts.every(
      (text: any) =>
        text &&
        typeof text.id === "number" &&
        typeof text.text === "string" &&
        Array.isArray(text.translationTexts)
    )
  );
}

function isBookNodeConstructorParameters(
  input: unknown
): input is T_BookNodeCoverTwoLevelUpperBookAndOneLevelLowerConstructorParametersJSON {
  return (
    typeof input === "object" &&
    input !== null &&
    "nodes" in input &&
    Array.isArray((input as any).nodes) &&
    (input as any).nodes.every(
      (node: any) =>
        node &&
        typeof node.id === "number" &&
        typeof node.name === "string" &&
        Array.isArray(node.meanings)
    )
  );
}
