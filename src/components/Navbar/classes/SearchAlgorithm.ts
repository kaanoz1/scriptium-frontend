import {SearchResultPlain} from "@/classes/Shared/SearchResult/Plain";

export abstract class SearchAlgorithm<T> {
    public readonly abstract key: string;

    public abstract search(query: string): Promise<T>;
}