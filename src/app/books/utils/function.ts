import axiosNoCredentialInstance from "@/lib/client/axiosNoCredentialInstance";
import {
  BookCover,
  T_BookCoverConstructorParametersJSON,
} from "@/types/classes/model/Book/Book/BookCover/BookCover";

import { Response, T_NoAuthenticationRequestErrorCode } from "@/types/response";
import {
  INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE,
  isNoAuthenticationRequestErrorCode,
  OK_HTTP_RESPONSE_CODE,
  SOMETHING_WENT_WRONG_TOAST,
} from "@/util/constants";
import { addToast } from "@heroui/toast";
import axios from "axios";

export const fetchBooks = async (): Promise<
  Array<BookCover> | T_NoAuthenticationRequestErrorCode
> => {
  try {
    const response = await axiosNoCredentialInstance.get<
      Response<Array<T_BookCoverConstructorParametersJSON>>
    >("/book/");

    const {
      status,
      data: { data },
    } = response;

    if (status === OK_HTTP_RESPONSE_CODE)
      return data.map(BookCover.createFromJSON);

    throw new Error(`Unexpected status: ${status}`);
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
