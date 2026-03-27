import {autorun, makeAutoObservable} from "mobx";
import {ARABIC_FONT_INSTANCES} from "@/fonts/Arabic/_index";
import {QuranTranslationPreferences} from "@/configuration/UserPreferences/Islam/Quran/QuranTranslationPreferences";
import {ArabicFont} from "@/fonts/Arabic/ArabicFont";

export class QuranViewPreferences {
    private static _instance: QuranViewPreferences | null = null;

    private _shouldTranslationShown: boolean = true;
    private _shouldTransliterationShown: boolean = true;
    private _shouldVerseTextShown: boolean = true;

    private _selectedArabicFont: ArabicFont = ARABIC_FONT_INSTANCES.Amiri;
    private _fontSize: number = 32;
    public static MAX_FONT_SIZE: number = 108;
    public static MIN_FONT_SIZE: number = 8;


    public readonly TranslationPreferences: QuranTranslationPreferences = QuranTranslationPreferences.getInstance();

    public static getInstance(): QuranViewPreferences {
        if (this._instance === null)
            this._instance = new QuranViewPreferences();

        return this._instance;
    }

    private constructor() {
        makeAutoObservable(this);
    }

    public hydrate() {
        if (typeof window !== "undefined") {
            const savedData = localStorage.getItem("quran_view_prefs");
            if (savedData) {
                try {
                    const parsed = JSON.parse(savedData);
                    this._fontSize = parsed._fontSize ?? 32;
                    this._shouldTranslationShown = parsed._shouldTranslationShown ?? true;
                    this._shouldTransliterationShown = parsed._shouldTransliterationShown ?? true;
                    this._shouldVerseTextShown = parsed._shouldVerseTextShown ?? true;

                    if (parsed._selectedArabicFont?.name) {
                        const fontEntry = Object.values(ARABIC_FONT_INSTANCES).find(
                            f => f.name === parsed._selectedArabicFont.name
                        );
                        if (fontEntry) this._selectedArabicFont = fontEntry;
                    }
                } catch (error) {
                    console.error("Hydration failed", error);
                }
            }

            autorun(() => {
                localStorage.setItem("quran_view_prefs", JSON.stringify({
                    _fontSize: this._fontSize,
                    _shouldTranslationShown: this._shouldTranslationShown,
                    _shouldTransliterationShown: this._shouldTransliterationShown,
                    _shouldVerseTextShown: this._shouldVerseTextShown,
                    _selectedArabicFont: { name: this._selectedArabicFont.name }
                }));
            });
        }
    }

    public get shouldTranslationShown(): boolean {
        return this._shouldTranslationShown;
    }

    public set shouldTranslationShown(value: boolean) {
        this._shouldTranslationShown = value;
    }

    public toggleTranslationShown(): void {
        this.shouldTranslationShown = !this.shouldTranslationShown;
    }

    public get shouldTransliterationShown(): boolean {
        return this._shouldTransliterationShown;
    }

    public set shouldTransliterationShown(value: boolean) {
        this._shouldTransliterationShown = value;
    }

    public toggleTransliterationShown(): void {
        this.shouldTransliterationShown = !this.shouldTransliterationShown;
    }

    public get shouldVerseTextShown(): boolean {
        return this._shouldVerseTextShown;
    }

    public set shouldVerseTextShown(value: boolean) {
        this._shouldVerseTextShown = value;
    }

    public toggleVerseTextShown(): void {
        this.shouldVerseTextShown = !this.shouldVerseTextShown;
    }

    public get selectedArabicFont(): ArabicFont {
        return this._selectedArabicFont;
    }

    public set selectedArabicFont(value: ArabicFont) {
        this._selectedArabicFont = value;
    }

    public get fontSize(): number {
        return this._fontSize;
    }

    public set fontSize(value: number) {
        if (value < QuranViewPreferences.MIN_FONT_SIZE)
            this._fontSize = QuranViewPreferences.MIN_FONT_SIZE;
        else if (value > QuranViewPreferences.MAX_FONT_SIZE)
            this._fontSize = QuranViewPreferences.MAX_FONT_SIZE;
        else
            this._fontSize = value;
    }


}