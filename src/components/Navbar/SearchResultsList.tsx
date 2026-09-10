"use client";

import React from "react";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";
import { useLocale } from "use-intl";
import { useTranslations } from "next-intl";
import {
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { LuArrowRight, LuBook, LuSearchCode } from "react-icons/lu";
import { cn } from "@/lib/utils";
import { SearchBarState } from "@/components/Navbar/classes/SearchBarState";
import { QuickNavigationResult } from "@/components/Navbar/classes/QuickNavigationResult";
import { ErrorResult } from "@/components/Navbar/classes/ErrorResult";
import { VerseTranslationWithVerse } from "@/classes/Islam/Quran/VerseTranslation/WithVerse";
import { RootPlain } from "@/classes/Islam/Quran/Root/Plain";
import { ChapterComplete } from "@/classes/Islam/Quran/Chapter/Complete";
import { TranslationSearchAlgorithm } from "@/components/Navbar/classes/TranslationSearchAlgorithm";
import { QuranViewPreferences } from "@/configuration/UserPreferences/Islam/Quran/QuranViewPreferences";
import { useLoading } from "@/context/LoadingContext";

type Props = {
  state: SearchBarState;
  onNavigate: () => void;
};

const ENGLISH_LANGUAGE_CODE = "en";

function getChapterMeaning(
  chapter: ChapterComplete,
  locale: string,
): string | null {
  const meanings = chapter.meanings;
  if (!meanings || meanings.length === 0) return null;

  const localeMatch = meanings.find((m) => m.language.code === locale);
  if (localeMatch) return localeMatch.text;

  const englishMatch = meanings.find(
    (m) => m.language.code === ENGLISH_LANGUAGE_CODE,
  );
  if (englishMatch) return englishMatch.text;

  return null;
}

const SearchResultsList: React.FC<Props> = observer(({ state, onNavigate }) => {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("Navbar.QuickNavigation.MobileSearchModal");
  const { startLoading } = useLoading();
  const result = state.result;

  const arabicFontClassName =
    QuranViewPreferences.getInstance().selectedArabicFont.className;

  const goTo = (path: string) => {
    state.query = "";
    startLoading();
    router.push(`/${locale}/${path}`);
    onNavigate();
  };

  if (result instanceof QuickNavigationResult) {
    return (
      <CommandGroup heading="Quick Navigation">
        <CommandItem
          value={`quick-nav-${result.url}`}
          className="flex items-center gap-3 p-3 cursor-pointer rounded-lg bg-primary/5 border border-primary/20 data-[selected=true]:bg-primary/10"
          onSelect={() => goTo(result.url)}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-sm shrink-0">
            <LuArrowRight size={18} />
          </div>
          <div className="flex flex-col flex-1 min-w-0">
            <span className="font-bold text-sm text-foreground truncate">
              {result.description}
            </span>
            <span className="text-xs text-muted-foreground">
              {t("PressEnterToNavigateDirectly")}
            </span>
          </div>
        </CommandItem>
      </CommandGroup>
    );
  }

  if (result instanceof ErrorResult) {
    return (
      <CommandGroup heading="System Error">
        <CommandItem
          disabled
          className="flex items-center gap-3 p-3 rounded-lg bg-destructive/5 border border-destructive/20"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-destructive text-destructive-foreground shadow-sm shrink-0">
            <LuArrowRight size={18} />
          </div>
          <div className="flex flex-col flex-1 min-w-0">
            <span className="font-bold text-sm text-foreground">
              {result.description}
            </span>
            <span className="text-xs text-muted-foreground">
              {t("IfThisPersistContactUs")}
            </span>
          </div>
        </CommandItem>
      </CommandGroup>
    );
  }

  if (Array.isArray(result)) {
    if (result.length === 0) {
      return (
        <CommandEmpty className="py-10 text-center">
          <span className="text-sm font-medium text-muted-foreground block">
            {t("NoResultsFound")}
          </span>
          <p className="text-xs text-muted-foreground/60 mt-1">
            {t("TryAdjustingYourSearch")}
          </p>
        </CommandEmpty>
      );
    }

    if (result[0] instanceof VerseTranslationWithVerse) {
      let displayResults = result as VerseTranslationWithVerse[];

      if (
        state.algorithm instanceof TranslationSearchAlgorithm &&
        state.algorithm.filterSameVerse
      ) {
        const seenVerses = new Set<string>();
        displayResults = displayResults.filter((item) => {
          const identifier = `${item.verse.chapter.sequence}:${item.verse.sequence}`;
          if (seenVerses.has(identifier)) return false;
          seenVerses.add(identifier);
          return true;
        });
      }

      const highlightText = (text: string, query: string) => {
        if (
          !(state.algorithm instanceof TranslationSearchAlgorithm) ||
          !state.algorithm.emphasize ||
          !query.trim()
        )
          return text;

        const parts = text.split(new RegExp(`(${query})`, "gi"));
        return parts.map((part, i) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <b key={i} className="text-primary font-bold">
              {part}
            </b>
          ) : (
            part
          ),
        );
      };

      return (
        <CommandGroup heading="Translations">
          {displayResults.map((item, idx) => {
            const translationName = item.translation.name;
            const authors =
              item.translation.authors.map((a) => a.name).join(", ") || "";
            const chapterNumber = item.verse.chapter.sequence;
            const verseNumber = item.verse.sequence;
            const chapterName = item.verse.chapter.name;
            const chapterMeaning = getChapterMeaning(
              item.verse.chapter,
              locale,
            );
            const verseReference = `${chapterNumber}:${verseNumber}`;

            return (
              <CommandItem
                key={idx}
                value={`translation-${chapterNumber}-${verseNumber}-${idx}`}
                onSelect={() => goTo(`i/q/${chapterNumber}/${verseNumber}`)}
                className="flex flex-col items-start gap-2 p-3 my-1 cursor-pointer rounded-lg border border-transparent data-[selected=true]:border-border data-[selected=true]:bg-accent/50"
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 text-primary shrink-0">
                      <LuBook size={14} />
                    </div>
                    <span
                      className={cn(
                        "font-semibold text-sm text-foreground truncate",
                        arabicFontClassName,
                      )}
                    >
                      {chapterName}
                    </span>
                    {chapterMeaning && (
                      <span className="text-xs text-muted-foreground italic truncate">
                        {chapterMeaning}
                      </span>
                    )}
                    <span className="text-xs font-medium text-muted-foreground bg-muted px-1.5 py-0.5 rounded-sm shrink-0">
                      {verseReference}
                    </span>
                  </div>
                </div>

                <div className="w-full pl-9 pr-2">
                  <p className="text-sm text-foreground leading-relaxed line-clamp-3">
                    {highlightText(item.text, state.query)}
                  </p>
                </div>

                <div className="flex items-center flex-wrap gap-x-2 gap-y-1 w-full pl-9 mt-1 text-[11px] text-muted-foreground">
                  <span className="font-medium text-foreground/80">
                    {translationName}
                  </span>
                  {authors && (
                    <>
                      <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                      <span className="italic">{authors}</span>
                    </>
                  )}
                  {item.translation.language.code && (
                    <>
                      <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                      <span className="uppercase tracking-wider">
                        {item.translation.language.code === locale
                          ? "Local"
                          : item.translation.language.code}
                      </span>
                    </>
                  )}
                </div>
              </CommandItem>
            );
          })}
        </CommandGroup>
      );
    }

    if (result[0] instanceof RootPlain) {
      return (
        <CommandGroup heading="Lexical Roots">
          {(result as RootPlain[]).map((root, idx) => (
            <CommandItem
              key={idx}
              value={`root-${root.text}-${idx}`}
              onSelect={() => goTo(`i/q/${root.text}`)}
              className="flex gap-3 p-3 items-center cursor-pointer rounded-lg border border-transparent data-[selected=true]:border-border data-[selected=true]:bg-accent/50"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-indigo-500/10 text-indigo-500 shrink-0">
                <LuSearchCode size={20} />
              </div>
              <div className="flex flex-col">
                <span
                  className={cn(
                    "text-lg font-bold text-foreground leading-none",
                    arabicFontClassName,
                  )}
                >
                  {root.text}
                </span>
                <span className="text-xs text-muted-foreground mt-1">
                  {root.text}
                </span>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      );
    }
  }

  return null;
});

export default SearchResultsList;
