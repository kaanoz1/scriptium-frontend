"use client";

import React, { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { observer } from "mobx-react-lite";
import { SearchBarState } from "@/components/Navbar/classes/SearchBarState";
import { Command, CommandList } from "@/components/ui/command";
import { LuSettings2 } from "react-icons/lu";
import MobileSearchBarSettingsModal from "@/components/Navbar/MobileSearchBarSettingsModal";
import { useTranslations } from "next-intl";
import SearchResultsList from "@/components/Navbar/SearchResultsList";
import { TranslationSearchAlgorithm } from "@/components/Navbar/classes/TranslationSearchAlgorithm";

type Props = {
  onClose: () => void;
};

const MobileSearchModal: React.FC<Props> = observer(({ onClose }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const state = useMemo(() => SearchBarState.getInstance(), []);

  const t = useTranslations("Navbar.QuickNavigation.MobileSearchModal");

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

  const modalContent = (
    <main className="fixed inset-0 z-9999 bg-background flex flex-col animate-in fade-in duration-200">
      <Command
        shouldFilter={false}
        className="flex h-full w-full flex-col rounded-none border-none bg-transparent"
      >
        <header className="flex items-center gap-1 p-2 border-b bg-card">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="shrink-0 rounded-full h-9 w-9"
          >
            <ArrowLeft className="h-5 w-5 text-muted-foreground" />
          </Button>

          <div className="flex-1">
            <Input
              autoFocus
              value={state.query}
              onChange={(e) => (state.query = e.target.value)}
              type="text"
              placeholder={t("SearchInputPlaceholder")}
              className="h-9 border-none bg-accent/50 shadow-none text-base px-3"
            />
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSettingsOpen(true)}
            className="shrink-0 rounded-full h-9 w-9"
          >
            <LuSettings2 size={18} className="text-muted-foreground" />
          </Button>
        </header>

        <section className="flex-1 overflow-y-auto overflow-x-hidden">
          <CommandList className="max-h-full h-full p-4">
            {state.isLoading ? (
              <div className="flex flex-col items-center justify-center gap-3 py-16">
                <Loader2
                  className="h-6 w-6 animate-spin text-muted-foreground"
                  aria-hidden="true"
                />
              </div>
            ) : (
              <SearchResultsList state={state} onNavigate={onClose} />
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
