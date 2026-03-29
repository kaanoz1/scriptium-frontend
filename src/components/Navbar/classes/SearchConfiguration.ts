import {SearchAlgorithm} from "@/components/Navbar/classes/SearchAlgorithm";
import {TranslationSearchAlgorithm} from "@/components/Navbar/classes/TranslationSearchAlgorithm";

export class SearchConfiguration {
    private static _instance: SearchConfiguration | null = null;

    public static getInstance(): SearchConfiguration {
        if (this._instance === null)
            this._instance = new SearchConfiguration();

        return this._instance;
    }

    public algorithm: SearchAlgorithm<unknown> = TranslationSearchAlgorithm.getInstance();

    private constructor() {}
}