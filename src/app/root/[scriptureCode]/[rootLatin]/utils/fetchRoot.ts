import axiosNoCredentialInstance from "@/lib/client/axiosNoCredentialInstance";
import { ScriptureHelper } from "@/types/classes/client/Scripture/ScriptureHelper/ScriptureHelper";
import {
  RootUpper,
  T_RootUpperConstructorParametersJSON,
} from "@/types/classes/model/Root/RootUpper/RootUpper";
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

const fetchRoot = async (
  scripture: Readonly<ScriptureHelper> | undefined,
  rootLatinParam: string
): Promise<RootUpper | T_NoAuthenticationRequestErrorCode> => {
  if (scripture == undefined) return NOT_FOUND_HTTP_RESPONSE_CODE;

  try {
    const scriptureNumber = scripture.getNumber();

    const response = await axiosNoCredentialInstance.get<
      Response<T_RootUpperConstructorParametersJSON>
    >(`/root/${scriptureNumber}/${rootLatinParam}`);

    if (response.status === OK_HTTP_RESPONSE_CODE) {
      if (response.data.data.words.length > 250)
        addToast({
          title: "This root contains an unusually large number of words.",
          description:
            "The page may load more slowly than expected. We are continuously working to enhance its performance.",
          color: "warning",
        });

      return RootUpper.createFromJSON(response.data.data);
    }

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

export default fetchRoot;
