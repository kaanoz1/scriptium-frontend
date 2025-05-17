export type Response<T> = {
  data: T;
};

export type ResponseMessage = {
  message: string;
};



export type NoAuthenticationRequestErrorCode = 401 | 404 | 429 | 500;

export type AuthenticationRequestErrorCode =
  | NoAuthenticationRequestErrorCode
  | 405;
