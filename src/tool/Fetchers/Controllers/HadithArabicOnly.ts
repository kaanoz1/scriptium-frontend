import { apiGet, Query } from "@/tool/Fetchers/Controllers/apiGet";
import {
  TBookComplete,
  TBookCategoryWithBooks,
  TCorpusOverview,
  THadithComplete,
  THadithListItem,
  THadithSearchMode,
  TIsnadGraph,
  TMeaningGroupComplete,
  TPaged,
  TSitemapHadithPage,
  TSitemapIdPage,
  TSitemapSummary,
  TTopicComplete,
} from "@/dto/Islam/Hadith/ArabicOnly";

export type HadithListFilters = {
  page?: number;
  pageSize?: number;
  grade?: number | null;
  type?: number | null;
  book?: number | null;
};

export type HadithSearchParams = HadithListFilters & {
  query: string;
  mode?: THadithSearchMode;
  category?: number | null;
};

const BASE = "/api/islam/hadith/ao";

/** Client of the Arabic-only hadith corpus endpoints. */
export class HadithArabicOnlyController {
  private static _instance: HadithArabicOnlyController | null = null;

  private constructor() {}

  public static getInstance(): HadithArabicOnlyController {
    if (!HadithArabicOnlyController._instance)
      HadithArabicOnlyController._instance = new HadithArabicOnlyController();
    return HadithArabicOnlyController._instance;
  }

  private request<T>(path: string, query?: Query) {
    return apiGet<T>(BASE, path, query, "HadithArabicOnlyController");
  }

  public overview() {
    return this.request<TCorpusOverview>("/overview");
  }

  public books() {
    return this.request<{ categories: TBookCategoryWithBooks[] }>("/books");
  }

  public book(bookId: number) {
    return this.request<TBookComplete>(`/book/${bookId}`);
  }

  public bookHadiths(bookId: number, filters: HadithListFilters = {}) {
    return this.request<TPaged<THadithListItem>>(`/book/${bookId}/hadiths`, filters);
  }

  public locate(bookId: number, number: number, pageSize?: number) {
    return this.request<{ page: number }>(`/book/${bookId}/locate/${number}`, { pageSize });
  }

  public hadith(bookId: number, number: number) {
    return this.request<THadithComplete>(`/hadith/${bookId}/${number}`);
  }

  public hadithIsnad(bookId: number, number: number) {
    return this.request<TIsnadGraph>(`/hadith/${bookId}/${number}/isnad`);
  }

  public topics() {
    return this.request<TTopicComplete>("/topics");
  }

  public topic(id: number) {
    return this.request<TTopicComplete>(`/topic/${id}`);
  }

  public group(id: number) {
    return this.request<TMeaningGroupComplete>(`/group/${id}`);
  }

  public groupHadiths(id: number, filters: HadithListFilters = {}) {
    return this.request<TPaged<THadithListItem>>(`/group/${id}/hadiths`, filters);
  }

  public groupIsnad(id: number) {
    return this.request<TIsnadGraph>(`/group/${id}/isnad`);
  }

  public search(params: HadithSearchParams) {
    return this.request<TPaged<THadithListItem>>("/search", params);
  }

  public quranVerseHadiths(chapter: number, verse: number, page = 1, pageSize = 20) {
    return this.request<TPaged<THadithListItem>>(`/quran/${chapter}/${verse}/hadiths`, { page, pageSize });
  }

  public sitemapSummary() {
    return this.request<TSitemapSummary>("/sitemap");
  }

  public sitemapHadiths(page: number) {
    return this.request<TSitemapHadithPage>(`/sitemap/hadiths/${page}`);
  }

  public sitemapGroups(page: number) {
    return this.request<TSitemapIdPage>(`/sitemap/groups/${page}`);
  }
}
