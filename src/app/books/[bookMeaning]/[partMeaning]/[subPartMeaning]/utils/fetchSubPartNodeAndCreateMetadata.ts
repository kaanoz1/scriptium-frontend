import axiosServerInstance from "@/lib/axiosServerInstance";
import { BookSubPartNodeMetadataValueBuilder } from "@/types/classes/client/Redis/MetadataValueBuilder/TraditionMetadataValueBuilder/BookNodeMetadataValueBuilder/BookSubPartNodeMetadataValueBuilder/BookSubPartNodeMetadataValueBuilder";
import { BookNodeCoverTwoLevelUpperBook } from "@/types/classes/model/Book/BookNode/BookNodeCover/BookNodeCoverTwoLevelUpper/BookNodeCoverTwoLevelUpperBook/BookNodeCoverTwoLevelUpperBook";
import { T_BookNodeCoverTwoLevelUpperBookAndOneLevelLowerConstructorParametersJSON } from "@/types/classes/model/Book/BookNode/BookNodeCover/BookNodeCoverTwoLevelUpperBookAndOneLevelLower/BookNodeCoverTwoLevelUpperBookAndOneLevelLower";
import { T_BookNodeCoverTwoLevelUpperBookAndOneLevelLowerTextConstructorParametersJSON } from "@/types/classes/model/Book/BookNode/BookNodeCover/BookNodeCoverTwoLevelUpperBookAndOneLevelLowerText/BookNodeCoverTwoLevelUpperBookAndOneLevelLowerText";
import { Response } from "@/types/response";
import { OK_HTTP_RESPONSE_CODE, ERROR_METADATA } from "@/util/constants";

export const fetchSubPartNodeAndCreateMetadata = async (
  ...params: string[]
) => {
  const url = `/book/${params.join("/")}`;

  try {
    const response = await axiosServerInstance.get<
      Response<
        | T_BookNodeCoverTwoLevelUpperBookAndOneLevelLowerConstructorParametersJSON
        | T_BookNodeCoverTwoLevelUpperBookAndOneLevelLowerTextConstructorParametersJSON
      >
    >(url);

    if (response.status !== OK_HTTP_RESPONSE_CODE)
      throw new Error(`Unexpected response status: ${response.status}`);

    const data = response.data.data;
    const bookNode = BookNodeCoverTwoLevelUpperBook.createFromJSON(data);

    return new BookSubPartNodeMetadataValueBuilder(bookNode).build();
  } catch (error) {
    console.error(error);

    return ERROR_METADATA;
  }
};
