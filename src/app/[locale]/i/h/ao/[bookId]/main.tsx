"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { LuCornerDownLeft } from "react-icons/lu";
import { TBookComplete, THadithListItem, TPaged } from "@/dto/Islam/Hadith/ArabicOnly";
import PageShell from "@/components/Page/PageShell";
import { Button } from "@/components/ui/button";
import { useLoading } from "@/context/LoadingContext";
import HadithBreadcrumbs from "@/app/[locale]/i/h/ao/components/Breadcrumbs";
import Section, { Stat } from "@/app/[locale]/i/h/ao/components/Section";
import Distribution from "@/app/[locale]/i/h/ao/components/Distribution";
import FilterChips from "@/app/[locale]/i/h/ao/components/FilterChips";
import HadithList from "@/app/[locale]/i/h/ao/components/HadithList";
import SettingsButton from "@/app/[locale]/i/h/ao/components/SettingsButton";
import SearchForm from "@/app/[locale]/i/h/ao/components/SearchForm";
import { BackendApi } from "@/tool/Fetchers/BackendApi";
import { Amiri } from "@/fonts/Arabic/Amiri";
import { cn } from "@/lib/utils";

type Props = { book: TBookComplete; hadiths: TPaged<THadithListItem> };

const Main: React.FC<Props> = ({ book, hadiths }) => {
  const locale = useLocale();
  const router = useRouter();
  const { startLoading } = useLoading();
  const t = useTranslations("Pages.Islam.Hadith");
  const [jump, setJump] = useState("");
  const [jumpError, setJumpError] = useState(false);
  const n = (v: number) => v.toLocaleString(locale);

  const goTo = async (e: React.FormEvent) => {
    e.preventDefault();
    const num = Number.parseInt(jump, 10);
    if (!Number.isInteger(num) || num < 1) return;
    const res = await BackendApi.HadithArabicOnlyController.locate(book.id, num);
    if (!res.ok) {
      setJumpError(true);
      return;
    }
    setJumpError(false);
    startLoading();
    router.push(`/${locale}/i/h/ao/${book.id}/${num}`);
  };

  const facts = [
    book.city && { k: t("Book.City"), v: book.city },
    book.publisher && { k: t("Book.Publisher"), v: book.publisher },
    book.edition && { k: t("Book.Edition"), v: book.edition },
  ].filter(Boolean) as { k: string; v: string }[];

  return (
    <PageShell size="lg">
      <HadithBreadcrumbs items={[{ label: <span dir="rtl" className={Amiri.className}>{book.name}</span> }]} />

      <header className="flex flex-col gap-6 rounded-3xl border border-border/60 bg-card/60 p-6 backdrop-blur-sm md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <SettingsButton showToggles={false} />
          <div dir="rtl" className="flex flex-col items-start gap-2">
            <span className={cn(Amiri.className, "rounded-full border border-border/60 bg-background/70 px-3 py-0.5 text-sm text-muted-foreground")}>
              {book.category.name}
            </span>
            <h1 className={cn(Amiri.className, "text-4xl leading-tight md:text-5xl")}>{book.name}</h1>
            <p className={cn(Amiri.className, "text-xl text-muted-foreground")}>
              {book.authorName}
              {book.authorDeathYear ? ` (ت ${book.authorDeathYear}هـ)` : ""}
            </p>
          </div>
        </div>
        {facts.length > 0 && (
          <dl dir="rtl" className="flex flex-wrap gap-x-6 gap-y-1 text-sm">
            {facts.map((f) => (
              <div key={f.k} className="flex gap-2">
                <dt className="text-muted-foreground">{f.k}:</dt>
                <dd className={Amiri.className}>{f.v}</dd>
              </div>
            ))}
          </dl>
        )}
      </header>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat label={t("Common.Hadiths")} value={n(book.hadithCount)} />
        <Stat label={t("Common.Chains")} value={n(book.chainCount)} />
        <Stat label={t("Book.QuranQuotes")} value={n(book.quranQuoteCount)} />
        <Stat label={t("Book.Range")} value={`${n(book.firstNumber)}–${n(book.lastNumber)}`} />
      </div>

      <Section title={t("Corpus.GradeDistribution")} description={t("Common.GradeExplanation")}>
        <Distribution
          items={book.gradeDistribution}
          kind="grade"
          hrefFor={(code) => `/${locale}/i/h/ao/${book.id}?grade=${code}#hadiths`}
        />
      </Section>

      <div className="grid gap-4 md:grid-cols-2">
        <form onSubmit={goTo} className="flex flex-col gap-2">
          <label htmlFor="jump" className="text-sm font-medium">{t("Book.JumpTo")}</label>
          <div className="flex gap-2">
            <input
              id="jump"
              inputMode="numeric"
              value={jump}
              onChange={(e) => setJump(e.target.value.replace(/\D/g, ""))}
              placeholder={`${book.firstNumber}–${book.lastNumber}`}
              className="h-9 min-w-0 flex-1 rounded-lg border border-border/60 bg-background/80 px-3 tabular-nums outline-none focus:border-foreground/30"
            />
            <Button type="submit" variant="outline" size="lg">
              <LuCornerDownLeft />
              {t("Book.Go")}
            </Button>
          </div>
          {jumpError && <p className="text-sm text-destructive">{t("Book.NumberNotFound")}</p>}
        </form>
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium">{t("Book.SearchInBook")}</span>
          <SearchForm compact keep={{ book: String(book.id) }} />
        </div>
      </div>

      <Section id="hadiths" title={t("Common.Hadiths")}>
        <FilterChips
          gradeCodes={book.gradeDistribution.map((g) => g.code)}
          typeCodes={book.typeDistribution.map((g) => g.code)}
          anchor="hadiths"
        />
        <HadithList page={hadiths} hideBook anchor="hadiths" />
      </Section>
    </PageShell>
  );
};

export default Main;
