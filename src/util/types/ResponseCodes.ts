// noinspection JSUnusedGlobalSymbols

export class ResponseCodes {
    static readonly OK = 200;
    static readonly CREATED = 201;
    static readonly ACCEPTED = 202;
    static readonly NO_CONTENT = 204;

    static readonly MOVED_PERMANENTLY = 301;
    static readonly FOUND = 302;

    static readonly BAD_REQUEST = 400;
    static readonly UNAUTHORIZED = 401;
    static readonly FORBIDDEN = 403;
    static readonly NOT_FOUND = 404;
    static readonly METHOD_NOT_ALLOWED = 405;
    static readonly CONFLICT = 409;
    static readonly UNPROCESSABLE_ENTITY = 422;
    static readonly TOO_MANY_REQUESTS = 429;


    static readonly INTERNAL_SERVER_ERROR = 500;
    static readonly NOT_IMPLEMENTED = 501;
    static readonly BAD_GATEWAY = 502;
    static readonly SERVICE_UNAVAILABLE = 503;

    static readonly NETWORK_ERROR = 0;
    static readonly UNKNOWN_ERROR = -1;


    static isSuccess(code: number): boolean {
        return code >= 200 && code <= 299;
    }


    static isError(code: number): boolean {
        return code >= 400;
    }
}