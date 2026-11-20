"use client";

import React, { useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { LuCheck, LuTriangleAlert } from "react-icons/lu";
import { THadithListItem, TNarratorComplete, TNarratorLinkItem, TPaged } from "@/dto/Islam/Hadith/ArabicOnly";
import PageShell from "@/components/Page/PageShell";
import LoadingLink from "@/components/LoadingLink";
import { Button } from "@/components/ui/button";
import JarhTadilBreadcrumbs from "@/app/[locale]/i/jt/ao/components/Breadcrumbs";
import Section, { Stat } from "@/app/[locale]/i/h/ao/components/Section";
import Distribution from "@/app/[locale]/i/h/ao/components/Distribution";
import FilterChips from "@/app/[locale]/i/h/ao/components/FilterChips";
import HadithList from "@/app/[locale]/i/h/ao/components/HadithList";
import NarratorLink from "@/app/[locale]/i/h/ao/components/NarratorLink";
import { RankBadge } from "@/app/[locale]/i/h/ao/components/Badges";
import SettingsButton from "@/app/[locale]/i/h/ao/components/SettingsButton";
import { BackendApi } from "@/tool/Fetchers/BackendApi";
import { Amiri } from "@/fonts/Arabic/Amiri";
import { cn } from "@/lib/utils";
import { hijri } from "@/util/Islam/Hadith/Codes";

type Props = { narrator: TNarratorComplete; hadiths: TPaged<THadithListItem>; activeBook: number | null };

/** Teachers or students, with "load all" paging through the API. */
const Links: React.FC<{
  initial: TNarratorLinkItem[];
  total: number;
  load: (page: number) => ReturnType<typeof BackendApi.JarhTadilArabicOnlyController.narratorTeachers>;
}> = ({ initial, total, load }) => {
  const t = useTranslations("Pages.Islam.Hadith.Common");
  const [items, setItems] = useState(initial);
  const [page, setPage] = useState(0);
  const [busy, setBusy] = useState(false);

  const more = async () => {
    setBusy(true);
    const next = page + 1;
    const res = await load(next);
    if (res.ok) {
      setItems((prev) => {
        const seen = new Set(prev.map((p) => p.narrator.id));
        return [...prev, ...res.data.items.filter((i) => !seen.has(i.narrator.id))];
      });
      setPage(next);
    }
    setBusy(false);
  };

  if (items.length === 0) return <p className="text-sm text-muted-foreground">{t("None")}</p>;

  return (
    <div className="flex flex-col gap-3">
      <div dir="rtl" className="flex flex-wrap gap-2">
        {items.map((l) => (
          <NarratorLink key={l.narrator.id} narrator={l.narrator} count={l.chainCount} />
        ))}
      </div>
      {items.length < total && (
        <Button variant="outline" size="sm" disabled={busy} onClick={more} className="self-start">
          {t("LoadMore", { shown: items.length, total })}
        </Button>
      )}
    </div>
  );
};

const Main: React.FC<Props> = ({ narrator: n, hadiths, activeBook }) => {
  const locale = useLocale();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations("Pages.Islam.Hadith");
  const AH = t("Common.AH");
  const api = BackendApi.JarhTadilArabicOnlyController;

  const bookHref = (bookId: number | null) => {
    const p = new URLSearchParams(searchParams.toString());
    p.delete("page");
    if (bookId === null) p.delete("book");
    else p.set("book", String(bookId));
    const qs = p.toString();
    return `${pathname}${qs ? `?${qs}` : ""}#hadiths`;
  };

  const facts: { k: string; v: string | null }[] = [
    { k: t("Narrator.Born"), v: n.birthYearRaw ? `${n.birthYearRaw} ${AH}` : hijri(n.birthYear, AH) },
    { k: t("Narrator.Died"), v: n.deathYearRaw ? `${n.deathYearRaw} ${AH}` : hijri(n.deathYear, AH) },
    { k: t("Narrator.Age"), v: n.ageRaw },
    { k: t("Narrator.Generation"), v: n.generation > 0 ? String(n.generation) : null },
    { k: t("Narrator.Residence"), v: n.residence },
    { k: t("Narrator.DeathPlace"), v: n.deathPlace },
    { k: t("Narrator.Lineage"), v: n.lineage },
    { k: t("Narrator.Profession"), v: n.profession },
  ];

  const flags: { ok: boolean; warn?: boolean; label: string }[] = [
    { ok: n.isBukhari, label: t("Narrator.InBukhari") },
    { ok: n.isMuslim, label: t("Narrator.InMuslim") },
    { ok: n.hasIkhtilat, warn: true, label: t("Narrator.Ikhtilat") },
    { ok: n.hasTadlis, warn: true, label: t("Narrator.Tadlis") },
  ];

  return (
    <PageShell size="lg">
      <JarhTadilBreadcrumbs
        items={[
          { label: t("Common.Narrators"), href: `/${locale}/i/jt/ao/narrator` },
          { label: <span dir="rtl" className={Amiri.className}>{n.nickname || n.name}</span> },
        ]}
      />

      <header className="flex flex-col gap-5 rounded-3xl border border-border/60 bg-card/60 p-6 backdrop-blur-sm md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <SettingsButton showToggles={false} />
          <div dir="rtl" className="flex flex-col items-start gap-2">
            <RankBadge rankNo={n.rankNo} rank={n.rank} size="md" />
            <h1 className={cn(Amiri.className, "text-4xl leading-tight md:text-5xl")}>{n.nickname || n.name}</h1>
            <p className={cn(Amiri.className, "text-xl text-muted-foreground")}>{n.name}</p>
          </div>
        </div>
        {n.isStub && <p className="text-sm text-amber-600 dark:text-amber-400">{t("Narrator.StubNote")}</p>}
        <div className="flex flex-wrap gap-2">
          {flags
            .filter((f) => f.ok)
            .map((f) => (
              <span
                key={f.label}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs",
                  f.warn ? "border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-300" : "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
                )}
              >
                {f.warn ? <LuTriangleAlert size={12} /> : <LuCheck size={12} />}
                {f.label}
              </span>
            ))}
        </div>
        <dl className="grid grid-cols-1 gap-x-8 gap-y-2 text-sm sm:grid-cols-2">
          {facts
            .filter((f) => f.v)
            .map((f) => (
              <div key={f.k} className="flex items-baseline justify-between gap-3 border-b border-dashed border-border/50 pb-1.5">
                <dt className="text-muted-foreground">{f.k}</dt>
                <dd dir="rtl" className={cn(Amiri.className, "text-base")}>{f.v}</dd>
              </div>
            ))}
        </dl>
      </header>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat label={t("Common.Hadiths")} value={n.hadithCount.toLocaleString(locale)} />
        <Stat label={t("Narrator.Teachers")} value={n.teacherCount.toLocaleString(locale)} />
        <Stat label={t("Narrator.Students")} value={n.studentCount.toLocaleString(locale)} />
        <Stat label={t("Common.Statements")} value={n.statements.length.toLocaleString(locale)} />
      </div>

      {n.statements.length > 0 && (
        <Section title={t("Narrator.Statements")} description={t("Narrator.StatementsDescription")}>
          <ul className="flex flex-col divide-y divide-border/50 rounded-2xl border border-border/60 bg-card/60">
            {n.statements.map((s) => (
              <li key={s.id} className="flex flex-wrap items-baseline justify-between gap-3 px-4 py-3">
                <span dir="rtl" className={cn(Amiri.className, "text-lg")}>{s.text}</span>
                <LoadingLink href={`/${locale}/i/jt/ao/scholar/${s.scholar.id}`} className="flex items-baseline gap-2 text-sm hover:underline">
                  <span className="text-xs tabular-nums text-muted-foreground">{hijri(s.scholar.deathYear, AH)}</span>
                  <span dir="rtl" className={cn(Amiri.className, "text-base text-muted-foreground")}>{s.scholar.knownAs}</span>
                </LoadingLink>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <div className="grid gap-8 md:grid-cols-2">
        <Section title={t("Narrator.Teachers")} description={t("Narrator.TeachersDescription")}>
          <Links initial={n.teachers} total={n.teacherCount} load={(p) => api.narratorTeachers(n.id, p, 50)} />
        </Section>
        <Section title={t("Narrator.Students")} description={t("Narrator.StudentsDescription")}>
          <Links initial={n.students} total={n.studentCount} load={(p) => api.narratorStudents(n.id, p, 50)} />
        </Section>
      </div>

      {n.gradeDistribution.length > 0 && (
        <Section title={t("Narrator.GradesOfHadiths")}>
          <Distribution items={n.gradeDistribution} kind="grade" />
        </Section>
      )}

      <Section id="hadiths" title={t("Narrator.Hadiths")} description={t("Narrator.HadithsDescription")}>
        {n.books.length > 0 && (
          <div className="flex flex-wrap gap-1.5" dir="rtl">
            <LoadingLink
              href={bookHref(null)}
              className={cn("rounded-full border px-3 py-1 text-xs", activeBook === null ? "border-foreground/30 bg-foreground text-background" : "border-border/60 hover:bg-muted")}
            >
              {t("Common.AllBooks")}
            </LoadingLink>
            {n.books.map((b) => (
              <LoadingLink
                key={b.book.id}
                href={bookHref(b.book.id)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm",
                  activeBook === b.book.id ? "border-foreground/30 bg-foreground text-background" : "border-border/60 hover:bg-muted",
                )}
              >
                <span className={Amiri.className}>{b.book.name}</span>
                <span className="text-[11px] tabular-nums opacity-70">{b.count.toLocaleString(locale)}</span>
              </LoadingLink>
            ))}
          </div>
        )}
        <FilterChips showTypes={false} anchor="hadiths" />
        <HadithList page={hadiths} anchor="hadiths" />
      </Section>
    </PageShell>
  );
};

export default Main;
