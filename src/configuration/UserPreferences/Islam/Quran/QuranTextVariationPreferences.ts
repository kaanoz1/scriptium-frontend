"use client"
import {autorun, makeAutoObservable} from "mobx";


export class QuranTextVariationPreferences {
    private static _instance: QuranTextVariationPreferences | null = null;
    private _preferredVariations: Array<QuranTextVariations> = [QuranTextVariations.Simple];

    public static getInstance(): QuranTextVariationPreferences {
        if (this._instance === null)
            this._instance = new QuranTextVariationPreferences();

        return this._instance;
    }

    private constructor() {
        makeAutoObservable(this);
    }

    public hydrate() {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("quran_variation_prefs");
            if (saved) {
                try {
                    this._preferredVariations = JSON.parse(saved);
                } catch (e) {
                    console.error("Failed to hydrate QuranTextVariationPreferences:", e);
                }
            }

            autorun(() => {
                localStorage.setItem("quran_variation_prefs", JSON.stringify(this._preferredVariations));
            });
        }
    }

    public addPreference(variation: QuranTextVariations) {
        if (this._preferredVariations.includes(variation)) return;
        this._preferredVariations.push(variation);
    }

    public isSelected(variation: QuranTextVariations): boolean {
        return this._preferredVariations.includes(variation);
    }

    public removePreference(variation: QuranTextVariations) {
        if (this._preferredVariations.length === 1) return;

        this._preferredVariations.splice(this._preferredVariations.indexOf(variation), 1);
    }

    public get preferredVariations(): ReadonlyArray<QuranTextVariations> {
        return Object.freeze([...this._preferredVariations]);
    }
}


export enum QuranTextVariations {
    Simple = "simple",
    SimpleMinimal = "simpleMinimal",
    simplePlain = "simplePlain",
    simpleClean = "simpleClean",
    uthmani = "uthmani",
    uthmaniMinimal = "uthmaniMinimal",
}