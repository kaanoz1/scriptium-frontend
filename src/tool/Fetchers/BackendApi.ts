import {ChapterController} from "@/tool/Fetchers/Controllers/Chapter";
import {VerseController} from "@/tool/Fetchers/Controllers/Verse";
import {RootController} from "@/tool/Fetchers/Controllers/Root";
import {SearchController} from "@/tool/Fetchers/Controllers/Search";

export class BackendApi {
    public static ChapterController = ChapterController.getInstance();
    public static VerseController = VerseController.getInstance();
    public static RootController = RootController.getInstance();
    public static SearchController = SearchController.getInstance();

    // noinspection JSUnusedLocalSymbols
    private constructor() {
    }
}