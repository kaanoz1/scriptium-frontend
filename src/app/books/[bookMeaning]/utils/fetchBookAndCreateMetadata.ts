import axiosServerInstance from "@/lib/axiosServerInstance";
import { BookMetadataValueBuilder } from "@/types/classes/client/Redis/MetadataValueBuilder/TraditionMetadataValueBuilder/BookMetadataValueBuilder/BookMetadataValueBuilder";
import {
  BookCoverOneLevelLower,
  T_BookCoverOneLevelLowerConstructorParametersJSON,
} from "@/types/classes/model/Book/Book/BookCover/BookCoverOneLevelLower/BookCoverOneLevelLower";
import { Response } from "@/types/response";
import { ERROR_METADATA, OK_HTTP_RESPONSE_CODE } from "@/util/constants";

export const fetchBookAndCreateMetadata = async (bookMeaning: string) => {
  const url = "/book/" + bookMeaning;

  try {
    const response = await axiosServerInstance.get<
      Response<T_BookCoverOneLevelLowerConstructorParametersJSON>
    >(url);

    const status = response.status;
    if (status !== OK_HTTP_RESPONSE_CODE)
      throw new Error(`Unexpected status: ${status}`);
    const book = BookCoverOneLevelLower.createFromJSON(response.data.data);

    return new BookMetadataValueBuilder(book).build();
  } catch (error) {
    console.error(error);

    return ERROR_METADATA;
  }
};
