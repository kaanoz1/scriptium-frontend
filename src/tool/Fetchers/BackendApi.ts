import {ChapterController} from "@/tool/Fetchers/Controllers/Chapter";
import {VerseController} from "@/tool/Fetchers/Controllers/Verse";

export class BackendApi {
    public static ChapterController = ChapterController.getInstance();
    public static VerseController = VerseController.getInstance();
    // noinspection JSUnusedLocalSymbols
    private constructor() {
    }
}