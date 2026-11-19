"use client";

import React, { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import { LuSearch, LuSettings2, LuX } from "react-icons/lu";
import { observer } from "mobx-react-lite";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Command, CommandList } from "@/components/ui/command";
import { SearchBarState } from "@/components/Navbar/classes/SearchBarState";
import MobileSearchBarSettingsModal from "@/components/Navbar/MobileSearchBarSettingsModal";
import SearchResultsList from "@/components/Navbar/SearchResultsList";
import { TranslationSearchAlgorithm } from "@/components/Navbar/classes/TranslationSearchAlgorithm";

type Props = {
  onClose: () => void;
};

const MobileSearchModal: React.FC<Props> = observer(({ onClose }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const state = useMemo(() => SearchBarState.getInstance(), []);

  const t = useTranslations("Navbar.QuickNavigation.MobileSearchModal");
  const ct = useTranslations("Navbar.Configuration");

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  useEffect(() => {
    if (!state.query.trim()) return;

    const timeoutId = setTimeout(async () => {
      await state.search();
    }, 250);

    return () => clearTimeout(timeoutId);
  }, [state.query, state]);

  const methodology =
    state.algorithm instanceof TranslationSearchAlgorithm
      ? state.algorithm.methodology
      : null;

  useEffect(() => {
    if (!state.query.trim()) return;
    void state.search();
  }, [state.algorithm, methodology]);

  const hasQuery = !!state.query.trim();

  const modalContent = (
    // Portaled to <body>; `font-sans` pins the site font (Geist) explicitly.
    <main className="fixed inset-0 z-9999 flex flex-col bg-background font-sans text-foreground animate-in fade-in duration-200">
      <Command
        shouldFilter={false}
        className="flex h-full w-full flex-col rounded-none border-none bg-transparent"
      >
        <header className="flex h-14 shrink-0 items-center gap-1.5 border-b border-border/60 bg-background/95 px-2 backdrop-blur">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Back"
            className="h-10 w-10 shrink-0 rounded-full"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>

          <label className="relative flex min-w-0 flex-1 items-center">
            <LuSearch
              size={16}
              className="pointer-events-none absolute left-3.5 text-muted-foreground"
            />
            <input
              autoFocus
              value={state.query}
              onChange={(e) => (state.query = e.target.value)}
              type="search"
              enterKeyHint="search"
              placeholder={t("SearchInputPlaceholder")}
              className="h-10 w-full rounded-full border border-border/60 bg-muted/40 pl-10 pr-9 text-base outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground/25 focus:bg-background [&::-webkit-search-cancel-button]:hidden"
            />
            {state.query && (
              <button
                type="button"
                onClick={() => (state.query = "")}
                aria-label="Clear"
                className="absolute right-2 flex h-6 w-6 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <LuX size={14} />
              </button>
            )}
          </label>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSettingsOpen(true)}
            aria-label={ct("Header")}
            className="h-10 w-10 shrink-0 rounded-full"
          >
            <LuSettings2 size={18} />
          </Button>
        </header>

        <section className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
          <CommandList className="h-full max-h-full px-2 py-3">
            {state.isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2
                  className="h-6 w-6 animate-spin text-muted-foreground"
                  aria-hidden="true"
                />
              </div>
            ) : hasQuery ? (
              <SearchResultsList state={state} onNavigate={onClose} />
            ) : (
              <div className="flex flex-col items-center justify-center gap-3 px-6 py-20 text-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border/60 bg-muted/40 text-muted-foreground">
                  <LuSearch size={20} />
                </span>
                <p className="text-sm text-muted-foreground">
                  {t("SearchInputPlaceholder")}
                </p>
              </div>
            )}
          </CommandList>
        </section>
      </Command>

      {isSettingsOpen && (
        <MobileSearchBarSettingsModal
          onClose={() => setIsSettingsOpen(false)}
        />
      )}
    </main>
  );

  return typeof window !== "undefined"
    ? createPortal(modalContent, document.body)
    : null;
});

export default MobileSearchModal;
