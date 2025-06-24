import {
  CONFLICT_HTTP_RESPONSE_CODE,
  INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE,
  METHOD_NOT_ALLOWED_HTTP_RESPONSE_CODE,
  NOT_FOUND_HTTP_RESPONSE_CODE,
  TOO_MANY_REQUEST_HTTP_RESPONSE_CODE,
  UNAUTHORIZED_HTTP_RESPONSE_CODE,
} from "@/util/constants";

export type Response<T> = {
  data: T;
};

export type ResponseMessage = {
  message: string;
};

export type T_NoAuthenticationRequestErrorCode = 401 | 404 | 429 | 500 | 409;

export type T_AuthenticationRequestErrorCode =
  | T_NoAuthenticationRequestErrorCode
  | 405;
