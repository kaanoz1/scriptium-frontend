export class QuickNavigationResult {
  public title: string;
  public url: string;
  public description: string;

  private static readonly MAX_CHAPTER = 114;

  private static readonly VERSE_COUNTS: ReadonlyArray<number> = [
    7, 286, 200, 176, 120, 165, 206, 75, 129, 109, 123, 111, 43, 52, 99, 128,
    111, 110, 98, 135, 112, 78, 118, 64, 77, 227, 93, 88, 69, 60, 34, 30, 73,
    54, 45, 83, 182, 88, 75, 85, 54, 53, 89, 59, 37, 35, 38, 29, 18, 45, 60, 49,
    62, 55, 78, 96, 29, 22, 24, 13, 14, 11, 11, 18, 12, 12, 30, 52, 52, 44, 28,
    28, 20, 56, 40, 31, 50, 40, 46, 42, 29, 19, 36, 25, 22, 17, 19, 26, 30, 20,
    15, 21, 11, 8, 8, 19, 5, 8, 8, 11, 11, 8, 3, 9, 5, 4, 7, 3, 6, 3, 5, 4, 5,
    6,
  ];

  protected constructor(title: string, url: string, description: string) {
    this.title = title;
    this.url = url;
    this.description = description;
  }

  private static getMaxVerse(chapter: number): number | null {
    const count = this.VERSE_COUNTS[chapter - 1];
    return count ?? null;
  }

  static produce(query: string): QuickNavigationResult | null {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return null;

    const parts = trimmedQuery.split(/[.:,;/"\s]+/).filter((p) => p !== "");

    const isNumeric = (val: string) => /^\?*\d+$/.test(val);

    if (parts.length >= 2 && isNumeric(parts[0]) && isNumeric(parts[1])) {
      const chapter = parseInt(parts[0], 10);
      const verse = parseInt(parts[1], 10);

      if (chapter < 1 || chapter > this.MAX_CHAPTER) return null;

      const maxVerse = this.getMaxVerse(chapter);
      if (maxVerse === null) return null;
      if (verse < 1 || verse > maxVerse) return null;

      return new QuickNavigationResult(
        `Chapter ${chapter}, Verse ${verse}`,
        `/i/q/${chapter}/${verse}`,
        `Go to chapter: ${chapter} for verse: ${verse}`,
      );
    }

    if (parts.length === 1 && isNumeric(parts[0])) {
      const chapter = parseInt(parts[0], 10);

      if (chapter < 1 || chapter > this.MAX_CHAPTER) return null;

      return new QuickNavigationResult(
        `Chapter ${chapter}`,
        `/i/q/${chapter}`,
        `Go to chapter: ${chapter}`,
      );
    }

    return null;
  }
}
