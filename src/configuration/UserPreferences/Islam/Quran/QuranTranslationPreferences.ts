"use client"

"use client"

import {TranslationPlain} from "@/classes/Islam/Quran/Translation/Plain";
import {VerseTranslationComplete} from "@/classes/Islam/Quran/VerseTranslation/Complete";
import {TranslationComplete} from "@/classes/Islam/Quran/Translation/Complete";
import {TTranslationComplete} from "@/dto/Islam/Quran/Translation/Complete";
import {autorun, makeAutoObservable} from "mobx";
import {BackendApi} from "@/tool/Fetchers/BackendApi";


type HasTranslationId = TranslationPlain | VerseTranslationComplete;


export class QuranTranslationPreferences {
    private static _instance: QuranTranslationPreferences | null = null;
    private readonly defaultTranslationId = 1;


    private _allTranslations: Array<TranslationComplete> = [];
    private _preferredTranslations: Array<TranslationComplete> = [];

    private constructor() {
        makeAutoObservable(this);
        this.preferredTranslations = this._allTranslations.filter(t => t.id === this.defaultTranslationId);
    }

    public async initializeAsync() {
        const translationsPlain = await BackendApi.TranslationController.list();
        console.log(translationsPlain)
        this._allTranslations = translationsPlain.data.map(TranslationComplete.fromJson);
        this.preferredTranslations = this._allTranslations.filter(t => t.id === this.defaultTranslationId);

    }

    public length() {
        return this._preferredTranslations.length
    }

    public hydrate() {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("quran_translation_prefs");
            if (saved) {
                try {
                    const preferredIds: number[] = JSON.parse(saved);
                    this._preferredTranslations = this._allTranslations.filter(t =>
                        preferredIds.includes(t.id)
                    );
                } catch (e) {
                    console.error("Failed to hydrate QuranTranslationPreferences:", e);
                }
            }

            autorun(() => {
                const idsToSave = this._preferredTranslations.map(t => t.id);
                localStorage.setItem("quran_translation_prefs", JSON.stringify(idsToSave));
            });
        }
    }

    public static getInstance(): QuranTranslationPreferences {
        if (this._instance === null)
            this._instance = new QuranTranslationPreferences();

        return this._instance;
    }

    public get preferredTranslations(): Array<TranslationComplete> {
        return this._preferredTranslations;
    }

    public set preferredTranslations(value: Array<TranslationComplete>) {
        this._preferredTranslations = value;
    }

    public addPreferredTranslation(translation: TranslationComplete): void {

        if (!this.preferredTranslations.some(t => t.id === translation.id))
            this.preferredTranslations.push(translation);
    }

    public get allTranslations(): Array<TranslationComplete> {
        return this._allTranslations;
    }

    public isPreferred(translation: TranslationComplete): boolean {
        return this.preferredTranslations.some(t => t.id === translation.id);
    }

    private getTranslationId(item: HasTranslationId): number {
        return item instanceof TranslationPlain ? item.id : item.translation.id;
    }

    public filter<T extends HasTranslationId>(data: T[]): T[] {
        const preferredIds = new Set(this._preferredTranslations.map(t => t.id));
        return data.filter(item => preferredIds.has(this.getTranslationId(item)));
    }

    public removePreferred(translation: TranslationComplete): void {
        this._preferredTranslations = this._preferredTranslations.filter(t => t.id !== translation.id);
    }

    public order<T extends HasTranslationId>(data: T[]): T[] {
        let items = data;
        if (data.length !== this._preferredTranslations.length) {
            items = this.filter(data);
        }

        const orderMap = new Map(this._preferredTranslations.map((t, i) => [t.id, i]));

        return [...items].sort((a, b) => {
            const rankA = orderMap.get(this.getTranslationId(a)) ?? 0;
            const rankB = orderMap.get(this.getTranslationId(b)) ?? 0;
            return rankA - rankB;
        });
    }

    public initializeTranslations(translations: Array<TranslationComplete>): void {
        this._allTranslations = translations;
        this.preferredTranslations = translations.filter(t => t.id === this.defaultTranslationId);
    }

}

