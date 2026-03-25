import { makeObservable, observable, action } from "mobx";
import { SearchAlgorithm } from "@/components/Navbar/classes/SearchAlgorithm";

export class TranslationSearchAlgorithm extends SearchAlgorithm {
    public readonly key: string = "translation-search";
    private static _instance: TranslationSearchAlgorithm | null = null;

    public emphasize: boolean = false;
    public filterSameVerse: boolean = false;

    public static getInstance(): TranslationSearchAlgorithm {
        if (this._instance === null)
            this._instance = new TranslationSearchAlgorithm();

        return this._instance;
    }

    private constructor() {
        super();

        makeObservable(this, {
            emphasize: observable,
            filterSameVerse: observable,
            setEmphasize: action,
            setFilterSameVerse: action
        });
    }

    public setEmphasize = (value: boolean) => {
        this.emphasize = value;
    }

    public setFilterSameVerse = (value: boolean) => {
        this.filterSameVerse = value;
    }
}