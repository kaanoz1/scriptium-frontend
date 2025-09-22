import axiosServerInstance from "@/lib/axiosServerInstance";
import { BookChapterNodeMetadataValueBuilder } from "@/types/classes/client/Redis/MetadataValueBuilder/TraditionMetadataValueBuilder/BookNodeMetadataValueBuilder/BookChapterNodeMetadataValueBuilder/BookChapterNodeMetadataValueBuilder";
import { BookNodeCoverFiveLevelUpperBook } from "@/types/classes/model/Book/BookNode/BookNodeCover/BookNodeCoverFiveLevelUpperBook/BookNodeCoverFiveLevelUpperBook";
import { T_BookNodeCoverFiveLevelUpperBookAndOneLevelLowerConstructorParametersJSON } from "@/types/classes/model/Book/BookNode/BookNodeCover/BookNodeCoverFiveLevelUpperBookAndOneLevelLower/BookNodeCoverFiveLevelUpperBookAndOneLevelLower";
import { T_BookNodeCoverFiveLevelUpperBookAndOneLevelLowerTextConstructorParametersJSON } from "@/types/classes/model/Book/BookNode/BookNodeCover/BookNodeCoverFiveLevelUpperBookAndOneLevelLowerText/BookNodeCoverFiveLevelUpperBookAndOneLevelLowerText";
import { Response } from "@/types/response";
import { OK_HTTP_RESPONSE_CODE, ERROR_METADATA } from "@/util/constants";

export const fetchChapterNodeAndCreateMetadata = async (
  ...params: string[]
) => {
  const url = `/book/${params.join("/")}`;

  try {
    const response = await axiosServerInstance.get<
      Response<
        | T_BookNodeCoverFiveLevelUpperBookAndOneLevelLowerConstructorParametersJSON
        | T_BookNodeCoverFiveLevelUpperBookAndOneLevelLowerTextConstructorParametersJSON
      >
    >(url);

    if (response.status !== OK_HTTP_RESPONSE_CODE)
      throw new Error(`Unexpected response status: ${response.status}`);

    const data = response.data.data;
    const bookNode = BookNodeCoverFiveLevelUpperBook.createFromJSON(data);

    return new BookChapterNodeMetadataValueBuilder(bookNode).build();
  } catch (error) {
    console.error(error);

    return ERROR_METADATA;
  }
};
