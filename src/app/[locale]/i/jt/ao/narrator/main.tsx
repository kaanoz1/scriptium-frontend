"use client";

import React, { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { LuSearch } from "react-icons/lu";
import { TNarratorPlain, TPaged } from "@/dto/Islam/Hadith/ArabicOnly";
import PageShell from "@/components/Page/PageShell";
import PageHeader from "@/components/Page/PageHeader";
import LoadingLink from "@/components/LoadingLink";
import { Button } from "@/components/ui/button";
import { useLoading } from "@/context/LoadingContext";
import JarhTadilBreadcrumbs from "@/app/[locale]/i/jt/ao/components/Breadcrumbs";
import Pagination from "@/app/[locale]/i/h/ao/components/Pagination";
import { RankBadge } from "@/app/[locale]/i/h/ao/components/Badges";
import { Amiri } from "@/fonts/Arabic/Amiri";
import { cn } from "@/lib/utils";
import { hijri, NARRATOR_RANKS, rankInfo, TONE_BADGE, TONE_STROKE } from "@/util/Islam/Hadith/Codes";

type Props = { page: TPaged<TNarratorPlain>; query: string; rank: number | null };

const Main: React.FC<Props> = ({ page, query, rank }) => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { startLoading } = useLoading();
  const t = useTranslations("Pages.Islam.Hadith");
  const [q, setQ] = useState(query);

  const withParams = (edit: (p: URLSearchParams) => void) => {
    const p = new URLSearchParams(searchParams.toString());
    p.delete("page");
    edit(p);
    const qs = p.toString();
    return `${pathname}${qs ? `?${qs}` : ""}`;
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    startLoading();
    router.push(withParams((p) => (q.trim() ? p.set("q", q.trim()) : p.delete("q"))));
  };

  const chip = "rounded-full border px-3 py-1 text-xs transition-colors";

  return (
    <PageShell size="xl">
      <JarhTadilBreadcrumbs items={[{ label: t("Common.Narrators") }]} />
      <PageHeader
        eyebrow={t("Narrators.Eyebrow")}
        title={t("Narrators.Title")}
        native="رجال الحديث"
        nativeClassName={Amiri.className}
        description={t("Narrators.Description")}
      />

      <form onSubmit={submit} className="flex items-center gap-2 rounded-2xl border border-border/60 bg-background/80 p-1.5 shadow-sm">
        <input
          type="search"
          dir="rtl"
          lang="ar"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={t("Narrators.SearchPlaceholder")}
          aria-label={t("Narrators.SearchPlaceholder")}
          className="min-w-0 flex-1 bg-transparent px-3 py-2 text-lg outline-none"
          maxLength={100}
        />
        <Button type="submit" size="lg" className="rounded-xl">
          <LuSearch />
          <span className="hidden sm:inline">{t("Search.Submit")}</span>
        </Button>
      </form>

      <div className="flex flex-wrap items-center gap-1.5">
        <span className="mr-1 text-xs text-muted-foreground">{t("Common.Rank")}:</span>
        <LoadingLink href={withParams((p) => p.delete("rank"))} className={cn(chip, rank === null ? "border-foreground/30 bg-foreground text-background" : "border-border/60 hover:bg-muted")}>
          {t("Common.All")}
        </LoadingLink>
        {Object.entries(NARRATOR_RANKS)
          .filter(([code]) => code !== "0")
          .map(([code, info]) => (
            <LoadingLink
              key={code}
              href={withParams((p) => p.set("rank", code))}
              className={cn(chip, rank === Number(code) ? TONE_BADGE[info.tone] + " ring-1 ring-current" : "border-border/60 hover:bg-muted")}
            >
              {t(`Ranks.${info.key}`)}
            </LoadingLink>
          ))}
      </div>

      <p className="text-sm text-muted-foreground tabular-nums">
        {t("Narrators.Found", { count: page.totalCount.toLocaleString(locale) })}
      </p>

      {page.items.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-border/60 p-10 text-center text-muted-foreground">{t("Common.NoResults")}</p>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {page.items.map((n) => {
            const info = rankInfo(n.rankNo);
            const died = hijri(n.deathYear, t("Common.AH"));
            return (
              <LoadingLink
                key={n.id}
                href={`/${locale}/i/jt/ao/narrator/${n.id}`}
                className="flex flex-col gap-2 rounded-2xl border border-border/60 bg-card/60 p-4 transition-colors hover:bg-card"
                style={{ borderInlineEndWidth: 4, borderInlineEndColor: TONE_STROKE[info.tone] }}
              >
                <div dir="rtl" className="flex flex-col">
                  <span className={cn(Amiri.className, "text-xl")}>{n.nickname || n.name}</span>
                  <span className={cn(Amiri.className, "line-clamp-1 text-sm text-muted-foreground")}>{n.name}</span>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <RankBadge rankNo={n.rankNo} rank={n.rank} />
                  <span className="text-xs tabular-nums text-muted-foreground">
                    {died && `${t("Common.DiedIn", { year: died })} · `}
                    {t("Narrators.HadithCount", { count: n.hadithCount.toLocaleString(locale) })}
                  </span>
                </div>
              </LoadingLink>
            );
          })}
        </div>
      )}

      <Pagination page={page.page} pageSize={page.pageSize} totalCount={page.totalCount} />
    </PageShell>
  );
};

export default Main;
