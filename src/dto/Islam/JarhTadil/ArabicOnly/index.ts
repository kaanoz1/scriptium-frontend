import { TCodeCount, TNarratorPlain, TScholarPlain } from "@/dto/Islam/Hadith/ArabicOnly";

/**
 * Arabic jarh wa ta'dil corpus (api/islam/jarh-tadil/ao). Narrators, critics
 * and their statements share their shapes with the hadith corpus, whose
 * chains reference the same narrators; see "@/dto/Islam/Hadith/ArabicOnly".
 */
export type {
  TNarratorComplete,
  TNarratorLinkItem,
  TNarratorPlain,
  TScholarComplete,
  TScholarPlain,
  TStatementWithNarrator,
  TStatementWithScholar,
} from "@/dto/Islam/Hadith/ArabicOnly";

export type TJarhTadilCounts = {
  narrators: number;
  companions: number;
  scholars: number;
  statements: number;
  links: number;
};

export type TJarhTadilOverview = {
  counts: TJarhTadilCounts;
  rankDistribution: TCodeCount[];
  topNarrators: TNarratorPlain[];
  topScholars: TScholarPlain[];
};

export type TJarhTadilSitemapSummary = { narrators: number; scholars: number; pageSize: number };
