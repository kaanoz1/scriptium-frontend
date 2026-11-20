"use client";

import React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { TBookCategoryWithBooks, THadithListItem, THadithSearchMode, TPaged } from "@/dto/Islam/Hadith/ArabicOnly";
import PageShell from "@/components/Page/PageShell";
import PageHeader from "@/components/Page/PageHeader";
import LoadingLink from "@/components/LoadingLink";
import HadithBreadcrumbs from "@/app/[locale]/i/h/ao/components/Breadcrumbs";
import SearchForm from "@/app/[locale]/i/h/ao/components/SearchForm";
import FilterChips from "@/app/[locale]/i/h/ao/components/FilterChips";
import HadithList from "@/app/[locale]/i/h/ao/components/HadithList";
import SettingsButton from "@/app/[locale]/i/h/ao/components/SettingsButton";
import { Amiri } from "@/fonts/Arabic/Amiri";
import { cn } from "@/lib/utils";

type Props = {
  query: string;
  mode: THadithSearchMode;
  results: TPaged<THadithListItem> | null;
  categories: TBookCategoryWithBooks[];
  category: number | null;
  book: number | null;
};

const Main: React.FC<Props> = ({ query, mode, results, categories, category, book }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations("Pages.Islam.Hadith");
  const bookName = book ? categories.flatMap((c) => c.books).find((b) => b.id === book)?.name : null;

  const href = (edit: (p: URLSearchParams) => void) => {
    const p = new URLSearchParams(searchParams.toString());
    p.delete("page");
    edit(p);
    return `${pathname}?${p.toString()}`;
  };

  const keep: Record<string, string> = {};
  if (book) keep.book = String(book);
  if (category) keep.category = String(category);

  return (
    <PageShell size="lg">
      <HadithBreadcrumbs items={[{ label: t("Common.Search") }]} />
      <PageHeader
        eyebrow={t("Search.Eyebrow")}
        title={t("Search.Title")}
        description={t("Search.Description")}
        actions={<SettingsButton showToggles={false} />}
      />
      <SearchForm key={`${query}|${mode}`} initialQuery={query} initialMode={mode} keep={keep} />

      {bookName && (
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">{t("Search.InBook")}:</span>
          <span dir="rtl" className={cn(Amiri.className, "text-base")}>{bookName}</span>
          <LoadingLink href={href((p) => p.delete("book"))} className="text-xs text-muted-foreground underline">
            {t("Common.Clear")}
          </LoadingLink>
        </div>
      )}

      {query && (
        <>
          {!book && categories.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5" dir="rtl">
              <LoadingLink
                href={href((p) => p.delete("category"))}
                className={cn("rounded-full border px-3 py-1 text-xs", !category ? "border-foreground/30 bg-foreground text-background" : "border-border/60 hover:bg-muted")}
              >
                {t("Search.AllCategories")}
              </LoadingLink>
              {categories.map((c) => (
                <LoadingLink
                  key={c.id}
                  href={href((p) => p.set("category", String(c.id)))}
                  className={cn(
                    Amiri.className,
                    "rounded-full border px-3 py-1 text-sm",
                    category === c.id ? "border-foreground/30 bg-foreground text-background" : "border-border/60 hover:bg-muted",
                  )}
                >
                  {c.name}
                </LoadingLink>
              ))}
            </div>
          )}
          <FilterChips />
        </>
      )}

      {results ? (
        <HadithList page={results} emptyText={t("Search.NoResults")} />
      ) : (
        <div className="rounded-2xl border border-dashed border-border/60 p-8 text-sm text-muted-foreground">
          <p className="mb-2 font-medium text-foreground">{t("Search.TipsTitle")}</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>{t("Search.Tips.Diacritics")}</li>
            <li>{t("Search.Tips.Smart")}</li>
            <li>{t("Search.Tips.Phrase")}</li>
          </ul>
        </div>
      )}
    </PageShell>
  );
};

export default Main;
