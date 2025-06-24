import type {
  T_NoAuthenticationRequestErrorCode,
  T_AuthenticationRequestErrorCode,
} from "@/types/response";
import type { T_SystemLanguageId, T_SystemLanguageCode } from "@/types/types";
import * as dotenv from "dotenv";

dotenv.config({ path: "../.env" });

export const PROJECT_NAME = "Scriptium";

export const SERVER_URL = process.env["NEXT_PUBLIC_SERVER_URL"]; //TODO: For development, will be changed.
export const PROJECT_URL = process.env["NEXT_PUBLIC_PROJECT_URL"]; //TODO: For development, will be changed.
export const PROJECT_EMAIL_ADDRESS = process.env["NEXT_PUBLIC_EMAIL_ADDRESS"]; //TODO: For development, will be changed.
export const PROJECT_INSTAGRAM_ADDRESS =
  process.env["NEXT_PUBLIC_INSTAGRAM_ADDRESS"] ?? ""; //TODO: For development, will be changed.
export const PROJECT_X_ADDRESS = process.env["NEXT_PUBLIC_X_ADDRESS"] ?? ""; //TODO: For development, will be changed.
export const DISCORD_BOT_ADD_URL =
  process.env["NEXT_PUBLIC_DISCORD_BOT_ADD_URL"] ?? ""; //TODO: For development, will be changed.
export const PATREON_SUPPORT_URL =
  process.env["NEXT_PUBLIC_PATREON_SUPPORT_URL"] ?? ""; //TODO: For development, will be changed.
export const PAYPAL_SUPPORT_URL =
  process.env["NEXT_PUBLIC_PAYPAL_SUPPORT_URL"] ?? ""; //TODO: For development, will be changed.
export const GITHUB_SCRIPTIUM_PROJECT_URL =
  process.env["NEXT_PUBLIC_GITHUB_SCRIPTIUM_PROJECT_URL"] ?? ""; //TODO: For development, will be changed.
export const GITHUB_SCRIPTIUM_FRONTEND_PROJECT_URL =
  process.env["NEXT_PUBLIC_GITHUB_SCRIPTIUM_FRONTEND_PROJECT_URL"] ?? ""; //TODO: For development, will be changed.
export const GITHUB_SCRIPTIUM_BACKEND_PROJECT_URL =
  process.env["NEXT_PUBLIC_GITHUB_SCRIPTIUM_BACKEND_PROJECT_URL"] ?? ""; //TODO: For development, will be changed.
export const GITHUB_SCRIPTIUM_DISCORD_BOT_PROJECT_URL =
  process.env["NEXT_PUBLIC_GITHUB_SCRIPTIUM_DISCORD_BOT_PROJECT_URL"] ?? ""; //TODO: For development, will be changed.
export const GITHUB_SCRIPTIUM_MOBILE_PROJECT_URL =
  process.env["NEXT_PUBLIC_GITHUB_SCRIPTIUM_MOBILE_PROJECT_URL"] ?? ""; //TODO: For development, will be changed.

export const VALID_PROFILE_PICTURE_EXTENSIONS: ReadonlyArray<string> = [
  "image/jpeg",
  "image/jpg",
] as const;

export const SystemLanguages: Readonly<
  Record<T_SystemLanguageId, T_SystemLanguageCode>
> = {
  1: "en",
} as const;

export const NOT_FOUND_HTTP_RESPONSE_CODE = 404;
export const CONFLICT_HTTP_RESPONSE_CODE = 409;
export const UNAUTHORIZED_HTTP_RESPONSE_CODE = 401;
export const TOO_MANY_REQUEST_HTTP_RESPONSE_CODE = 429;
export const INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE = 500;

export const METHOD_NOT_ALLOWED_HTTP_RESPONSE_CODE = 405;

export const OK_HTTP_RESPONSE_CODE = 200;

export const isNoAuthenticationRequestErrorCode: (
  input: T_NoAuthenticationRequestErrorCode | unknown
) => input is T_NoAuthenticationRequestErrorCode = (
  input: T_NoAuthenticationRequestErrorCode | unknown
) => {
  return (
    input === UNAUTHORIZED_HTTP_RESPONSE_CODE ||
    input === NOT_FOUND_HTTP_RESPONSE_CODE ||
    input === TOO_MANY_REQUEST_HTTP_RESPONSE_CODE ||
    input === INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE ||
    input === CONFLICT_HTTP_RESPONSE_CODE
  );
};

export const isAuthenticationRequestErrorCode = (
  input: T_AuthenticationRequestErrorCode | unknown
): input is T_AuthenticationRequestErrorCode => {
  return (
    isNoAuthenticationRequestErrorCode(input) ||
    input == METHOD_NOT_ALLOWED_HTTP_RESPONSE_CODE
  );
};

export const DEFAULT_LANG_CODE = "en";
export const SIGN_UP_URL = "/auth/signup";
export const SIGN_IN_URL = "/auth/signin";

export const MAX_LENGTH_FOR_COLLECTION_NAME = 24;
export const MAX_LENGTH_FOR_COLLECTION_DESCRIPTION = 72;
export const MAX_LENGTH_FOR_COMMENT = 250;
export const MAX_LENGTH_FOR_NOTE = 1000;

export const MAX_USER_COLLECTION_COUNT: number = 3;
