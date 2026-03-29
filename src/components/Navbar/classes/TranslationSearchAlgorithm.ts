import {makeObservable, observable, action} from "mobx";
import {SearchAlgorithm} from "@/components/Navbar/classes/SearchAlgorithm";
import {BackendApi} from "@/tool/Fetchers/BackendApi";
import {SearchResultPlain} from "@/classes/Shared/SearchResult/Plain";

export class TranslationSearchAlgorithm extends SearchAlgorithm<SearchResultPlain> {

    public readonly key: string = "translation-search";
    private static _instance: TranslationSearchAlgorithm | null = null;

    private _methodlogy: TranslationSearchMethodology = TranslationSearchMethodology.ContextSearch


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


    public async search(query: string): Promise<SearchResultPlain> {
       const SearchController = BackendApi.SearchController;

       const response = this._methodlogy == TranslationSearchMethodology.TextSearch ? await SearchController.textSearch(query) : await SearchController.contextSearch(query);

       if(response.ok)
           return SearchResultPlain.fromJson(response.data);
       else
           throw new Error("Search failed");
    }
}



enum TranslationSearchMethodology {
    TextSearch,
    ContextSearch
}