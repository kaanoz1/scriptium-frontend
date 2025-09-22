import axiosNoCredentialInstance from "@/lib/client/axiosNoCredentialInstance";
import { T_BookNodeCoverOneLevelUpperBookAndOneLevelLowerTextConstructorParametersJSON } from "@/types/classes/model/Book/BookNode/BookNodeCover/BookNodeCoverOneLevelUpper/BookNodeCoverOneLevelUpperBook/BookNodeCoverOneLevelUpperBookAndOneLevelLowerText/BookNodeCoverOneLevelUpperBookAndOneLevelLowerText";
import {
  BookNodeCoverOneLevelUpperBookAndOneLevelLower,
  T_BookNodeCoverOneLevelUpperBookAndOneLevelLowerConstructorParametersJSON,
} from "@/types/classes/model/Book/BookNode/BookNodeCover/BookNodeCoverOneLevelUpper/BookNodeCoverOneLevelUpperBookAndOneLevelLower/BookNodeCoverOneLevelUpperBookAndOneLevelLower";
import { BookNodeCoverOneLevelUpperBookAndOneLevelLowerText } from "@/types/classes/model/Book/BookNode/BookNodeCover/BookNodeCoverOneLevelUpper/BookNodeCoverOneLevelUpperBookAndOneLevelLowerText/BookNodeCoverOneLevelUpperBookAndOneLevelLowerText";

import { T_NoAuthenticationRequestErrorCode, Response } from "@/types/response";
import {
  OK_HTTP_RESPONSE_CODE,
  isNoAuthenticationRequestErrorCode,
  INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE,
  SOMETHING_WENT_WRONG_TOAST,
} from "@/util/constants";
import { addToast } from "@heroui/toast";
import axios from "axios";

export const fetchBookNodesAndSubNodesOrTexts = async (
  ...partNames: string[]
): Promise<
  | BookNodeCoverOneLevelUpperBookAndOneLevelLower
  | BookNodeCoverOneLevelUpperBookAndOneLevelLowerText
  | T_NoAuthenticationRequestErrorCode
> => {
  const url = `/book/${partNames.join("/")}`;

  try {
    const response = await axiosNoCredentialInstance.get<
      Response<
        | T_BookNodeCoverOneLevelUpperBookAndOneLevelLowerConstructorParametersJSON
        | T_BookNodeCoverOneLevelUpperBookAndOneLevelLowerTextConstructorParametersJSON
      >
    >(url);

    if (response.status === OK_HTTP_RESPONSE_CODE) {
      const data = response.data.data;

      if (isBookNodeConstructorParameters(data)) {
        return BookNodeCoverOneLevelUpperBookAndOneLevelLower.createFromJSON(
          data
        );
      } else if (isTextNodeConstructorParameters(data)) {
        return BookNodeCoverOneLevelUpperBookAndOneLevelLowerText.createFromJSON(
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
): input is T_BookNodeCoverOneLevelUpperBookAndOneLevelLowerTextConstructorParametersJSON {
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
): input is T_BookNodeCoverOneLevelUpperBookAndOneLevelLowerConstructorParametersJSON {
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
