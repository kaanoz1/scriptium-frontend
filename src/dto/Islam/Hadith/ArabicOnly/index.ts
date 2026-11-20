/**
 * Wire types of the Arabic-only hadith corpus API (`/api/islam/hadith/ao`).
 * Mirrors `ScriptiumBackend.Dto.Derived.Islam.Hadith.ArabicOnly`.
 *
 * All text offsets (`start`/`end`, `matnStart`/`matnEnd`) are `[start, end)`
 * indices into the corresponding string. The source text contains no
 * characters outside the BMP, so they can be used with `String.slice` as-is.
 */

export type TPaged<T> = {
  items: T[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalIsLowerBound: boolean;
};

export type TCodeCount = { code: number; count: number };
export type TTextRange = { start: number; end: number };

export type TBookPlain = {
  id: number;
  name: string;
  authorName: string;
  authorDeathYear: number | null;
  categoryId: number;
  hadithCount: number;
};

export type TBookCount = { book: TBookPlain; count: number };

export type TBookCategoryPlain = { id: number; name: string };

export type TBookCategoryWithBooks = TBookCategoryPlain & { books: TBookPlain[] };

export type TBookComplete = {
  id: number;
  name: string;
  authorName: string;
  authorDeathYear: number | null;
  city: string | null;
  publisher: string | null;
  edition: string | null;
  category: TBookCategoryPlain;
  hadithCount: number;
  firstNumber: number;
  lastNumber: number;
  gradeDistribution: TCodeCount[];
  typeDistribution: TCodeCount[];
  chainCount: number;
  quranQuoteCount: number;
};

export type TNarratorPlain = {
  id: number;
  name: string;
  nickname: string;
  rankNo: number;
  rank: string | null;
  generation: number;
  deathYear: number | null;
  isStub: boolean;
  hadithCount: number;
};

export type TNarratorLinkItem = { narrator: TNarratorPlain; chainCount: number };

export type TScholarPlain = {
  id: number;
  knownAs: string;
  name: string;
  deathYear: number;
  rankNo: number;
  statementCount: number;
};

export type TStatementWithScholar = { id: number; text: string; scholar: TScholarPlain };
export type TStatementWithNarrator = { id: number; text: string; narrator: TNarratorPlain };

export type TNarratorComplete = Omit<TNarratorPlain, never> & {
  isBukhari: boolean;
  isMuslim: boolean;
  hasIkhtilat: boolean;
  hasTadlis: boolean;
  riwayaCount: number;
  birthYear: number | null;
  birthYearRaw: string | null;
  deathYearRaw: string | null;
  ageRaw: string | null;
  profession: string | null;
  lineage: string | null;
  residence: string | null;
  deathPlace: string | null;
  statements: TStatementWithScholar[];
  teachers: TNarratorLinkItem[];
  teacherCount: number;
  students: TNarratorLinkItem[];
  studentCount: number;
  books: TBookCount[];
  gradeDistribution: TCodeCount[];
};

export type TScholarComplete = {
  id: number;
  name: string;
  nickname: string | null;
  knownAs: string;
  title: string | null;
  generation: number;
  deathYear: number;
  rankNo: number;
  rank: string | null;
  statementCount: number;
  notes: string | null;
};

export type TMeaningGroupPlain = {
  id: number;
  grade: number;
  isQudsi: boolean;
  text: string;
  hadithCount: number;
  companionCount: number;
};

export type TTopicPlain = { id: number; name: string };

export type TTopicChild = {
  id: number;
  name: string;
  childCount: number;
  descendantCount: number;
  group: TMeaningGroupPlain | null;
};

export type TTopicComplete = {
  topic: TTopicPlain | null;
  path: TTopicPlain[];
  children: TTopicChild[];
  group: TMeaningGroupPlain | null;
};

export type TMeaningGroupComplete = {
  group: TMeaningGroupPlain;
  topicPaths: TTopicPlain[][];
  gradeDistribution: TCodeCount[];
  books: TBookCount[];
  chainCount: number;
  companions: TNarratorLinkItem[];
};

export type TIsnadNode = {
  narrator: TNarratorPlain;
  depth: number;
  chainCount: number;
  isAuthor: boolean;
};

export type TIsnadEdge = { teacherId: number; studentId: number; count: number };

export type TIsnadGraph = {
  nodes: TIsnadNode[];
  edges: TIsnadEdge[];
  chainCount: number;
  truncated: boolean;
  minEdgeCount: number;
};

export type THadithListItem = {
  id: number;
  book: TBookPlain;
  number: number;
  type: number;
  grade: number;
  meaningGroupId: number | null;
  matn: string;
  matnTruncated: boolean;
  highlights: TTextRange[] | null;
};

export type TNarratorMention = { start: number; end: number; narratorId: number | null };

export type TQuranQuote = {
  start: number;
  end: number;
  chapter: number | null;
  verseStart: number | null;
  verseEnd: number | null;
};

export type TSanadLink = { position: number; narratorId: number };

export type TSanadComplete = {
  id: number;
  grade: number;
  verdict: string;
  maxRank: number | null;
  length: number | null;
  narrators: TSanadLink[];
};

export type THadithComplete = {
  id: number;
  book: TBookPlain;
  categoryName: string;
  number: number;
  page: number;
  type: number;
  grade: number;
  tarafText: string | null;
  text: string;
  matnStart: number | null;
  matnEnd: number | null;
  mentions: TNarratorMention[];
  quotes: TQuranQuote[];
  sanads: TSanadComplete[];
  narrators: TNarratorPlain[];
  meaningGroup: TMeaningGroupPlain | null;
  topicPaths: TTopicPlain[][];
  otherNarrations: THadithListItem[];
  previousNumber: number | null;
  nextNumber: number | null;
};


export type TCorpusCounts = {
  books: number;
  hadiths: number;
  chains: number;
  narrators: number;
  scholars: number;
  statements: number;
  meaningGroups: number;
  topics: number;
  quranQuotes: number;
};

export type TCorpusOverview = {
  counts: TCorpusCounts;
  categories: TBookCategoryWithBooks[];
  gradeDistribution: TCodeCount[];
  typeDistribution: TCodeCount[];
  narratorRankDistribution: TCodeCount[];
  topNarrators: TNarratorPlain[];
  rootTopics: TTopicChild[];
};

export type TSitemapSummary = {
  hadiths: number;
  books: number;
  meaningGroups: number;
  pageSize: number;
};
export type TSitemapHadithPage = { hadiths: [number, number][] };
export type TSitemapIdPage = { ids: number[] };

export type THadithSearchMode = "Smart" | "Exact" | "Phrase";
