import { apiGet, Query } from "@/tool/Fetchers/Controllers/apiGet";
import { HadithListFilters } from "@/tool/Fetchers/Controllers/HadithArabicOnly";
import { THadithListItem, TPaged, TSitemapIdPage } from "@/dto/Islam/Hadith/ArabicOnly";
import {
  TJarhTadilOverview,
  TJarhTadilSitemapSummary,
  TNarratorComplete,
  TNarratorLinkItem,
  TNarratorPlain,
  TScholarComplete,
  TScholarPlain,
  TStatementWithNarrator,
} from "@/dto/Islam/JarhTadil/ArabicOnly";

export type NarratorListParams = {
  query?: string;
  rank?: number | null;
  generation?: number | null;
  bukhari?: boolean;
  muslim?: boolean;
  page?: number;
  pageSize?: number;
};

const BASE = "/api/islam/jarh-tadil/ao";

/** Client of the Arabic-only jarh wa ta'dil (narrator criticism) endpoints. */
export class JarhTadilArabicOnlyController {
  private static _instance: JarhTadilArabicOnlyController | null = null;

  private constructor() {}

  public static getInstance(): JarhTadilArabicOnlyController {
    if (!JarhTadilArabicOnlyController._instance)
      JarhTadilArabicOnlyController._instance = new JarhTadilArabicOnlyController();
    return JarhTadilArabicOnlyController._instance;
  }

  private request<T>(path: string, query?: Query) {
    return apiGet<T>(BASE, path, query, "JarhTadilArabicOnlyController");
  }

  public overview() {
    return this.request<TJarhTadilOverview>("/overview");
  }

  public narrators(params: NarratorListParams = {}) {
    return this.request<TPaged<TNarratorPlain>>("/narrators", params);
  }

  public narrator(id: number) {
    return this.request<TNarratorComplete>(`/narrator/${id}`);
  }

  public narratorHadiths(id: number, filters: HadithListFilters = {}) {
    return this.request<TPaged<THadithListItem>>(`/narrator/${id}/hadiths`, filters);
  }

  public narratorTeachers(id: number, page = 1, pageSize = 50) {
    return this.request<TPaged<TNarratorLinkItem>>(`/narrator/${id}/teachers`, { page, pageSize });
  }

  public narratorStudents(id: number, page = 1, pageSize = 50) {
    return this.request<TPaged<TNarratorLinkItem>>(`/narrator/${id}/students`, { page, pageSize });
  }

  public scholars() {
    return this.request<{ scholars: TScholarPlain[] }>("/scholars");
  }

  public scholar(id: number) {
    return this.request<TScholarComplete>(`/scholar/${id}`);
  }

  public scholarStatements(id: number, page = 1, pageSize = 50) {
    return this.request<TPaged<TStatementWithNarrator>>(`/scholar/${id}/statements`, { page, pageSize });
  }

  public sitemapSummary() {
    return this.request<TJarhTadilSitemapSummary>("/sitemap");
  }

  public sitemapNarrators(page: number) {
    return this.request<TSitemapIdPage>(`/sitemap/narrators/${page}`);
  }
}
