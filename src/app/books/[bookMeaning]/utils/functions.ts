import axiosNoCredentialInstance from "@/lib/client/axiosNoCredentialInstance";
import {
  BookCoverOneLevelLower,
  T_BookCoverOneLevelLowerConstructorParametersJSON,
} from "@/types/classes/model/Book/Book/BookCover/BookCoverOneLevelLower/BookCoverOneLevelLower";

import {
  T_NoAuthenticationRequestErrorCode,
  ResponseMessage,
  Response,
} from "@/types/response";
import {
  OK_HTTP_RESPONSE_CODE,
  isNoAuthenticationRequestErrorCode,
  INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE,
  SOMETHING_WENT_WRONG_TOAST,
} from "@/util/constants";
import { addToast } from "@heroui/toast";
import axios from "axios";

export const fetchBookAndNodes = async (
  bookMeaning: string
): Promise<BookCoverOneLevelLower | T_NoAuthenticationRequestErrorCode> => {
  const url = "/book/" + bookMeaning;

  try {
    const response = await axiosNoCredentialInstance.get<
      Response<T_BookCoverOneLevelLowerConstructorParametersJSON>
    >(url);

    const status = response.status;
    if (status === OK_HTTP_RESPONSE_CODE)
      return BookCoverOneLevelLower.createFromJSON(response.data.data);

    throw new Error(`Unexpected status: ${status}`);
  } catch (error) {
    if (axios.isAxiosError<ResponseMessage>(error)) {
    }

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
