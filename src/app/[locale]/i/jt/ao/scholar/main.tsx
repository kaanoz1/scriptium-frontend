"use client";

import React, { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { TScholarPlain } from "@/dto/Islam/Hadith/ArabicOnly";
import PageShell from "@/components/Page/PageShell";
import PageHeader from "@/components/Page/PageHeader";
import LoadingLink from "@/components/LoadingLink";
import { Button } from "@/components/ui/button";
import JarhTadilBreadcrumbs from "@/app/[locale]/i/jt/ao/components/Breadcrumbs";
import { Amiri } from "@/fonts/Arabic/Amiri";
import { cn } from "@/lib/utils";
import { normalizeArabic } from "@/util/Islam/Hadith/normalizeArabic";

type Sort = "statements" | "death";

const STEP = 90;

const Main: React.FC<{ scholars: TScholarPlain[] }> = ({ scholars }) => {
  const locale = useLocale();
  const t = useTranslations("Pages.Islam.Hadith");
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState<Sort>("statements");
  const [limit, setLimit] = useState(STEP);

  const indexed = useMemo(
    () => scholars.map((s) => ({ s, key: normalizeArabic(`${s.knownAs} ${s.name}`) })),
    [scholars],
  );
  const shown = useMemo(() => {
    const f = normalizeArabic(filter);
    const list = indexed.filter((x) => !f || x.key.includes(f)).map((x) => x.s);
    return sort === "death" ? [...list].sort((a, b) => (a.deathYear || 9999) - (b.deathYear || 9999)) : list;
  }, [indexed, filter, sort]);

  return (
    <PageShell size="xl">
      <JarhTadilBreadcrumbs items={[{ label: t("Common.Scholars") }]} />
      <PageHeader
        eyebrow={t("Scholars.Eyebrow")}
        title={t("Scholars.Title")}
        native="أئمة الجرح والتعديل"
        nativeClassName={Amiri.className}
        description={t("Scholars.Description")}
      />
      <div className="flex flex-wrap items-center gap-3">
        <input
          type="search"
          dir="rtl"
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setLimit(STEP);
          }}
          placeholder={t("Scholars.FilterPlaceholder")}
          aria-label={t("Scholars.FilterPlaceholder")}
          className="h-10 min-w-0 flex-1 rounded-xl border border-border/60 bg-background/80 px-3 text-lg outline-none focus:border-foreground/30"
        />
        <div className="flex gap-1.5 text-xs">
          {(["statements", "death"] as Sort[]).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSort(s)}
              className={cn("rounded-full border px-3 py-1.5", sort === s ? "border-foreground/30 bg-foreground text-background" : "border-border/60 hover:bg-muted")}
            >
              {t(`Scholars.Sort.${s === "statements" ? "Statements" : "Death"}`)}
            </button>
          ))}
        </div>
      </div>
      <p className="text-sm text-muted-foreground tabular-nums">{t("Scholars.Count", { count: shown.length.toLocaleString(locale) })}</p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {shown.slice(0, limit).map((s) => (
          <LoadingLink
            key={s.id}
            href={`/${locale}/i/jt/ao/scholar/${s.id}`}
            className="flex items-center justify-between gap-3 rounded-2xl border border-border/60 bg-card/60 p-4 transition-colors hover:bg-card"
          >
            <span className="flex shrink-0 flex-col items-start text-xs tabular-nums text-muted-foreground">
              <span>{t("Scholars.StatementCount", { count: s.statementCount.toLocaleString(locale) })}</span>
              {s.deathYear > 0 && <span>{t("Common.DiedIn", { year: `${s.deathYear} ${t("Common.AH")}` })}</span>}
            </span>
            <span dir="rtl" className="flex min-w-0 flex-col items-start">
              <span className={cn(Amiri.className, "truncate text-xl")}>{s.knownAs}</span>
              <span className={cn(Amiri.className, "line-clamp-1 text-sm text-muted-foreground")}>{s.name}</span>
            </span>
          </LoadingLink>
        ))}
      </div>
      {shown.length > limit && (
        <Button variant="outline" onClick={() => setLimit((l) => l + STEP)} className="self-center">
          {t("Common.LoadMore", { shown: limit, total: shown.length })}
        </Button>
      )}
    </PageShell>
  );
};

export default Main;
