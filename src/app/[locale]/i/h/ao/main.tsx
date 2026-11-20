"use client";

import React from "react";
import { useLocale, useTranslations } from "next-intl";
import { LuBookOpen, LuListTree, LuScale, LuUsers } from "react-icons/lu";
import { TCorpusOverview } from "@/dto/Islam/Hadith/ArabicOnly";
import PageShell from "@/components/Page/PageShell";
import PageHeader from "@/components/Page/PageHeader";
import LoadingLink from "@/components/LoadingLink";
import HadithBreadcrumbs from "@/app/[locale]/i/h/ao/components/Breadcrumbs";
import SearchForm from "@/app/[locale]/i/h/ao/components/SearchForm";
import SettingsButton from "@/app/[locale]/i/h/ao/components/SettingsButton";
import Section, { Stat } from "@/app/[locale]/i/h/ao/components/Section";
import Distribution from "@/app/[locale]/i/h/ao/components/Distribution";
import NarratorLink from "@/app/[locale]/i/h/ao/components/NarratorLink";
import SourceNote from "@/app/[locale]/i/h/ao/components/SourceNote";
import { Amiri } from "@/fonts/Arabic/Amiri";
import { cn } from "@/lib/utils";

type Props = { overview: TCorpusOverview };

const Main: React.FC<Props> = ({ overview }) => {
  const locale = useLocale();
  const t = useTranslations("Pages.Islam.Hadith");
  const c = overview.counts;
  const n = (v: number) => v.toLocaleString(locale);
  const base = `/${locale}/i/h/ao`;
  const rijal = `/${locale}/i/jt/ao`;

  const explore = [
    { href: `${rijal}/narrator`, icon: <LuUsers size={20} />, key: "Narrators" as const, count: c.narrators },
    { href: `${rijal}/scholar`, icon: <LuScale size={20} />, key: "Scholars" as const, count: c.scholars },
    { href: `${base}/topic`, icon: <LuListTree size={20} />, key: "Topics" as const, count: c.topics },
    { href: `#books`, icon: <LuBookOpen size={20} />, key: "Books" as const, count: c.books },
  ];

  return (
    <PageShell size="xl">
      <HadithBreadcrumbs />

      <PageHeader
        eyebrow={t("Corpus.Eyebrow")}
        title={t("Corpus.Title")}
        native="موسوعة الحديث الشريف"
        nativeClassName={Amiri.className}
        description={t("Corpus.Description")}
        actions={<SettingsButton showToggles={false} />}
      />

      <SearchForm />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat label={t("Common.Hadiths")} value={n(c.hadiths)} />
        <Stat label={t("Common.Chains")} value={n(c.chains)} />
        <Stat label={t("Common.Narrators")} value={n(c.narrators)} />
        <Stat label={t("Common.Statements")} value={n(c.statements)} />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {explore.map((e) => (
          <LoadingLink
            key={e.key}
            href={e.href}
            className="group flex flex-col gap-3 rounded-2xl border border-border/60 bg-card/60 p-5 transition-colors hover:bg-card"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/60 bg-background/70 text-amber-600 dark:text-amber-400">
              {e.icon}
            </span>
            <span className="text-lg font-semibold">{t(`Corpus.Explore.${e.key}.Title`)}</span>
            <span className="text-sm text-muted-foreground">
              {t(`Corpus.Explore.${e.key}.Description`, { count: n(e.count) })}
            </span>
          </LoadingLink>
        ))}
      </div>

      <Section title={t("Corpus.GradeDistribution")} description={t("Common.GradeExplanation")}>
        <Distribution items={overview.gradeDistribution} kind="grade" />
      </Section>

      <Section id="books" title={t("Common.Books")} description={t("Corpus.BooksDescription", { count: n(c.books) })}>
        <div className="flex flex-col gap-8">
          {overview.categories.map((cat) => (
            <div key={cat.id} className="flex flex-col gap-3">
              <h3 dir="rtl" className={cn(Amiri.className, "flex items-center justify-end gap-3 text-2xl")}>
                <span className="text-sm font-sans text-muted-foreground">{t("Corpus.BookCount", { count: cat.books.length })}</span>
                {cat.name}
              </h3>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {cat.books.map((b) => (
                  <LoadingLink
                    key={b.id}
                    href={`${base}/${b.id}`}
                    className="flex items-center justify-between gap-3 rounded-xl border border-border/60 bg-background/60 px-4 py-3 transition-colors hover:bg-muted"
                  >
                    <span className="shrink-0 text-xs tabular-nums text-muted-foreground">{n(b.hadithCount)}</span>
                    <span dir="rtl" className="flex min-w-0 flex-col items-end">
                      <span className={cn(Amiri.className, "truncate text-lg")}>{b.name}</span>
                      <span className={cn(Amiri.className, "truncate text-sm text-muted-foreground")}>
                        {b.authorName}
                        {b.authorDeathYear ? ` (ت ${b.authorDeathYear}هـ)` : ""}
                      </span>
                    </span>
                  </LoadingLink>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title={t("Corpus.TopNarrators")}
        actions={
          <LoadingLink href={`${rijal}/narrator`} className="text-sm text-muted-foreground hover:text-foreground">
            {t("Common.ShowAll")} →
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
        title={t("Common.Topics")}
        actions={
          <LoadingLink href={`${base}/topic`} className="text-sm text-muted-foreground hover:text-foreground">
            {t("Common.ShowAll")} →
          </LoadingLink>
        }
      >
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
          {overview.rootTopics.map((tp) => (
            <LoadingLink
              key={tp.id}
              href={`${base}/topic/${tp.id}`}
              className="flex items-center justify-between gap-2 rounded-xl border border-border/60 bg-background/60 px-4 py-3 transition-colors hover:bg-muted"
            >
              <span className="text-xs tabular-nums text-muted-foreground">{n(tp.descendantCount)}</span>
              <span dir="rtl" className={cn(Amiri.className, "text-lg")}>{tp.name}</span>
            </LoadingLink>
          ))}
        </div>
      </Section>

      <SourceNote />
    </PageShell>
  );
};

export default Main;
