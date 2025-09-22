import axiosServerInstance from "@/lib/axiosServerInstance";
import { ChapterMetadataBuilder } from "@/types/classes/client/Redis/MetadataValueBuilder/DivineMetadataValueBuilder/ChapterMetadataValueBuilder/ChapterMetadataValueBuilder";
import { ScriptureHelper } from "@/types/classes/client/Scripture/ScriptureHelper/ScriptureHelper";
import {
  ChapterUpperAndOneLevelLower,
  T_ChapterUpperAndOneLevelLowerConstructorParametersJSON,
} from "@/types/classes/model/Chapter/Chapter/ChapterUpper/ChapterUpperAndOneLevelLower/ChapterUpperAndOneLevelLower";
import { Response } from "@/types/response";
import {
  OK_HTTP_RESPONSE_CODE,
  PROJECT_DESCRIPTION,
  PROJECT_NAME,
} from "@/util/constants";
import { Metadata } from "next";
import { cache } from "react";

export const fetchChapterAndCreateMetadataIfValid = cache(
  async (
    scriptureHelper: Readonly<ScriptureHelper>,
    sectionNumber: number,
    chapterNumber: number
  ) => {
    const scriptureNumber = scriptureHelper.getNumber();
    const scriptureCode = scriptureHelper.getCode();

    try {
      const url = `verse/${scriptureNumber}/${sectionNumber}/${chapterNumber}`;

      const { status, data } = await axiosServerInstance.get<
        Response<T_ChapterUpperAndOneLevelLowerConstructorParametersJSON>
      >(url);

      if (status !== OK_HTTP_RESPONSE_CODE)
        throw new Error(`Unexpected status: ${status}`);

      const chapter = ChapterUpperAndOneLevelLower.createFromJSON(data.data);

      return new ChapterMetadataBuilder(chapter).build();
    } catch (error) {
      console.error(
        `Failed to fetch chapter data for ${scriptureCode}/${sectionNumber}/${chapterNumber}:`,
        error
      );

      return ERROR_METADATA;
    }
  }
);

const ERROR_METADATA: Metadata = {
  title: PROJECT_NAME,
  description: PROJECT_DESCRIPTION,
};
