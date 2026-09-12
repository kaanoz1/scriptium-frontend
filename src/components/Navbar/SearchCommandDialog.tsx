"use client";

import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useTranslations } from "next-intl";
import { LuSettings2, LuX } from "react-icons/lu";
import { Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Command, CommandInput, CommandList } from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SearchBarState } from "@/components/Navbar/classes/SearchBarState";
import SearchResultsList from "@/components/Navbar/SearchResultsList";
import SearchCommandSettings from "@/components/Navbar/SearchCommandSettings";
import QuickNavigationInformation from "@/components/Navbar/QuickNavigationInformation";
import Kbd from "@/components/Navbar/Kbd";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const SearchCommandDialog: React.FC<Props> = observer(
  ({ open, onOpenChange }) => {
    const [view, setView] = useState<"search" | "settings">("search");
    const state = SearchBarState.getInstance();
    const t = useTranslations("Navbar");

    useEffect(() => {
      if (!open) return;
      if (!state.query.trim()) return;

      const timeoutId = setTimeout(async () => {
        await state.search();
      }, 300);

      return () => clearTimeout(timeoutId);
    }, [state.query, state, open]);

    useEffect(() => {
      if (!open) setView("search");
    }, [open]);

    const close = () => onOpenChange(false);

    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          showCloseButton={false}
          onEscapeKeyDown={(e) => {
            if (view === "settings") {
              e.preventDefault();
              setView("search");
            }
          }}
          className={cn(
            "top-[8%] translate-y-0 gap-0 overflow-hidden p-0",
            "w-[95vw] sm:w-full sm:max-w-3xl",
            view === "settings" && "lg:max-w-5xl",
          )}
        >
          <DialogTitle className="sr-only">{t("Placeholder")}</DialogTitle>

          <Command
            shouldFilter={false}
            className="rounded-none border-none bg-transparent shadow-none"
          >
            <div className="relative flex items-center">
              <CommandInput
                autoFocus
                value={state.query}
                onValueChange={(value) => (state.query = value)}
                placeholder={t("Placeholder")}
                className="h-12 pr-28 text-sm sm:pr-32"
              />

              <div className="absolute right-2 top-1/2 z-10 flex -translate-y-1/2 items-center gap-1">
                <QuickNavigationInformation />

                <Button
                  type="button"
                  variant={view === "settings" ? "secondary" : "ghost"}
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={() =>
                    setView(view === "settings" ? "search" : "settings")
                  }
                >
                  <LuSettings2 size={16} />
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={close}
                >
                  <LuX size={16} />
                </Button>
              </div>
            </div>

            <div className="max-h-[70vh] min-h-[360px] overflow-y-auto">
              {view === "settings" ? (
                <SearchCommandSettings
                  state={state}
                  onApplied={() => {
                    setView("search");
                    if (state.query.trim()) void state.search();
                  }}
                />
              ) : (
                <CommandList className="h-full max-h-full p-2">
                  {state.isLoading ? (
                    <div className="flex flex-col items-center justify-center gap-3 py-16">
                      <Loader2
                        className="h-6 w-6 animate-spin text-muted-foreground"
                        aria-hidden="true"
                      />
                    </div>
                  ) : !state.query.trim() ? (
                    <div className="flex flex-col items-center justify-center gap-1 px-6 py-16 text-center">
                      <span className="text-sm font-medium text-muted-foreground">
                        {/* {t(
                          "QuickNavigation.MobileSearchModal.SearchInputPlaceholder",
                        )} */}
                      </span>
                    </div>
                  ) : (
                    <SearchResultsList state={state} onNavigate={close} />
                  )}
                </CommandList>
              )}
            </div>

            <div className="hidden items-center justify-between border-t border-border px-3 py-2 text-[11px] text-muted-foreground sm:flex">
              <div className="flex items-center gap-2">
                <Kbd>↑</Kbd>
                <Kbd>↓</Kbd>
                <span>Navigate</span>
                <Kbd>↵</Kbd>
                <span>Select</span>
              </div>
              <div className="flex items-center gap-1">
                <Kbd>Esc</Kbd>
                <span>{view === "settings" ? "Back" : "Close"}</span>
              </div>
            </div>
          </Command>
        </DialogContent>
      </Dialog>
    );
  },
);

export default SearchCommandDialog;
