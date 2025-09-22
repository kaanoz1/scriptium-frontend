import { SectionLimitIndicator } from "../../Section/SectionLimitIndicator/SectionLimitIndicator";

export class ScriptureLimitIndicator {
  constructor(
    private readonly _sectionLimiters: ReadonlyArray<SectionLimitIndicator>
  ) {}

  getSectionLimiters() {
    return this._sectionLimiters;
  }

  getNthSectionLimiter(sectionNumber: number) {
    const index = sectionNumber - 1;

    if (index < 0 || index >= this.getSectionLimiters().length)
      return undefined;

    return this._sectionLimiters.at(index);
  }

  getSectionLimiterCount() {
    return this.getSectionLimiters().length;
  }

  isSectionExists(sectionNumber: number) {
    return sectionNumber <= this.getSectionLimiterCount();
  }

  isVerseExist(
    sectionNumber: number,
    chapterNumber: number,
    verseNumber: number
  ) {
    const sectionLimiter = this.getNthSectionLimiter(sectionNumber);
    if (sectionLimiter === undefined) return false;

    return sectionLimiter.isVerseExist(chapterNumber, verseNumber);
  }
}
