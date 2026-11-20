/**
 * Client-side copy of the backend's ArabicNormalizer, for local filtering:
 * strips diacritics/tatweel, folds alef/ya/ta-marbuta variants and collapses
 * everything else to single spaces.
 */
export const normalizeArabic = (input: string): string =>
  input
    .replace(/[ً-ٰٟۖ-ۭـ]/g, "")
    .replace(/[أإآٱ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه")
    .replace(/ؤ/g, "و")
    .replace(/ئ/g, "ي")
    .replace(/[^ء-يٱ-ۓ٠-٩۰-۹a-zA-Z0-9]+/g, " ")
    .trim()
    .toLowerCase();
