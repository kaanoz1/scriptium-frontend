import {makeAutoObservable} from "mobx";
import {QuickNavigationResult} from "@/components/Navbar/classes/QuickNavigationResult";
import {ErrorResult} from "@/components/Navbar/classes/ErrorResult";
import {VerseTranslationWithVerse} from "@/classes/Islam/Quran/VerseTranslation/WithVerse";
import {RootPlain} from "@/classes/Islam/Quran/Root/Plain";
import {SearchAlgorithm} from "@/components/Navbar/classes/SearchAlgorithm";
import {
    TranslationSearchAlgorithm,
    TranslationSearchMethodology
} from "@/components/Navbar/classes/TranslationSearchAlgorithm";
import {BackendApi} from "@/tool/Fetchers/BackendApi";
import {RootSearchAlgorithm} from "@/components/Navbar/classes/RootSearchAlgorithm";


export class SearchBarState {
    private _query: string = "";
    private _result: Result | null = null;
    private _isLoading: boolean = false;
    private _searchAlgorithm: SearchAlgorithm = TranslationSearchAlgorithm.getInstance();

    private static _instance: SearchBarState | null = null;

    public static getInstance(): SearchBarState {
        if (this._instance === null)
            this._instance = new SearchBarState();

        return this._instance;
    }


    private constructor() {
        makeAutoObservable(this);
    }

    get algorithm() {
        return this._searchAlgorithm;
    }

    set algorithm(value: SearchAlgorithm) {
        this._searchAlgorithm = value;
    }


    get query(): string {
        return this._query;
    }

    set query(value: string) {
        this._result = null;
        this._query = value;
    }

    get result() {
        return this._result;
    }

    get isLoading() {
        return this._isLoading
    }


    async search() {
        if (!this._query.trim()) return;


        this._result = null;

        if (!this._query.trim() || this._query.trim().length == 1)
            return;

        this._isLoading = true;
        try {
            const quickNavigation = QuickNavigationResult.produce(this._query);

            if (quickNavigation) {
                this._result = quickNavigation;
                return;
            }


            if (this.algorithm instanceof TranslationSearchAlgorithm) {
                const controller = BackendApi.SearchController;

                if (this.algorithm.methodology === TranslationSearchMethodology.TextSearch) {
                    const result = await controller.textSearch(this._query);
                    this._result = result.data.verses.map(VerseTranslationWithVerse.fromJson);
                    return;
                }
                if (this.algorithm.methodology === TranslationSearchMethodology.ContextSearch) {
                    const result = await controller.contextSearch(this._query);
                    this._result = result.data.verses.map(VerseTranslationWithVerse.fromJson);
                    return;
                }
            } else if (this.algorithm instanceof RootSearchAlgorithm)
                throw new Error("Not implemented yet.")


        } catch {

            this._result = new ErrorResult("Error", "Failed to search. This might be a temporary issue. Please try again later.")


        } finally {
            this._isLoading = false;
        }
    }
}

type Result = QuickNavigationResult | ErrorResult | FetchedResult

type FetchedResult = VerseTranslationWithVerse[] | RootPlain[]