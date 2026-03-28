import {noCredentialsApiClient} from "@/lib/NoCredentialApiClient";
import {logger} from "@/lib/Logger";
import {SerializedResponseConverter} from "@/util/types/SerializedResponse";
import {Response} from "@/util/types/Response";
import axios from "axios";
import {ResponseCodes} from "@/util/types/ResponseCodes";
import {TChapterWithVerseCount} from "@/dto/Islam/Quran/Chapter/WithVerseCount";
import {TChapterWithVerses} from "@/dto/Islam/Quran/Chapter/WithVerses";
import {EnvGuard} from "@/util/EnvGuard"


export class ChapterController {
    private static _instance: ChapterController | null = null;

    private constructor() {
    }

    public static getInstance(): ChapterController {
        if (!this._instance) this._instance = new ChapterController();
        return this._instance;
    }

    public async list() {
        try {
            const res = await noCredentialsApiClient.get<Response<Array<TChapterWithVerseCount>>>("/api/islam/quranic/chapter/list");

            if (EnvGuard.isDevelopment)
                logger.info("Requested to : " + res.config.url)

            return SerializedResponseConverter.toSerializedResponse(res);
        } catch (e) {
            if (axios.isAxiosError(e)) {
                if (!e.response && e.request)
                    console.error("Network Error: Internet connection missing or server unreachable.");
                return SerializedResponseConverter.createErrorResponse<TChapterWithVerseCount[]>(
                    ResponseCodes.NETWORK_ERROR,
                    []
                );
            }


            logger.error("This should never happen. Unexpected error in ChapterController.list(): " + e);
            return SerializedResponseConverter.createErrorResponse<TChapterWithVerseCount[]>(
                ResponseCodes.UNKNOWN_ERROR,
                []
            );
        }
    }

    public async get(chapterNumber: number) {
        try {
            const res = await noCredentialsApiClient.get<Response<TChapterWithVerses>>(`/api/islam/quranic/chapter/${chapterNumber}`);

            logger.info("Requested to : " + res.config.url)

            return SerializedResponseConverter.toSerializedResponse(res);
        } catch (e) {

            const fallbackData = {
                sequence: 0,
                verses: [],
                meanings: [],
                name: "Unknown",
            }

            if (axios.isAxiosError(e)) {
                if (!e.response && e.request)
                    console.error("Network Error: Internet connection missing or server unreachable.");
                return SerializedResponseConverter.createErrorResponse<TChapterWithVerses>(
                    ResponseCodes.NETWORK_ERROR,
                    fallbackData
                );
            }


            logger.error("This should never happen. Unexpected error in ChapterController.list(): " + e);
            return SerializedResponseConverter.createErrorResponse<TChapterWithVerses>(
                ResponseCodes.UNKNOWN_ERROR,
                fallbackData
            );
        }
    }
}