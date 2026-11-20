"use client";

import React from "react";
import { useLocale, useTranslations } from "next-intl";
import { TPaged, TScholarComplete, TStatementWithNarrator } from "@/dto/Islam/Hadith/ArabicOnly";
import PageShell from "@/components/Page/PageShell";
import LoadingLink from "@/components/LoadingLink";
import JarhTadilBreadcrumbs from "@/app/[locale]/i/jt/ao/components/Breadcrumbs";
import Section, { Stat } from "@/app/[locale]/i/h/ao/components/Section";
import Pagination from "@/app/[locale]/i/h/ao/components/Pagination";
import { RankBadge } from "@/app/[locale]/i/h/ao/components/Badges";
import { Amiri } from "@/fonts/Arabic/Amiri";
import { cn } from "@/lib/utils";
import { hijri } from "@/util/Islam/Hadith/Codes";

type Props = { scholar: TScholarComplete; statements: TPaged<TStatementWithNarrator> };

const Main: React.FC<Props> = ({ scholar: s, statements }) => {
  const locale = useLocale();
  const t = useTranslations("Pages.Islam.Hadith");
  const AH = t("Common.AH");

  return (
    <PageShell size="lg">
      <JarhTadilBreadcrumbs
        items={[
          { label: t("Common.Scholars"), href: `/${locale}/i/jt/ao/scholar` },
          { label: <span dir="rtl" className={Amiri.className}>{s.knownAs}</span> },
        ]}
      />
      <header dir="rtl" className="flex flex-col items-start gap-2 rounded-3xl border border-border/60 bg-card/60 p-6 backdrop-blur-sm md:p-8">
        {s.rankNo > 0 && <RankBadge rankNo={s.rankNo} rank={s.rank} size="md" />}
        <h1 className={cn(Amiri.className, "text-4xl md:text-5xl")}>{s.knownAs}</h1>
        <p className={cn(Amiri.className, "text-xl text-muted-foreground")}>{s.name}</p>
        {(s.title || s.nickname) && (
          <p className={cn(Amiri.className, "text-lg text-muted-foreground")}>{[s.nickname, s.title].filter(Boolean).join(" · ")}</p>
        )}
        {s.notes && <p className={cn(Amiri.className, "text-base text-muted-foreground")}>{s.notes}</p>}
      </header>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        <Stat label={t("Common.Statements")} value={s.statementCount.toLocaleString(locale)} />
        <Stat label={t("Narrator.Died")} value={hijri(s.deathYear, AH) ?? "—"} />
        <Stat label={t("Narrator.Generation")} value={s.generation > 0 ? s.generation : "—"} />
      </div>
      <Section id="statements" title={t("Scholar.Statements")} description={t("Scholar.StatementsDescription")}>
        <ul className="flex flex-col divide-y divide-border/50 rounded-2xl border border-border/60 bg-card/60">
          {statements.items.map((st) => (
            <li key={st.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
              <span dir="rtl" className={cn(Amiri.className, "text-lg")}>{st.text}</span>
              <LoadingLink href={`/${locale}/i/jt/ao/narrator/${st.narrator.id}`} className="flex items-center gap-2 hover:underline">
                <RankBadge rankNo={st.narrator.rankNo} />
                <span dir="rtl" className={cn(Amiri.className, "text-base text-muted-foreground")}>
                  {st.narrator.nickname || st.narrator.name}
                </span>
              </LoadingLink>
            </li>
          ))}
        </ul>
        <Pagination page={statements.page} pageSize={statements.pageSize} totalCount={statements.totalCount} anchor="statements" />
      </Section>
    </PageShell>
  );
};

export default Main;
