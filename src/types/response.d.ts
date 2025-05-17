import {
    CONFLICT_HTTP_RESPONSE_CODE,
    INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE, METHOD_NOT_ALLOWED_HTTP_RESPONSE_CODE,
    NOT_FOUND_HTTP_RESPONSE_CODE,
    TOO_MANY_REQUEST_HTTP_RESPONSE_CODE,
    UNAUTHORIZED_HTTP_RESPONSE_CODE
} from "@/util/utils";

export type Response<T> = {
    data: T;
};

export type ResponseMessage = {
    message: string;
};


export type T_NoAuthenticationRequestErrorCode =
    typeof UNAUTHORIZED_HTTP_RESPONSE_CODE
    | typeof NOT_FOUND_HTTP_RESPONSE_CODE
    | typeof TOO_MANY_REQUEST_HTTP_RESPONSE_CODE
    | typeof INTERNAL_SERVER_ERROR_HTTP_RESPONSE_CODE
    | typeof CONFLICT_HTTP_RESPONSE_CODE;


export type T_AuthenticationRequestErrorCode = T_NoAuthenticationRequestErrorCode
    | typeof METHOD_NOT_ALLOWED_HTTP_RESPONSE_CODE;

