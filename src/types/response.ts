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
