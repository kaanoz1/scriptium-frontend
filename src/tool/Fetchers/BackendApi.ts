import {ChapterController} from "@/tool/Fetchers/Controllers/Chapter";

export class BackendApi {
    public static ChapterController = ChapterController.getInstance();

    // noinspection JSUnusedLocalSymbols
    private constructor() {
    }
}