import {noCredentialsApiClient} from "@/lib/NoCredentialApiClient";
import {Response} from "@/util/types/Response";
import {EnvGuard} from "@/util/EnvGuard";
import {logger} from "@/lib/Logger";
import {SerializedResponseConverter} from "@/util/types/SerializedResponse";
import axios from "axios";
import {ResponseCodes} from "@/util/types/ResponseCodes";
import {TRootUpToQuran} from "@/dto/Islam/Quran/Root/UpToQuran";
import {TRootPlain} from "@/dto/Islam/Quran/Root/Plain";
import {TRootWithWordCount} from "@/dto/Islam/Quran/Root/WithWordCount";

export class RootController {
    private static _instance: RootController | null = null;

    private constructor() {
    }

    public static getInstance(): RootController {
        if (!RootController._instance) {
            RootController._instance = new RootController();
        }
        return RootController._instance;
    }

    public async get(latin: string){
        try {
            const res = await noCredentialsApiClient.get<Response<TRootUpToQuran>>(`/api/islam/quranic/root/${latin}`);

            if (EnvGuard.isDevelopment)
                logger.info("Requested to : " + res.config.url)


            return SerializedResponseConverter.toSerializedResponse(res);
        } catch (e) {

            // So that if we use that variable even though ResponseCode is not OK, it should fail.
            const fallbackData = undefined as unknown as object as TRootUpToQuran;


            if (axios.isAxiosError(e)) {
                if (!e.response && e.request)
                    console.error("Network Error: Internet connection missing or server unreachable.");
                return SerializedResponseConverter.createErrorResponse<TRootUpToQuran>(
                    ResponseCodes.NETWORK_ERROR,
                    fallbackData
                );
            }

            logger.error("This should never happen. Unexpected error in VerseController.get(chapterNumber: number, verseNumber: number): " + e);
            return SerializedResponseConverter.createErrorResponse<TRootUpToQuran>(
                ResponseCodes.UNKNOWN_ERROR,
                fallbackData
            );
        }

    }


    public async list(){
        try {
            const res = await noCredentialsApiClient.get<Response<Array<TRootPlain>>>(`/api/islam/quranic/root/list`);

            if (EnvGuard.isDevelopment)
                logger.info("Requested to : " + res.config.url)


            return SerializedResponseConverter.toSerializedResponse(res);
        } catch (e) {

            // So that if we use that variable even though ResponseCode is not OK, it should fail.
            const fallbackData = undefined as unknown as object as TRootPlain[];


            if (axios.isAxiosError(e)) {
                if (!e.response && e.request)
                    console.error("Network Error: Internet connection missing or server unreachable.");
                return SerializedResponseConverter.createErrorResponse<TRootPlain[]>(
                    ResponseCodes.NETWORK_ERROR,
                    fallbackData
                );
            }

            logger.error("This should never happen. Unexpected error in VerseController.get(chapterNumber: number, verseNumber: number): " + e);
            return SerializedResponseConverter.createErrorResponse<TRootPlain[]>(
                ResponseCodes.UNKNOWN_ERROR,
                fallbackData
            );
        }

    }

    public async listAdvanced(){
        try {
            const res = await noCredentialsApiClient.get<Response<Array<TRootWithWordCount>>>(`/api/islam/quranic/root/list/advanced`);

            if (EnvGuard.isDevelopment)
                logger.info("Requested to : " + res.config.url)


            return SerializedResponseConverter.toSerializedResponse(res);
        } catch (e) {

            // So that if we use that variable even though ResponseCode is not OK, it should fail.
            const fallbackData = undefined as unknown as object as TRootWithWordCount[];


            if (axios.isAxiosError(e)) {
                if (!e.response && e.request)
                    console.error("Network Error: Internet connection missing or server unreachable.");
                return SerializedResponseConverter.createErrorResponse<TRootWithWordCount[]>(
                    ResponseCodes.NETWORK_ERROR,
                    fallbackData
                );
            }

            logger.error("This should never happen. Unexpected error in VerseController.get(chapterNumber: number, verseNumber: number): " + e);
            return SerializedResponseConverter.createErrorResponse<TRootWithWordCount[]>(
                ResponseCodes.UNKNOWN_ERROR,
                fallbackData
            );
        }

    }
}