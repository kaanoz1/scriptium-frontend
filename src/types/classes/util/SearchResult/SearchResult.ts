import {
  SectionUpperMean,
  T_SectionUpperMeanConstructorParametersJSON,
} from "../../model/Section/SectionMean/SectionUpperMean/SectionUpperMean";
import {
  TranslationTextWithVerseUpperMean,
  T_TranslationTextWithVerseUpperMeanConstructorParametersJSON,
} from "../../model/TranslationText/TranslationText";

export type T_SearchResultConstructorParameters = {
  translationTexts: Array<TranslationTextWithVerseUpperMean>;
  sections: Array<SectionUpperMean>;
};
export type T_SearchResultConstructorParametersJSON = {
  translationTexts: Array<T_TranslationTextWithVerseUpperMeanConstructorParametersJSON>;
  sections: Array<T_SectionUpperMeanConstructorParametersJSON>;
};

export class SearchResult {
  private readonly _translationTexts: ReadonlyArray<TranslationTextWithVerseUpperMean>;
  private readonly _sections: ReadonlyArray<SectionUpperMean>;

  constructor(data: T_SearchResultConstructorParameters) {
    const { translationTexts, sections } = data;
    this._translationTexts = translationTexts;
    this._sections = sections;
  }

  getTranslationTexts() {
    return this._translationTexts;
  }

  getSection() {
    return this._sections;
  }

  getSearchResultArray() {
    return [...this.getSection(), ...this.getTranslationTexts()];
  }

  static createFromJSON(data: T_SearchResultConstructorParametersJSON) {
    const translationTexts = data.translationTexts.map(
      TranslationTextWithVerseUpperMean.createFromJSON
    );
    const sections = data.sections.map(SectionUpperMean.createFromJSON);

    return new SearchResult({ ...data, translationTexts, sections });
  }
}
