import axios from "axios";
import { noCredentialsApiClient } from "@/lib/NoCredentialApiClient";
import { Response } from "@/util/types/Response";
import { EnvGuard } from "@/util/EnvGuard";
import { logger } from "@/lib/Logger";
import {
  SerializedResponseConverter,
  TSerializedResponse,
} from "@/util/types/SerializedResponse";
import { ResponseCodes } from "@/util/types/ResponseCodes";

export type Query = Record<string, string | number | boolean | null | undefined>;

/**
 * GET `${base}${path}` with the same error semantics as the other
 * controllers. Empty / null query values are dropped.
 */
export async function apiGet<T>(
  base: string,
  path: string,
  query: Query | undefined,
  caller: string,
): Promise<TSerializedResponse<T>> {
  // So that if we use the data even though the status is not OK, it fails loudly.
  const fallbackData = undefined as unknown as T;
  try {
    const params = Object.fromEntries(
      Object.entries(query ?? {}).filter(
        ([, v]) => v !== undefined && v !== null && v !== "",
      ),
    );
    const res = await noCredentialsApiClient.get<Response<T>>(`${base}${path}`, { params });
    if (EnvGuard.isDevelopment) logger.info("Requested to : " + res.config.url);
    if (res.status < 200 || res.status >= 300 || !res.data)
      return SerializedResponseConverter.createErrorResponse<T>(res.status, fallbackData);
    return SerializedResponseConverter.toSerializedResponse(res);
  } catch (e) {
    if (axios.isAxiosError(e)) {
      if (!e.response && e.request)
        console.error("Network Error: Internet connection missing or server unreachable.");
      return SerializedResponseConverter.createErrorResponse<T>(
        ResponseCodes.NETWORK_ERROR,
        fallbackData,
      );
    }
    logger.error(`Unexpected error in ${caller} (${path}): ${e}`);
    return SerializedResponseConverter.createErrorResponse<T>(
      ResponseCodes.UNKNOWN_ERROR,
      fallbackData,
    );
  }
}
