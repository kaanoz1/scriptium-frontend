"use client";

import React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { THadithListItem, TIsnadGraph, TMeaningGroupComplete, TPaged } from "@/dto/Islam/Hadith/ArabicOnly";
import PageShell from "@/components/Page/PageShell";
import LoadingLink from "@/components/LoadingLink";
import HadithBreadcrumbs from "@/app/[locale]/i/h/ao/components/Breadcrumbs";
import Section, { Stat } from "@/app/[locale]/i/h/ao/components/Section";
import Distribution from "@/app/[locale]/i/h/ao/components/Distribution";
import FilterChips from "@/app/[locale]/i/h/ao/components/FilterChips";
import HadithList from "@/app/[locale]/i/h/ao/components/HadithList";
import IsnadTree from "@/app/[locale]/i/h/ao/components/IsnadTree";
import NarratorLink from "@/app/[locale]/i/h/ao/components/NarratorLink";
import SettingsButton from "@/app/[locale]/i/h/ao/components/SettingsButton";
import ReadingText from "@/app/[locale]/i/h/ao/components/ReadingText";
import SourceNote from "@/app/[locale]/i/h/ao/components/SourceNote";
import { GradeBadge } from "@/app/[locale]/i/h/ao/components/Badges";
import { Amiri } from "@/fonts/Arabic/Amiri";
import { cn } from "@/lib/utils";

type Props = {
  group: TMeaningGroupComplete;
  hadiths: TPaged<THadithListItem>;
  isnad: TIsnadGraph | null;
  activeBook: number | null;
};

const Main: React.FC<Props> = ({ group, hadiths, isnad, activeBook }) => {
  const locale = useLocale();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations("Pages.Islam.Hadith");
  const g = group.group;
  const base = `/${locale}/i/h/ao`;
  const n = (v: number) => v.toLocaleString(locale);

  const bookHref = (bookId: number | null) => {
    const p = new URLSearchParams(searchParams.toString());
    p.delete("page");
    if (bookId === null) p.delete("book");
    else p.set("book", String(bookId));
    const qs = p.toString();
    return `${pathname}${qs ? `?${qs}` : ""}#narrations`;
  };

  return (
    <PageShell size="lg">
      <HadithBreadcrumbs items={[{ label: t("Group.Breadcrumb") }]} />

      <header className="flex flex-col gap-4 rounded-3xl border border-border/60 bg-card/60 p-6 backdrop-blur-sm md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <GradeBadge grade={g.grade} size="md" />
            {g.isQudsi && (
              <span className="rounded-full border border-yellow-500/40 bg-yellow-500/10 px-3 py-1 text-xs text-yellow-700 dark:text-yellow-300">
                {t("Types.Qudsi")}
              </span>
            )}
          </div>
          <SettingsButton showToggles={false} showTreeToggle={Boolean(isnad && isnad.nodes.length > 0)} />
        </div>
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">{t("Group.Eyebrow")}</span>
        <ReadingText as="h1" scale={1.3} className="leading-loose">{g.text}</ReadingText>
        <p className="text-sm text-muted-foreground">{t("Group.Description")}</p>
      </header>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat label={t("Group.Narrations")} value={n(g.hadithCount)} />
        <Stat label={t("Common.Chains")} value={n(group.chainCount)} />
        <Stat label={t("Common.Books")} value={n(group.books.length)} />
        <Stat label={t("Group.Companions")} value={n(group.companions.length)} />
      </div>

      {group.topicPaths.length > 0 && (
        <Section title={t("Common.Topics")}>
          <div className="flex flex-col gap-2">
            {group.topicPaths.map((path, i) => (
              <div key={i} dir="rtl" className="flex flex-wrap items-center gap-1 text-sm">
                {path.map((tp, j) => (
                  <React.Fragment key={tp.id}>
                    {j > 0 && <span className="text-muted-foreground/50">‹</span>}
                    <LoadingLink href={`${base}/topic/${tp.id}`} className={cn(Amiri.className, "max-w-[18rem] truncate rounded-md px-1.5 py-0.5 text-base hover:bg-muted")} title={tp.name}>
                      {tp.name}
                    </LoadingLink>
                  </React.Fragment>
                ))}
              </div>
            ))}
          </div>
        </Section>
      )}

      <Section title={t("Group.GradesOfNarrations")}>
        <Distribution items={group.gradeDistribution} kind="grade" hrefFor={(code) => `${base}/group/${g.id}?grade=${code}#narrations`} />
      </Section>

      {group.companions.length > 0 && (
        <Section title={t("Group.Companions")} description={t("Group.CompanionsDescription")}>
          <div dir="rtl" className="flex flex-wrap gap-2">
            {group.companions.map((c) => (
              <NarratorLink key={c.narrator.id} narrator={c.narrator} count={c.chainCount} />
            ))}
          </div>
        </Section>
      )}

      {isnad && isnad.nodes.length > 0 && (
        <IsnadTree key={g.id} title={t("Isnad.Title")} description={t("Isnad.GroupDescription")} graph={isnad} />
      )}

      <Section id="narrations" title={t("Group.Narrations")}>
        <div dir="rtl" className="flex flex-wrap gap-1.5">
          <LoadingLink
            href={bookHref(null)}
            className={cn("rounded-full border px-3 py-1 text-xs", activeBook === null ? "border-foreground/30 bg-foreground text-background" : "border-border/60 hover:bg-muted")}
          >
            {t("Common.AllBooks")}
          </LoadingLink>
          {group.books.map((b) => (
            <LoadingLink
              key={b.book.id}
              href={bookHref(b.book.id)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm",
                activeBook === b.book.id ? "border-foreground/30 bg-foreground text-background" : "border-border/60 hover:bg-muted",
              )}
            >
              <span className={Amiri.className}>{b.book.name}</span>
              <span className="text-[11px] tabular-nums opacity-70">{n(b.count)}</span>
            </LoadingLink>
          ))}
        </div>
        <FilterChips gradeCodes={group.gradeDistribution.map((d) => d.code)} showTypes={false} anchor="narrations" />
        <HadithList page={hadiths} anchor="narrations" />
      </Section>

      <SourceNote />
    </PageShell>
  );
};

export default Main;
