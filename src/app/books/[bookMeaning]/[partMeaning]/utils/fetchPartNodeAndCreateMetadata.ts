import axiosServerInstance from "@/lib/axiosServerInstance";
import { BookPartNodeMetadataValueBuilder } from "@/types/classes/client/Redis/MetadataValueBuilder/TraditionMetadataValueBuilder/BookNodeMetadataValueBuilder/BookPartNodeMetadataValueBuilder/BookPartNodeMetadataValueBuilder";
import { BookNodeCoverOneLevelUpperBook } from "@/types/classes/model/Book/BookNode/BookNodeCover/BookNodeCoverOneLevelUpper/BookNodeCoverOneLevelUpperBook/BookNodeCoverOneLevelUpperBook";
import { T_BookNodeCoverOneLevelUpperBookAndOneLevelLowerTextConstructorParametersJSON } from "@/types/classes/model/Book/BookNode/BookNodeCover/BookNodeCoverOneLevelUpper/BookNodeCoverOneLevelUpperBook/BookNodeCoverOneLevelUpperBookAndOneLevelLowerText/BookNodeCoverOneLevelUpperBookAndOneLevelLowerText";
import { T_BookNodeCoverOneLevelUpperBookAndOneLevelLowerConstructorParametersJSON } from "@/types/classes/model/Book/BookNode/BookNodeCover/BookNodeCoverOneLevelUpper/BookNodeCoverOneLevelUpperBookAndOneLevelLower/BookNodeCoverOneLevelUpperBookAndOneLevelLower";
import { Response } from "@/types/response";
import { OK_HTTP_RESPONSE_CODE, ERROR_METADATA } from "@/util/constants";

export const fetchPartNodeAndCreateMetadata = async (...params: string[]) => {
  const url = `/book/${params.join("/")}`;

  try {
    const response = await axiosServerInstance.get<
      Response<
        | T_BookNodeCoverOneLevelUpperBookAndOneLevelLowerConstructorParametersJSON
        | T_BookNodeCoverOneLevelUpperBookAndOneLevelLowerTextConstructorParametersJSON
      >
    >(url);

    if (response.status !== OK_HTTP_RESPONSE_CODE)
      throw new Error(`Unexpected response status: ${response.status}`);

    const data = response.data.data;
    const bookNode = BookNodeCoverOneLevelUpperBook.createFromJSON(data);

    return new BookPartNodeMetadataValueBuilder(bookNode).build();
  } catch (error) {
    console.error(error);

    return ERROR_METADATA;
  }
};
