import axiosNoCredentialInstance from "@/lib/client/axiosNoCredentialInstance";
import { RootMetadataValueBuilder } from "@/types/classes/client/Redis/MetadataValueBuilder/DivineMetadataValueBuilder/RootMetadataValueBuilder/RootMetadataValueBuilder";
import { ScriptureHelper } from "@/types/classes/client/Scripture/ScriptureHelper/ScriptureHelper";
import {
  T_RootUpperConstructorParametersJSON,
  RootUpper,
} from "@/types/classes/model/Root/RootUpper/RootUpper";
import { Response } from "@/types/response";
import { ERROR_METADATA, OK_HTTP_RESPONSE_CODE } from "@/util/constants";
import { cache } from "react";

export const fetchRootAndCreateMetadataIfValid = cache(
  async (helper: Readonly<ScriptureHelper>, rootLatin: string) => {
    const scriptureNumber = helper.getNumber();
    const scriptureCode = helper.getCode();

    try {
      const response = await axiosNoCredentialInstance.get<
        Response<T_RootUpperConstructorParametersJSON>
      >(`/root/${scriptureNumber}/${rootLatin}`);

      if (response.status !== OK_HTTP_RESPONSE_CODE)
        throw new Error("Unexpected result. Status: " + response.status);

      const root = RootUpper.createFromJSON(response.data.data);

      return new RootMetadataValueBuilder(root).build();
    } catch (error) {
      console.error(
        `Failed to fetch root data for ${scriptureCode}/${rootLatin}:`,
        error
      );

      return ERROR_METADATA;
    }
  }
);
