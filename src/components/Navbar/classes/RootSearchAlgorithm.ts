import {makeObservable} from "mobx";
import {SearchAlgorithm} from "@/components/Navbar/classes/SearchAlgorithm";

export class RootSearchAlgorithm extends SearchAlgorithm {

    public readonly key: string = "root-search"
    private static _instance: RootSearchAlgorithm | null = null;

    public static getInstance(): RootSearchAlgorithm {
        if (this._instance === null)
            this._instance = new RootSearchAlgorithm();

        return this._instance;
    }


    private constructor() {
        super();
        makeObservable(this);
    }
}