import axiosNoCredentialInstance from "@/lib/client/axiosNoCredentialInstance";
import {
  BookNodeCoverFourLevelUpperBookAndOneLevelLower,
  T_BookNodeCoverFourLevelUpperBookAndOneLevelLowerConstructorParametersJSON,
} from "@/types/classes/model/Book/BookNode/BookNodeCover/BookNodeCoverFourLevelUpperBookAndOneLevelLowerCover/BookNodeCoverFourLevelUpperBookAndOneLevelLowerCover";
import {
  T_BookNodeCoverFourLevelUpperBookAndOneLevelLowerTextConstructorParametersJSON,
  BookNodeCoverFourLevelUpperBookAndOneLevelLowerText,
} from "@/types/classes/model/Book/BookNode/BookNodeCover/BookNodeCoverFourLevelUpperBookAndOneLevelLowerText/BookNodeCoverFourLevelUpperBookAndOneLevelLowerText";
import { T_BookNodeCoverThreeLevelUpperBookAndOneLevelLowerConstructorParametersJSON } from "@/types/classes/model/Book/BookNode/BookNodeCover/BookNodeCoverThreeLevelUpperBookAndOneLevelLower/BookNodeCoverThreeLevelUpperBookAndOneLevelLower";
import { T_BookNodeCoverThreeLevelUpperBookAndOneLevelLowerTextConstructorParametersJSON } from "@/types/classes/model/Book/BookNode/BookNodeCover/BookNodeCoverThreeLevelUpperBookAndOneLevelLowerText/BookNodeCoverThreeLevelUpperBookAndOneLevelLowerText";
import { BookText } from "@/types/classes/model/Book/BookText/BookText/BookText";
import { BookTranslation } from "@/types/classes/model/Book/BookTranslation/BookTranslation/BookTranslation";

import { Response, T_NoAuthenticationRequestErrorCode } from "@/types/response";
import {
  OK_HTTP_RESPONSE_CODE,
  INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE,
  isNoAuthenticationRequestErrorCode,
  SOMETHING_WENT_WRONG_TOAST,
} from "@/util/constants";
import { addToast } from "@heroui/toast";
import axios from "axios";

export const fetchSectionBookNodesAndSectionNodesOrTexts = async (
  ...partNames: string[]
): Promise<
  | BookNodeCoverFourLevelUpperBookAndOneLevelLower
  | BookNodeCoverFourLevelUpperBookAndOneLevelLowerText
  | T_NoAuthenticationRequestErrorCode
> => {
  const url = `/book/${partNames.join("/")}`;

  try {
    const response = await axiosNoCredentialInstance.get<
      Response<
        | T_BookNodeCoverFourLevelUpperBookAndOneLevelLowerConstructorParametersJSON
        | T_BookNodeCoverFourLevelUpperBookAndOneLevelLowerTextConstructorParametersJSON
      >
    >(url);

    if (response.status === OK_HTTP_RESPONSE_CODE) {
      const data = response.data.data;

      if (isBookNodeConstructorParameters(data)) {
        return BookNodeCoverFourLevelUpperBookAndOneLevelLower.createFromJSON(
          data
        );
      } else if (isTextNodeConstructorParameters(data)) {
        return BookNodeCoverFourLevelUpperBookAndOneLevelLowerText.createFromJSON(
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
): input is T_BookNodeCoverThreeLevelUpperBookAndOneLevelLowerTextConstructorParametersJSON {
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
): input is T_BookNodeCoverThreeLevelUpperBookAndOneLevelLowerConstructorParametersJSON {
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

export function getSharedTranslation(
  bookTexts: readonly BookText[]
): Readonly<BookTranslation> | undefined {
  if (bookTexts.length === 0) return undefined;

  const firstTextTranslationIds =
    bookTexts[0]
      ?.getTranslationTexts()
      .map((tt) => tt.getTranslation().getId()) ?? [];

  for (const id of firstTextTranslationIds) {
    const isCommon = bookTexts.every((bt) =>
      bt.getTranslationTexts().some((tt) => tt.getTranslation().getId() === id)
    );

    if (isCommon) {
      return bookTexts[0]
        ?.getTranslationTexts()
        .find((tt) => tt.getTranslation().getId() === id)!
        .getTranslation();
    }
  }

  return undefined;
}
