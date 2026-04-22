import { makeObservable, observable, computed } from "mobx";
import { SearchAlgorithm } from "@/components/Navbar/classes/SearchAlgorithm";

export class TranslationSearchAlgorithm extends SearchAlgorithm {
    public readonly key: string = "translation-search";
    private static _instance: TranslationSearchAlgorithm | null = null;

    private _methodology: TranslationSearchMethodology = TranslationSearchMethodology.ContextSearch;
    private _emphasize: boolean = false;
    private _filterSameVerse: boolean = false;

    public static getInstance(): TranslationSearchAlgorithm {
        if (this._instance === null)
            this._instance = new TranslationSearchAlgorithm();

        return this._instance;
    }

    private constructor() {
        super();

        makeObservable<TranslationSearchAlgorithm, "_methodology" | "_emphasize" | "_filterSameVerse">(this, {
            _methodology: observable,
            _emphasize: observable,
            _filterSameVerse: observable,
            methodology: computed,
            emphasize: computed,
            filterSameVerse: computed,
        });
    }

    public get methodology(): TranslationSearchMethodology {
        return this._methodology;
    }

    public set methodology(value: TranslationSearchMethodology) {
        this._methodology = value;
    }

    public get emphasize(): boolean {
        return this._emphasize;
    }

    public set emphasize(value: boolean) {
        this._emphasize = value;
    }

    public get filterSameVerse(): boolean {
        return this._filterSameVerse;
    }

    public set filterSameVerse(value: boolean) {
        this._filterSameVerse = value;
    }
}

export enum TranslationSearchMethodology {
    TextSearch,
    ContextSearch
}