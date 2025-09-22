import { ChapterLimitIndicator } from "../../Chapter/ChapterLimitIndicator/ChapterLimitIndicator";

export class SectionLimitIndicator {
  constructor(
    private readonly _chapterLimiters: ReadonlyArray<ChapterLimitIndicator>
  ) {}

  getChapterLimiters() {
    return this._chapterLimiters;
  }

  getChapterLimiterCount() {
    return this.getChapterLimiters().length;
  }

  getNthChapterLimiter(chapterNumber: number) {
    const index = chapterNumber - 1;
    if (index < 0 || index >= this.getChapterLimiters().length)
      return undefined;
    return this.getChapterLimiters().at(index);
  }

  isChapterExists(chapterNumber: number) {
    return chapterNumber <= this.getChapterLimiterCount();
  }

  isVerseExist(chapterNumber: number, verseNumber: number) {
    const chapterLimiter = this.getNthChapterLimiter(chapterNumber);
    if (chapterLimiter === undefined) return false;

    return chapterLimiter.isVerseExist(verseNumber);
  }
}
