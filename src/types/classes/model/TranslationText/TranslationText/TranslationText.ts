import {
  Footnote,
  T_FootnoteConstructorParametersJSON,
} from "../../Footnote/Footnote";
import {
  Translation,
  T_TranslationConstructorParametersJSON,
} from "../../Translation/Translation/Translation";

export type T_TranslationTextConstructorParameters = {
  text: string;
  translation: Translation;
  footNotes: Array<Footnote>;
};
export type T_TranslationTextConstructorParametersJSON = {
  text: string;
  translation: T_TranslationConstructorParametersJSON;
  footNotes: Array<T_FootnoteConstructorParametersJSON>;
};

export class TranslationText {
  private readonly text: string;
  private readonly translation: Readonly<Translation>;
  private readonly footNotes: ReadonlyArray<Footnote>;

  constructor(data: T_TranslationTextConstructorParameters) {
    this.text = data.text;
    this.translation = data.translation;
    this.footNotes = data.footNotes;
  }

  static createFromJSON(
    data: T_TranslationTextConstructorParametersJSON
  ): TranslationText {
    const translation = Translation.createFromJSON(data.translation);
    const footNotes = data.footNotes.map(Footnote.createFromJSON);
    return new TranslationText({ ...data, translation, footNotes });
  }

  getText(): string {
    return this.text;
  }

  getTranslation(): Readonly<Translation> {
    return Object.freeze(this.translation);
  }

  getFootnotes(): ReadonlyArray<Footnote> {
    return Object.freeze([...this.footNotes]);
  }
}
