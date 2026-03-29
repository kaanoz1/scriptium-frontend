import {noCredentialsApiClient} from "@/lib/NoCredentialApiClient";
import {Response} from "@/util/types/Response";
import {EnvGuard} from "@/util/EnvGuard";
import {logger} from "@/lib/Logger";
import {SerializedResponseConverter} from "@/util/types/SerializedResponse";
import axios from "axios";
import {ResponseCodes} from "@/util/types/ResponseCodes";
import {SearchResultPlain} from "@/classes/Shared/SearchResult/Plain";
import {TSearchResultPlain} from "@/dto/Shared/SearchResult/Plain";

export class SearchController {
    private static _instance: SearchController | null = null;

    private constructor() {
    }

    public static getInstance(): SearchController {
        if (!SearchController._instance) {
            SearchController._instance = new SearchController();
        }
        return SearchController._instance;
    }

    public async contextSearch(query:string){
        try {
            const res = await noCredentialsApiClient.get<Response<TSearchResultPlain>>(`/api/islam/quranic/context-search?query=${query}`);

            if (EnvGuard.isDevelopment)
                logger.info("Requested to : " + res.config.url)


            return SerializedResponseConverter.toSerializedResponse(res);
        } catch (e) {

            // So that if we use that variable even though ResponseCode is not OK, it should fail.
            const fallbackData = undefined as unknown as object as TSearchResultPlain;


            if (axios.isAxiosError(e)) {
                if (!e.response && e.request)
                    console.error("Network Error: Internet connection missing or server unreachable.");
                return SerializedResponseConverter.createErrorResponse<TSearchResultPlain>(
                    ResponseCodes.NETWORK_ERROR,
                    fallbackData
                );
            }

            logger.error("This should never happen. Unexpected error in VerseController.get(chapterNumber: number, verseNumber: number): " + e);
            return SerializedResponseConverter.createErrorResponse<TSearchResultPlain>(
                ResponseCodes.UNKNOWN_ERROR,
                fallbackData
            );
        }

    }

    public async textSearch(query:string){
        try {
            const res = await noCredentialsApiClient.get<Response<TSearchResultPlain>>(`/api/islam/quranic/text-search?query=${query}`);

            if (EnvGuard.isDevelopment)
                logger.info("Requested to : " + res.config.url)


            return SerializedResponseConverter.toSerializedResponse(res);
        } catch (e) {

            // So that if we use that variable even though ResponseCode is not OK, it should fail.
            const fallbackData = undefined as unknown as object as TSearchResultPlain;


            if (axios.isAxiosError(e)) {
                if (!e.response && e.request)
                    console.error("Network Error: Internet connection missing or server unreachable.");
                return SerializedResponseConverter.createErrorResponse<TSearchResultPlain>(
                    ResponseCodes.NETWORK_ERROR,
                    fallbackData
                );
            }

            logger.error("This should never happen. Unexpected error in VerseController.get(chapterNumber: number, verseNumber: number): " + e);
            return SerializedResponseConverter.createErrorResponse<TSearchResultPlain>(
                ResponseCodes.UNKNOWN_ERROR,
                fallbackData
            );
        }

    }



}