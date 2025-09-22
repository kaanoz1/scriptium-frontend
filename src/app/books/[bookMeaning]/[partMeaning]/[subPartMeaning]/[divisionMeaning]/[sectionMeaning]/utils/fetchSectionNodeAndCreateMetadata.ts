import axiosServerInstance from "@/lib/axiosServerInstance";
import { BookSectionNodeMetadataValueBuilder } from "@/types/classes/client/Redis/MetadataValueBuilder/TraditionMetadataValueBuilder/BookNodeMetadataValueBuilder/BookSectionNodeMetadataValueBuilder/BookSectionNodeMetadataValueBuilder";
import { BookNodeCoverFourLevelUpperBook } from "@/types/classes/model/Book/BookNode/BookNodeCover/BookNodeCoverFourLevelUpperBook/BookNodeCoverFourLevelUpperBook";
import { T_BookNodeCoverFourLevelUpperBookAndOneLevelLowerConstructorParametersJSON } from "@/types/classes/model/Book/BookNode/BookNodeCover/BookNodeCoverFourLevelUpperBookAndOneLevelLowerCover/BookNodeCoverFourLevelUpperBookAndOneLevelLowerCover";
import { T_BookNodeCoverFourLevelUpperBookAndOneLevelLowerTextConstructorParametersJSON } from "@/types/classes/model/Book/BookNode/BookNodeCover/BookNodeCoverFourLevelUpperBookAndOneLevelLowerText/BookNodeCoverFourLevelUpperBookAndOneLevelLowerText";
import { Response } from "@/types/response";
import { OK_HTTP_RESPONSE_CODE, ERROR_METADATA } from "@/util/constants";

export const fetchSectionNodeAndCreateMetadata = async (
  ...params: string[]
) => {
  const url = `/book/${params.join("/")}`;

  try {
    const response = await axiosServerInstance.get<
      Response<
        | T_BookNodeCoverFourLevelUpperBookAndOneLevelLowerConstructorParametersJSON
        | T_BookNodeCoverFourLevelUpperBookAndOneLevelLowerTextConstructorParametersJSON
      >
    >(url);

    if (response.status !== OK_HTTP_RESPONSE_CODE)
      throw new Error(`Unexpected response status: ${response.status}`);

    const data = response.data.data;
    const bookNode = BookNodeCoverFourLevelUpperBook.createFromJSON(data);

    return new BookSectionNodeMetadataValueBuilder(bookNode).build();
  } catch (error) {
    console.error(error);

    return ERROR_METADATA;
  }
};
