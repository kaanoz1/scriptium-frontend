import {TVerseBoth} from "@/dto/Islam/Quran/Verse/Both";
import {EnvGuard} from "@/util/EnvGuard";
import {noCredentialsApiClient} from "@/lib/NoCredentialApiClient";
import {SerializedResponseConverter} from "@/util/types/SerializedResponse";
import {logger} from "@/lib/Logger";
import {Response} from "@/util/types/Response";
import axios from "axios";
import {ResponseCodes} from "@/util/types/ResponseCodes";

export class VerseController {
    private static _instance: VerseController | null = null;

    private constructor() {
    }

    public static getInstance(): VerseController {
        if (!this._instance) this._instance = new VerseController();
        return this._instance;
    }

    public async get(chapterNumber: number, verseNumber: number) {
        try {
            const res = await noCredentialsApiClient.get<Response<Array<TVerseBoth>>>(`/api/islam/quranic/verse/${chapterNumber}/${verseNumber}`);

            if (EnvGuard.isDevelopment)
                logger.info("Requested to : " + res.config.url)

            return SerializedResponseConverter.toSerializedResponse(res);
        } catch (e) {

            // So that if we use that variable even though ResponseCode is not OK, it should fail.
            const fallbackData = undefined as unknown as object as TVerseBoth;


            if (axios.isAxiosError(e)) {
                if (!e.response && e.request)
                    console.error("Network Error: Internet connection missing or server unreachable.");
                return SerializedResponseConverter.createErrorResponse<TVerseBoth>(
                    ResponseCodes.NETWORK_ERROR,
                    fallbackData
                );
            }

            logger.error("This should never happen. Unexpected error in VerseController.get(chapterNumber: number, verseNumber: number): " + e);
            return SerializedResponseConverter.createErrorResponse<TVerseBoth>(
                ResponseCodes.UNKNOWN_ERROR,
                fallbackData
            );
        }
    }

}