import axiosNoCredentialInstance from "@/lib/client/axiosNoCredentialInstance";
import { ScriptureHelper } from "@/types/classes/client/Scripture/ScriptureHelper/ScriptureHelper";
import {
  ChapterUpperAndOneLevelLower,
  T_ChapterUpperAndOneLevelLowerConstructorParametersJSON,
} from "@/types/classes/model/Chapter/Chapter/ChapterUpper/ChapterUpperAndOneLevelLower/ChapterUpperAndOneLevelLower";
import { Response, T_NoAuthenticationRequestErrorCode } from "@/types/response";
import {
  NOT_FOUND_HTTP_RESPONSE_CODE,
  OK_HTTP_RESPONSE_CODE,
  SOMETHING_WENT_WRONG_TOAST,
  isNoAuthenticationRequestErrorCode,
  INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE,
} from "@/util/constants";
import { addToast } from "@heroui/toast";
import axios from "axios";

const fetchChapter = async (
  scriptureHelper: Readonly<ScriptureHelper> | undefined,
  sectionNumber: string | number,
  chapterNumber: string | number
): Promise<
  ChapterUpperAndOneLevelLower | T_NoAuthenticationRequestErrorCode
> => {
  const parsedSectionNumber = Number(sectionNumber);
  const parsedChapterNumber = Number(chapterNumber);

  if (
    scriptureHelper === undefined ||
    Number.isNaN(parsedSectionNumber) ||
    Number.isNaN(parsedChapterNumber)
  )
    return NOT_FOUND_HTTP_RESPONSE_CODE;

  const scriptureNumber = scriptureHelper.getNumber();

  try {
    const response = await axiosNoCredentialInstance.get<
      Response<T_ChapterUpperAndOneLevelLowerConstructorParametersJSON>
    >(
      `/verse/${scriptureNumber}/${parsedSectionNumber}/${parsedChapterNumber}`
    );

    if (response.status === OK_HTTP_RESPONSE_CODE)
      return ChapterUpperAndOneLevelLower.createFromJSON(response.data.data);

    throw new Error("Unexpected result. Status: " + response.status);
  } catch (error) {
    addToast(SOMETHING_WENT_WRONG_TOAST);
    console.error(error);

    if (
      !axios.isAxiosError(error) ||
      !error.response ||
      !isNoAuthenticationRequestErrorCode(error.response.status)
    )
      return INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE;

    return error.response.status;
  }
};

export default fetchChapter;
