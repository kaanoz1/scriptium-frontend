"use client";

import React, { useMemo, useState } from "react";
import { NextPage } from "next";
import { observer } from "mobx-react-lite";
import { useLocale, useTranslations } from "next-intl";
import { LuSearch, LuSprout, LuArrowUpRight } from "react-icons/lu";
import { ChapterWithVerseCount } from "@/classes/Islam/Quran/Chapter/WithVerseCount";
import Breadcrumbs from "@/app/[locale]/i/q/components/Breadcrumbs";
import Header from "@/app/[locale]/i/q/components/Header";
import ChapterContainer from "@/app/[locale]/i/q/components/ChapterContainer";
import PageShell from "@/components/Page/PageShell";
import LoadingLink from "@/components/LoadingLink";

type Props = {
  chapters: ChapterWithVerseCount[];
};

const normalize = (s: string) =>
  s
    .toLocaleLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ'’ʿʾ-]/g, "");

const Page: NextPage<Props> = observer(({ chapters }) => {
  const locale = useLocale();
  const t = useTranslations("Pages.Islam.Quran.Components.Header");
  const it = useTranslations("Terms.Islam.Quran.Root");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = normalize(query.trim());
    if (!q) return chapters;
    return chapters.filter((c) => {
      if (String(c.sequence) === q) return true;
      if (c.name.includes(query.trim())) return true;
      return c.meanings.some((m) => normalize(m.text).includes(q));
    });
  }, [chapters, query]);

  return (
    <PageShell size="xl">
      <Breadcrumbs />
      <Header />

      <div className="sticky top-24 z-20 flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="relative flex-1">
          <LuSearch
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("FilterPlaceholder")}
            className="h-12 w-full rounded-xl border border-border/60 bg-background/80 pl-11 pr-16 text-sm shadow-sm outline-none backdrop-blur transition-all placeholder:text-muted-foreground focus:border-foreground/30 focus:ring-4 focus:ring-foreground/5"
          />
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 font-mono text-xs tabular-nums text-muted-foreground">
            {filtered.length}/{chapters.length}
          </span>
        </label>

        <LoadingLink
          href={`/${locale}/i/q/root`}
          className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-border/60 bg-background/80 px-4 text-sm font-medium backdrop-blur transition-colors hover:border-emerald-500/40 hover:text-emerald-600 dark:hover:text-emerald-400"
        >
          <LuSprout size={16} />
          {it("this")}
          <LuArrowUpRight
            size={14}
            className="text-muted-foreground transition-transform group-hover:-translate-y-px group-hover:translate-x-px"
          />
        </LoadingLink>
      </div>

      <ChapterContainer chapters={filtered} />
    </PageShell>
  );
});

export default Page;
