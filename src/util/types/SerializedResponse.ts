import { ResponseCodes } from "@/util/types/ResponseCodes";
import {AxiosResponse} from "axios";
import {Response} from "./Response";

export interface TSerializedResponse<T> {
    data: T;
    status: number;
    ok: boolean;
}

export class SerializedResponse<T> {
    constructor(
        public data: T,
        public status: number,
        public ok: boolean
    ) {}

    static fromJSON<T>(json: TSerializedResponse<T>): SerializedResponse<T> {
        return new SerializedResponse<T>(json.data, json.status, json.ok);
    }

    public hasStatusCode(code: number): boolean {
        return this.status === code;
    }

    public isNotFound(): boolean {
        return this.hasStatusCode(ResponseCodes.NOT_FOUND);
    }

    public isTooManyRequests(): boolean {
        return this.hasStatusCode(ResponseCodes.TOO_MANY_REQUESTS);
    }

    public isNetworkError(): boolean {
        return this.hasStatusCode(ResponseCodes.NETWORK_ERROR);
    }
}

export class SerializedResponseConverter {
    static toSerializedResponse<T>(axiosResponse: AxiosResponse<Response<T>>): TSerializedResponse<T> {
        return {
            data: axiosResponse.data.data,
            status: axiosResponse.status,
            ok: axiosResponse.status >= 200 && axiosResponse.status < 300
        };
    }

    static createErrorResponse<T>(status: number, fallbackData: T): TSerializedResponse<T> {
        return {
            data: fallbackData,
            status: status,
            ok: false
        };
    }
}