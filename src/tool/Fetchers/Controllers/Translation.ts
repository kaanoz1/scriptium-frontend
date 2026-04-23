import {noCredentialsApiClient} from "@/lib/NoCredentialApiClient";
import {TTranslationComplete} from "@/dto/Islam/Quran/Translation/Complete";
import {EnvGuard} from "@/util/EnvGuard";
import {logger} from "@/lib/Logger";
import {SerializedResponseConverter} from "@/util/types/SerializedResponse";
import {Response} from "@/util/types/Response";
import axios from "axios";
import {ResponseCodes} from "@/util/types/ResponseCodes";

export class TranslationController {
    private static _instance: TranslationController | null = null;

    private constructor() {
    }

    public static getInstance(): TranslationController {
        if (!TranslationController._instance) {
            TranslationController._instance = new TranslationController();
        }
        return TranslationController._instance;
    }

    public async list() {
        try {
            const res = await noCredentialsApiClient.get<Response<TTranslationComplete[]>>(`/api/islam/quranic/translation/list`);

            if (EnvGuard.isDevelopment)
                logger.info("Requested to : " + res.config.url)


            return SerializedResponseConverter.toSerializedResponse(res);
        } catch (e) {

            const fallbackData = undefined as unknown as object as TTranslationComplete[];


            if (axios.isAxiosError(e)) {
                if (!e.response && e.request)
                    console.error("Network Error: Internet connection missing or server unreachable.");
                return SerializedResponseConverter.createErrorResponse<TTranslationComplete[]>(
                    ResponseCodes.NETWORK_ERROR,
                    fallbackData
                );
            }

            logger.error("This should never happen. Unexpected error in VerseController.get(chapterNumber: number, verseNumber: number): " + e);
            return SerializedResponseConverter.createErrorResponse<TTranslationComplete[]>(
                ResponseCodes.UNKNOWN_ERROR,
                fallbackData
            );
        }

    }

}