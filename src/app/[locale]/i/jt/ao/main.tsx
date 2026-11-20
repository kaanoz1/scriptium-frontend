"use client";

import React from "react";
import { useLocale, useTranslations } from "next-intl";
import { LuScale, LuUsers } from "react-icons/lu";
import { TJarhTadilOverview } from "@/dto/Islam/JarhTadil/ArabicOnly";
import PageShell from "@/components/Page/PageShell";
import PageHeader from "@/components/Page/PageHeader";
import LoadingLink from "@/components/LoadingLink";
import JarhTadilBreadcrumbs from "@/app/[locale]/i/jt/ao/components/Breadcrumbs";
import Section, { Stat } from "@/app/[locale]/i/h/ao/components/Section";
import Distribution from "@/app/[locale]/i/h/ao/components/Distribution";
import NarratorLink from "@/app/[locale]/i/h/ao/components/NarratorLink";
import SourceNote from "@/app/[locale]/i/h/ao/components/SourceNote";
import { Amiri } from "@/fonts/Arabic/Amiri";
import { cn } from "@/lib/utils";

type Props = { overview: TJarhTadilOverview };

const Main: React.FC<Props> = ({ overview }) => {
  const locale = useLocale();
  const t = useTranslations("Pages.Islam.JarhTadil");
  const ht = useTranslations("Pages.Islam.Hadith");
  const c = overview.counts;
  const n = (v: number) => v.toLocaleString(locale);
  const base = `/${locale}/i/jt/ao`;

  const explore = [
    { href: `${base}/narrator`, icon: <LuUsers size={20} />, key: "Narrators" as const, count: c.narrators },
    { href: `${base}/scholar`, icon: <LuScale size={20} />, key: "Scholars" as const, count: c.scholars },
  ];

  return (
    <PageShell size="xl">
      <JarhTadilBreadcrumbs />

      <PageHeader
        eyebrow={t("Corpus.Eyebrow")}
        title={t("Corpus.Title")}
        native="الجرح والتعديل"
        nativeClassName={Amiri.className}
        description={t("Corpus.Description")}
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat label={ht("Common.Narrators")} value={n(c.narrators)} />
        <Stat label={t("Corpus.Companions")} value={n(c.companions)} />
        <Stat label={t("Corpus.Critics")} value={n(c.scholars)} />
        <Stat label={ht("Common.Statements")} value={n(c.statements)} />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {explore.map((e) => (
          <LoadingLink
            key={e.key}
            href={e.href}
            className="group flex flex-col gap-3 rounded-2xl border border-border/60 bg-card/60 p-5 transition-colors hover:bg-card"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/60 bg-background/70 text-red-600 dark:text-red-400">
              {e.icon}
            </span>
            <span className="text-lg font-semibold">{t(`Corpus.Explore.${e.key}.Title`)}</span>
            <span className="text-sm text-muted-foreground">
              {t(`Corpus.Explore.${e.key}.Description`, { count: n(e.count) })}
            </span>
          </LoadingLink>
        ))}
      </div>

      <Section title={t("Corpus.RankDistribution")} description={t("Corpus.RankDistributionDescription")}>
        <Distribution items={overview.rankDistribution} kind="rank" hrefFor={(code) => `${base}/narrator?rank=${code}`} />
      </Section>

      <Section
        title={t("Corpus.TopNarrators")}
        actions={
          <LoadingLink href={`${base}/narrator`} className="text-sm text-muted-foreground hover:text-foreground">
            {ht("Common.ShowAll")} →
          </LoadingLink>
        }
      >
        <div className="flex flex-wrap justify-end gap-2" dir="rtl">
          {overview.topNarrators.map((nr) => (
            <NarratorLink key={nr.id} narrator={nr} count={nr.hadithCount} />
          ))}
        </div>
      </Section>

      <Section
        title={t("Corpus.TopScholars")}
        actions={
          <LoadingLink href={`${base}/scholar`} className="text-sm text-muted-foreground hover:text-foreground">
            {ht("Common.ShowAll")} →
          </LoadingLink>
        }
      >
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {overview.topScholars.map((s) => (
            <LoadingLink
              key={s.id}
              href={`${base}/scholar/${s.id}`}
              className="flex items-center justify-between gap-3 rounded-xl border border-border/60 bg-background/60 px-4 py-3 transition-colors hover:bg-muted"
            >
              <span className="shrink-0 text-xs tabular-nums text-muted-foreground">{n(s.statementCount)}</span>
              <span dir="rtl" className="flex min-w-0 flex-col items-end">
                <span className={cn(Amiri.className, "truncate text-lg")}>{s.knownAs}</span>
                {s.deathYear > 0 && (
                  <span className={cn(Amiri.className, "text-sm text-muted-foreground")}>{`ت ${s.deathYear}هـ`}</span>
                )}
              </span>
            </LoadingLink>
          ))}
        </div>
      </Section>

      <SourceNote />
    </PageShell>
  );
};

export default Main;
