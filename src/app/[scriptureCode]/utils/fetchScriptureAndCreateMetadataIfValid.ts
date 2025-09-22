import axiosServerInstance from "@/lib/axiosServerInstance";
import { ScriptureMetadataBuilder } from "@/types/classes/client/Redis/MetadataValueBuilder/DivineMetadataValueBuilder/ScriptureMetadataValueBuilder/ScriptureMetadataBuilder";
import { ScriptureHelper } from "@/types/classes/client/Scripture/ScriptureHelper/ScriptureHelper";
import {
  T_ScriptureOneLevelLowerConstructorParametersJSON,
  ScriptureOneLevelLower,
} from "@/types/classes/model/Scripture/ScriptureLower/ScriptureOneLevelLower/ScriptureOneLevelLower";
import { Response } from "@/types/response";
import {
  OK_HTTP_RESPONSE_CODE,
  PROJECT_DESCRIPTION,
  PROJECT_NAME,
} from "@/util/constants";
import axios from "axios";
import { Metadata } from "next";
import { cache } from "react";

export const fetchScriptureAndCreateMetadataIfValid = cache(
  async (scriptureHelper: Readonly<ScriptureHelper>) => {
    const scriptureNumber = scriptureHelper.getNumber();
    const scriptureCode = scriptureHelper.getCode();

    try {
      const url = `verse/${scriptureNumber}`;

      const { status, data } = await axiosServerInstance.get<
        Response<T_ScriptureOneLevelLowerConstructorParametersJSON>
      >(url);

      if (status !== OK_HTTP_RESPONSE_CODE)
        throw new Error(`Unexpected status: ${status}`);

      const scripture = ScriptureOneLevelLower.createFromJSON(data.data);

      return new ScriptureMetadataBuilder(scripture).build();
    } catch (error) {
      console.error(
        `Failed to fetch scripture data for ${scriptureCode}:`,
        error
      );
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data);
      }
      return ERROR_METADATA;
    }
  }
);

const ERROR_METADATA: Metadata = {
  title: PROJECT_NAME,
  description: PROJECT_DESCRIPTION,
};
