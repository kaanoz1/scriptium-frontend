"use client";

import React, { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { LuChevronLeft, LuChevronRight, LuBookOpenText } from "react-icons/lu";
import { HadithComplete } from "@/classes/Islam/Hadith/ArabicOnly/HadithComplete";
import PageShell from "@/components/Page/PageShell";
import LoadingLink from "@/components/LoadingLink";
import { Button } from "@/components/ui/button";
import HadithBreadcrumbs from "@/app/[locale]/i/h/ao/components/Breadcrumbs";
import HadithText from "@/app/[locale]/i/h/ao/components/HadithText";
import SanadChain from "@/app/[locale]/i/h/ao/components/SanadChain";
import IsnadTree from "@/app/[locale]/i/h/ao/components/IsnadTree";
import HadithListRow from "@/app/[locale]/i/h/ao/components/HadithListRow";
import Section from "@/app/[locale]/i/h/ao/components/Section";
import SettingsButton from "@/app/[locale]/i/h/ao/components/SettingsButton";
import ReadingText from "@/app/[locale]/i/h/ao/components/ReadingText";
import CopyLinkButton from "@/app/[locale]/i/h/ao/components/CopyLinkButton";
import SourceNote from "@/app/[locale]/i/h/ao/components/SourceNote";
import { GradeBadge, TypeBadge } from "@/app/[locale]/i/h/ao/components/Badges";
import { BackendApi } from "@/tool/Fetchers/BackendApi";
import { Amiri } from "@/fonts/Arabic/Amiri";
import { cn } from "@/lib/utils";

const CHAIN_PREVIEW = 3;

const Main: React.FC<{ hadith: HadithComplete }> = ({ hadith }) => {
  const locale = useLocale();
  const t = useTranslations("Pages.Islam.Hadith");
  const [allChains, setAllChains] = useState(false);
  const h = hadith.data;
  const base = `/${locale}/i/h/ao`;
  const chains = allChains ? h.sanads : h.sanads.slice(0, CHAIN_PREVIEW);
  const resolvedQuotes = h.quotes.filter((q) => q.chapter && q.verseStart);
  const loadIsnad = useCallback(
    () => BackendApi.HadithArabicOnlyController.hadithIsnad(h.book.id, h.number),
    [h.book.id, h.number],
  );

  const nav = (num: number | null, dir: "prev" | "next") =>
    num ? (
      <LoadingLink
        href={`${base}/${h.book.id}/${num}`}
        className="flex h-9 items-center gap-1 rounded-lg border border-border/60 px-2.5 text-sm hover:bg-muted"
        aria-label={dir === "prev" ? t("Common.Previous") : t("Common.Next")}
      >
        {dir === "prev" && <LuChevronLeft />}
        <span className="tabular-nums">{num.toLocaleString(locale)}</span>
        {dir === "next" && <LuChevronRight />}
      </LoadingLink>
    ) : (
      <span className="h-9 w-9" />
    );

  return (
    <PageShell size="lg" className="gap-8">
      <div className="sticky top-[calc(var(--navbar-offset,5rem)+0.5rem)] z-20 flex flex-col gap-2 rounded-2xl border border-border/60 bg-background/80 p-1.5 shadow-lg shadow-black/[0.03] backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
        <HadithBreadcrumbs
          items={[
            { label: <span dir="rtl" className={Amiri.className}>{h.book.name}</span>, href: `${base}/${h.book.id}` },
            { label: h.number.toLocaleString(locale) },
          ]}
        />
        <div className="flex shrink-0 items-center justify-center gap-1.5 sm:justify-end">
          {nav(h.previousNumber, "prev")}
          {nav(h.nextNumber, "next")}
          <SettingsButton showTreeToggle={h.sanads.length > 0} />
          <CopyLinkButton title={`${h.book.name} ${h.number}`} text={hadith.matn} />
        </div>
      </div>

      <motion.article
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden rounded-3xl border border-border/60 bg-card/60 backdrop-blur-sm"
      >
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border/50 px-6 py-4 md:px-10">
          <div className="flex flex-wrap items-center gap-2">
            <TypeBadge type={h.type} size="md" />
            <GradeBadge grade={h.grade} size="md" />
            <span className="text-xs text-muted-foreground tabular-nums">
              {t("Hadith.PageInBook", { page: h.page.toLocaleString(locale) })}
            </span>
          </div>
          <LoadingLink href={`${base}/${h.book.id}`} dir="rtl" className="flex items-baseline gap-3 hover:underline">
            <span className={cn(Amiri.className, "text-2xl md:text-3xl")}>{h.book.name}</span>
            <span className="rounded-full border border-border/60 bg-background/60 px-3 py-0.5 font-mono text-xs tabular-nums text-muted-foreground">
              {h.number}
            </span>
          </LoadingLink>
        </header>
        <div className="px-6 py-8 md:px-10 md:py-12">
          <HadithText hadith={hadith} />
        </div>
        {h.tarafText && (
          <footer className="flex flex-wrap items-center justify-between gap-2 border-t border-border/50 px-6 py-4 text-sm md:px-10">
            <span className="text-muted-foreground">{t("Hadith.Taraf")}</span>
            <ReadingText as="span" scale={0.7} className="text-muted-foreground">{h.tarafText}</ReadingText>
          </footer>
        )}
      </motion.article>

      {resolvedQuotes.length > 0 && (
        <Section title={t("Hadith.QuranQuotes")}>
          <div className="flex flex-wrap gap-2">
            {resolvedQuotes.map((q, i) => (
              <LoadingLink
                key={i}
                href={`/${locale}/i/q/${q.chapter}/${q.verseStart}`}
                className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/5 px-3 py-1.5 text-sm hover:bg-emerald-500/10"
              >
                <LuBookOpenText className="text-emerald-600 dark:text-emerald-400" />
                <span className="font-mono tabular-nums">
                  {q.chapter}:{q.verseStart}
                  {q.verseEnd && q.verseEnd !== q.verseStart ? `–${q.verseEnd}` : ""}
                </span>
              </LoadingLink>
            ))}
          </div>
        </Section>
      )}

      {h.sanads.length > 0 ? (
        <Section
          id="chains"
          title={t("Hadith.Chains", { count: h.sanads.length })}
          description={t("Hadith.ChainsDescription")}
        >
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {chains.map((s, i) => (
              <SanadChain key={s.id} sanad={s} index={i} narrator={(id) => hadith.narrator(id)} />
            ))}
          </div>
          {h.sanads.length > CHAIN_PREVIEW && (
            <Button variant="outline" onClick={() => setAllChains((v) => !v)} className="self-center">
              {allChains ? t("Hadith.ShowFewerChains") : t("Hadith.ShowAllChains", { count: h.sanads.length })}
            </Button>
          )}
          <div className="pt-2">
            <IsnadTree key={h.id} title={t("Isnad.Title")} description={t("Isnad.HadithDescription")} load={loadIsnad} />
          </div>
        </Section>
      ) : (
        <p className="text-sm text-muted-foreground">{t("Hadith.NoChains")}</p>
      )}

      {h.meaningGroup && (
        <Section
          title={t("Hadith.OtherNarrations")}
          description={t("Hadith.OtherNarrationsDescription", { count: h.meaningGroup.hadithCount.toLocaleString(locale) })}
          actions={
            <LoadingLink href={`${base}/group/${h.meaningGroup.id}`} className="text-sm text-muted-foreground hover:text-foreground">
              {t("Hadith.OpenGroup")} →
            </LoadingLink>
          }
        >
          {h.topicPaths.length > 0 && (
            <div className="flex flex-col gap-2">
              {h.topicPaths.map((path, i) => (
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
          )}
          <div className="flex flex-col gap-3">
            {h.otherNarrations.map((o) => (
              <HadithListRow key={o.id} item={o} />
            ))}
          </div>
        </Section>
      )}

      <SourceNote />
    </PageShell>
  );
};

export default Main;
