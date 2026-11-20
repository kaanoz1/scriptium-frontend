import { makeAutoObservable } from "mobx";
import { ARABIC_FONT_INSTANCES } from "@/fonts/Arabic/_index";
import { ArabicFont } from "@/fonts/Arabic/ArabicFont";

const STORAGE_KEY = "hadith_view_prefs";

/** Reading preferences for hadith texts (persisted in localStorage). */
export class HadithViewPreferences {
  private static _instance: HadithViewPreferences | null = null;

  public static MIN_FONT_SIZE = 16;
  public static MAX_FONT_SIZE = 56;

  private _font: ArabicFont = ARABIC_FONT_INSTANCES.Amiri;
  private _fontSize = 26;
  private _showIsnad = true;
  private _showIsnadTree = true;
  private _highlightNarrators = true;
  private _highlightQuran = true;
  private _hydrated = false;

  public static getInstance(): HadithViewPreferences {
    if (this._instance === null) this._instance = new HadithViewPreferences();
    return this._instance;
  }

  private constructor() {
    makeAutoObservable(this);
  }

  public hydrate() {
    if (this._hydrated || typeof window === "undefined") return;
    this._hydrated = true;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      const font = Object.values(ARABIC_FONT_INSTANCES).find((f) => f.name === parsed.font);
      if (font) this._font = font;
      // Assign the fields, not the setters: a setter persists, and would write
      // the defaults of the fields not read yet back to storage.
      if (typeof parsed.fontSize === "number") this._fontSize = HadithViewPreferences.clampSize(parsed.fontSize);
      if (typeof parsed.showIsnad === "boolean") this._showIsnad = parsed.showIsnad;
      if (typeof parsed.showIsnadTree === "boolean") this._showIsnadTree = parsed.showIsnadTree;
      if (typeof parsed.highlightNarrators === "boolean")
        this._highlightNarrators = parsed.highlightNarrators;
      if (typeof parsed.highlightQuran === "boolean") this._highlightQuran = parsed.highlightQuran;
    } catch {
      // Corrupt or blocked storage: keep defaults.
    }
  }

  private persist() {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          font: this._font.name,
          fontSize: this._fontSize,
          showIsnad: this._showIsnad,
          showIsnadTree: this._showIsnadTree,
          highlightNarrators: this._highlightNarrators,
          highlightQuran: this._highlightQuran,
        }),
      );
    } catch {
      // Storage unavailable (private mode): preferences last for this visit.
    }
  }

  get font() {
    return this._font;
  }
  set font(value: ArabicFont) {
    this._font = value;
    this.persist();
  }

  get fontSize() {
    return this._fontSize;
  }
  set fontSize(value: number) {
    this._fontSize = HadithViewPreferences.clampSize(value);
    this.persist();
  }

  private static clampSize(value: number) {
    return Math.min(
      HadithViewPreferences.MAX_FONT_SIZE,
      Math.max(HadithViewPreferences.MIN_FONT_SIZE, Math.round(value)),
    );
  }

  get showIsnad() {
    return this._showIsnad;
  }
  set showIsnad(value: boolean) {
    this._showIsnad = value;
    this.persist();
  }

  /** Draw the merged isnad tree on hadith and meaning-group pages. */
  get showIsnadTree() {
    return this._showIsnadTree;
  }
  set showIsnadTree(value: boolean) {
    this._showIsnadTree = value;
    this.persist();
  }

  get highlightNarrators() {
    return this._highlightNarrators;
  }
  set highlightNarrators(value: boolean) {
    this._highlightNarrators = value;
    this.persist();
  }

  get highlightQuran() {
    return this._highlightQuran;
  }
  set highlightQuran(value: boolean) {
    this._highlightQuran = value;
    this.persist();
  }
}
