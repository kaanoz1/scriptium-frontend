"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { LuSearch } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { THadithSearchMode } from "@/dto/Islam/Hadith/ArabicOnly";
import { useLoading } from "@/context/LoadingContext";
import { cn } from "@/lib/utils";

const MODES: THadithSearchMode[] = ["Smart", "Exact", "Phrase"];

type Props = {
  initialQuery?: string;
  initialMode?: THadithSearchMode;
  /** Extra query parameters to keep (filters). */
  keep?: Record<string, string>;
  compact?: boolean;
  className?: string;
};

/** Arabic search box; submits to /i/h/ao/search. */
const SearchForm: React.FC<Props> = ({ initialQuery = "", initialMode = "Smart", keep, compact, className }) => {
  const router = useRouter();
  const locale = useLocale();
  const { startLoading } = useLoading();
  const t = useTranslations("Pages.Islam.Hadith.Search");
  const [query, setQuery] = useState(initialQuery);
  const [mode, setMode] = useState<THadithSearchMode>(initialMode);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (q.length < 2) return;
    const params = new URLSearchParams({ ...(keep ?? {}), q });
    if (mode !== "Smart") params.set("mode", mode);
    startLoading();
    router.push(`/${locale}/i/h/ao/search?${params.toString()}`);
  };

  return (
    <form onSubmit={submit} className={cn("flex w-full flex-col gap-3", className)} role="search">
      <div className="flex items-center gap-2 rounded-2xl border border-border/60 bg-background/80 p-1.5 shadow-sm backdrop-blur focus-within:border-foreground/30">
        <input
          type="search"
          dir="rtl"
          lang="ar"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("Placeholder")}
          aria-label={t("Placeholder")}
          maxLength={100}
          className="min-w-0 flex-1 bg-transparent px-3 py-2 text-lg outline-none placeholder:text-muted-foreground/70"
        />
        <Button type="submit" size="lg" className="shrink-0 rounded-xl px-4">
          <LuSearch />
          <span className="hidden sm:inline">{t("Submit")}</span>
        </Button>
      </div>
      {!compact && (
        <div className="flex flex-wrap items-center gap-2 text-xs" role="radiogroup" aria-label={t("Mode")}>
          <span className="text-muted-foreground">{t("Mode")}:</span>
          {MODES.map((m) => (
            <button
              key={m}
              type="button"
              role="radio"
              aria-checked={mode === m}
              onClick={() => setMode(m)}
              title={t(`Modes.${m}.Description`)}
              className={cn(
                "rounded-full border px-3 py-1 transition-colors",
                mode === m ? "border-foreground/30 bg-foreground text-background" : "border-border/60 hover:bg-muted",
              )}
            >
              {t(`Modes.${m}.Title`)}
            </button>
          ))}
        </div>
      )}
    </form>
  );
};

export default SearchForm;
