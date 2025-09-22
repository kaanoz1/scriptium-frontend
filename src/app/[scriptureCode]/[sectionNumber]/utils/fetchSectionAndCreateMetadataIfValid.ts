import axiosServerInstance from "@/lib/axiosServerInstance";
import { SectionMetadataBuilder } from "@/types/classes/client/Redis/MetadataValueBuilder/DivineMetadataValueBuilder/SectionMetadataValueBuilder/SectionMetadataValueBuilder";
import { ScriptureHelper } from "@/types/classes/client/Scripture/ScriptureHelper/ScriptureHelper";
import { T_SectionBothConstructorParametersJSON } from "@/types/classes/model/Section/Section/SectionBoth/SectionBoth";
import { SectionOneLevelBoth } from "@/types/classes/model/Section/Section/SectionBoth/SectionOneLevelBoth/SectionOneLevelBoth";
import { Response } from "@/types/response";
import { ERROR_METADATA, OK_HTTP_RESPONSE_CODE } from "@/util/constants";

export const fetchSectionAndCreateMetadataIfValid = async (
  helper: Readonly<ScriptureHelper>,
  sectionNumber: number
) => {
  const scriptureNumber = helper.getNumber();
  const scriptureCode = helper.getCode();

  try {
    const url = `verse/${scriptureNumber}/${sectionNumber}`;

    const { status, data } = await axiosServerInstance.get<
      Response<T_SectionBothConstructorParametersJSON>
    >(url);

    if (status !== OK_HTTP_RESPONSE_CODE)
      throw new Error(`Unexpected status: ${status}`);

    const section = SectionOneLevelBoth.createFromJSON(data.data);

    return new SectionMetadataBuilder(section).build();
  } catch (error) {
    console.error(
      `Failed to fetch section data for ${scriptureCode}/${sectionNumber}:`,
      error
    );

    return ERROR_METADATA;
  }
};
