import axiosServerInstance from "@/lib/axiosServerInstance";
import { VerseMetadataBuilder } from "@/types/classes/client/Redis/MetadataValueBuilder/DivineMetadataValueBuilder/VerseMetadataValueBuilder/VerseMetadataBuilder";
import { ScriptureHelper } from "@/types/classes/client/Scripture/ScriptureHelper/ScriptureHelper";
import {
  T_VerseBothConstructorParametersJSON,
  VerseBoth,
} from "@/types/classes/model/Verse/Verse/VerseBoth/VerseBoth";

import { Response } from "@/types/response";
import {
  OK_HTTP_RESPONSE_CODE,
  PROJECT_DESCRIPTION,
  PROJECT_NAME,
} from "@/util/constants";
import { Metadata } from "next";
import { cache } from "react";

export const fetchVerseAndCreateMetadataIfValid = cache(
  async (
    scriptureHelper: Readonly<ScriptureHelper>,
    sectionNumber: number,
    chapterNumber: number,
    verseNumber: number
  ) => {
    const scriptureNumber = scriptureHelper.getNumber();
    const scriptureCode = scriptureHelper.getCode();

    try {
      const url = `verse/${scriptureNumber}/${sectionNumber}/${chapterNumber}/${verseNumber}`;

      const { status, data } = await axiosServerInstance.get<
        Response<T_VerseBothConstructorParametersJSON>
      >(url);

      if (status !== OK_HTTP_RESPONSE_CODE)
        throw new Error(`Unexpected status: ${status}`);

      const verse = VerseBoth.createFromJSON(data.data);

      return new VerseMetadataBuilder(verse).build();
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
