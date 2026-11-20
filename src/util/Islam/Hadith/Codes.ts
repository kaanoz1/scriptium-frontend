/**
 * Labels and colours of the hadith corpus' numeric codes. Keys refer to
 * `Pages.Islam.Hadith.Grades|Types|Ranks.<key>` translations; the Arabic
 * label is the source's own term and is always shown alongside.
 */

export type Tone =
  | "emerald"
  | "green"
  | "teal"
  | "sky"
  | "cyan"
  | "amber"
  | "orange"
  | "rose"
  | "red"
  | "violet"
  | "indigo"
  | "slate"
  | "gold";

export type GradeKey =
  | "NoChain"
  | "Sahih"
  | "Hasan"
  | "Daif"
  | "VeryWeak"
  | "AccusedOfForgery"
  | "Mawdu"
  | "Mawquf"
  | "Maqtu"
  | "NoSupport";

export type TypeKey = "Qudsi" | "Marfu" | "Mawquf" | "Maqtu";

export type RankKey =
  | "NotGraded"
  | "Companion"
  | "HighlyReliable"
  | "Reliable"
  | "Truthful"
  | "TruthfulWithErrors"
  | "Acceptable"
  | "UnknownCondition"
  | "Weak"
  | "Unknown"
  | "Abandoned"
  | "Suspected"
  | "AttributedWithLying";

type CodeInfo<K extends string> = { key: K; arabic: string; tone: Tone };

export const HADITH_GRADES: Record<number, CodeInfo<GradeKey>> = {
  [-1]: { key: "NoChain", arabic: "بدون سند", tone: "slate" },
  0: { key: "Sahih", arabic: "صحيح", tone: "emerald" },
  1: { key: "Hasan", arabic: "حسن", tone: "teal" },
  2: { key: "Daif", arabic: "ضعيف", tone: "amber" },
  3: { key: "VeryWeak", arabic: "شديد الضعف", tone: "orange" },
  4: { key: "AccusedOfForgery", arabic: "متهم بالوضع", tone: "rose" },
  5: { key: "Mawdu", arabic: "موضوع", tone: "red" },
  6: { key: "Mawquf", arabic: "موقوف", tone: "violet" },
  7: { key: "Maqtu", arabic: "مقطوع", tone: "indigo" },
  8: { key: "NoSupport", arabic: "بدون شواهد أو سند", tone: "slate" },
};

/** Grade codes in display order. */
export const GRADE_ORDER = [0, 1, 2, 3, 4, 5, 6, 7, 8, -1];

export const HADITH_TYPES: Record<number, CodeInfo<TypeKey>> = {
  0: { key: "Qudsi", arabic: "قدسي", tone: "gold" },
  1: { key: "Marfu", arabic: "مرفوع", tone: "emerald" },
  2: { key: "Mawquf", arabic: "موقوف", tone: "violet" },
  3: { key: "Maqtu", arabic: "مقطوع", tone: "indigo" },
};

export const NARRATOR_RANKS: Record<number, CodeInfo<RankKey>> = {
  0: { key: "NotGraded", arabic: "غير مصنف", tone: "slate" },
  1: { key: "Companion", arabic: "صحابي", tone: "gold" },
  2: { key: "HighlyReliable", arabic: "ثقة حافظ", tone: "emerald" },
  3: { key: "Reliable", arabic: "ثقة", tone: "green" },
  4: { key: "Truthful", arabic: "صدوق", tone: "teal" },
  5: { key: "TruthfulWithErrors", arabic: "صدوق يهم", tone: "sky" },
  6: { key: "Acceptable", arabic: "مقبول", tone: "cyan" },
  7: { key: "UnknownCondition", arabic: "مجهول الحال", tone: "slate" },
  8: { key: "Weak", arabic: "ضعيف", tone: "amber" },
  9: { key: "Unknown", arabic: "مجهول", tone: "slate" },
  10: { key: "Abandoned", arabic: "متروك", tone: "orange" },
  11: { key: "Suspected", arabic: "متهم", tone: "rose" },
  12: { key: "AttributedWithLying", arabic: "كذاب", tone: "red" },
};

export const gradeInfo = (code: number) => HADITH_GRADES[code] ?? HADITH_GRADES[-1];
export const typeInfo = (code: number) => HADITH_TYPES[code] ?? HADITH_TYPES[1];
export const rankInfo = (code: number) => NARRATOR_RANKS[code] ?? NARRATOR_RANKS[0];

/** Badge classes per tone (literal strings so Tailwind keeps them). */
export const TONE_BADGE: Record<Tone, string> = {
  emerald: "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  green: "border-green-500/30 bg-green-500/10 text-green-700 dark:text-green-300",
  teal: "border-teal-500/30 bg-teal-500/10 text-teal-700 dark:text-teal-300",
  sky: "border-sky-500/30 bg-sky-500/10 text-sky-700 dark:text-sky-300",
  cyan: "border-cyan-500/30 bg-cyan-500/10 text-cyan-700 dark:text-cyan-300",
  amber: "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300",
  orange: "border-orange-500/30 bg-orange-500/10 text-orange-700 dark:text-orange-300",
  rose: "border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-300",
  red: "border-red-500/30 bg-red-500/10 text-red-700 dark:text-red-300",
  violet: "border-violet-500/30 bg-violet-500/10 text-violet-700 dark:text-violet-300",
  indigo: "border-indigo-500/30 bg-indigo-500/10 text-indigo-700 dark:text-indigo-300",
  slate: "border-slate-500/30 bg-slate-500/10 text-slate-700 dark:text-slate-300",
  gold: "border-yellow-500/40 bg-yellow-500/10 text-yellow-700 dark:text-yellow-300",
};

/** Solid fill per tone, for bars and graph nodes. */
export const TONE_FILL: Record<Tone, string> = {
  emerald: "bg-emerald-500",
  green: "bg-green-500",
  teal: "bg-teal-500",
  sky: "bg-sky-500",
  cyan: "bg-cyan-500",
  amber: "bg-amber-500",
  orange: "bg-orange-500",
  rose: "bg-rose-500",
  red: "bg-red-600",
  violet: "bg-violet-500",
  indigo: "bg-indigo-500",
  slate: "bg-slate-400",
  gold: "bg-yellow-500",
};

/** Stroke colour per tone for SVG (CSS colour values). */
export const TONE_STROKE: Record<Tone, string> = {
  emerald: "#10b981",
  green: "#22c55e",
  teal: "#14b8a6",
  sky: "#0ea5e9",
  cyan: "#06b6d4",
  amber: "#f59e0b",
  orange: "#f97316",
  rose: "#f43f5e",
  red: "#dc2626",
  violet: "#8b5cf6",
  indigo: "#6366f1",
  slate: "#94a3b8",
  gold: "#eab308",
};

/** "256 AH" style Hijri year, or null. */
export const hijri = (year: number | null | undefined, suffix: string) =>
  year && year > 0 ? `${year} ${suffix}` : null;

/** Locale-formatted integer. */
export const fmt = (n: number, locale: string) => n.toLocaleString(locale);
