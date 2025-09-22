import axiosServerInstance from "@/lib/axiosServerInstance";
import { BookDivisionNodeMetadataValueBuilder } from "@/types/classes/client/Redis/MetadataValueBuilder/TraditionMetadataValueBuilder/BookNodeMetadataValueBuilder/BookDivisionNodeMetadataValueBuilder/BookDivisionNodeMetadataValueBuilder";
import { BookNodeCoverThreeLevelUpperBook } from "@/types/classes/model/Book/BookNode/BookNodeCover/BookNodeCoverThreeLevelUpperBook/BookNodeCoverThreeLevelUpperBook";
import { T_BookNodeCoverThreeLevelUpperBookAndOneLevelLowerConstructorParametersJSON } from "@/types/classes/model/Book/BookNode/BookNodeCover/BookNodeCoverThreeLevelUpperBookAndOneLevelLower/BookNodeCoverThreeLevelUpperBookAndOneLevelLower";
import { T_BookNodeCoverThreeLevelUpperBookAndOneLevelLowerTextConstructorParametersJSON } from "@/types/classes/model/Book/BookNode/BookNodeCover/BookNodeCoverThreeLevelUpperBookAndOneLevelLowerText/BookNodeCoverThreeLevelUpperBookAndOneLevelLowerText";
import { Response } from "@/types/response";
import { OK_HTTP_RESPONSE_CODE, ERROR_METADATA } from "@/util/constants";

export const fetchDivisionNodeAndCreateMetadata = async (
  ...params: string[]
) => {
  const url = `/book/${params.join("/")}`;

  try {
    const response = await axiosServerInstance.get<
      Response<
        | T_BookNodeCoverThreeLevelUpperBookAndOneLevelLowerConstructorParametersJSON
        | T_BookNodeCoverThreeLevelUpperBookAndOneLevelLowerTextConstructorParametersJSON
      >
    >(url);

    if (response.status !== OK_HTTP_RESPONSE_CODE)
      throw new Error(`Unexpected response status: ${response.status}`);

    const data = response.data.data;
    const bookNode = BookNodeCoverThreeLevelUpperBook.createFromJSON(data);

    return new BookDivisionNodeMetadataValueBuilder(bookNode).build();
  } catch (error) {
    console.error(error);

    return ERROR_METADATA;
  }
};
