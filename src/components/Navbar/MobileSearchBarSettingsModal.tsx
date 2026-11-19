"use client";

import React, { useId, useMemo } from "react";
import { createPortal } from "react-dom";
import { observer } from "mobx-react-lite";
import { useTranslations } from "next-intl";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { SearchBarState } from "@/components/Navbar/classes/SearchBarState";
import {
  TranslationSearchAlgorithm,
  TranslationSearchMethodology,
} from "@/components/Navbar/classes/TranslationSearchAlgorithm";
import { RootSearchAlgorithm } from "@/components/Navbar/classes/RootSearchAlgorithm";
import { cn } from "@/lib/utils";

type Props = {
  onClose: () => void;
};

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <h4 className="px-1 pb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/70">
    {children}
  </h4>
);

/** Bordered list whose rows are separated by dividers. */
const Group: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="divide-y divide-border/60 overflow-hidden rounded-xl border border-border/60 bg-card/40">
    {children}
  </div>
);

type RowProps = {
  title: string;
  description?: string;
  control: (id: string) => React.ReactNode;
  disabled?: boolean;
};

const Row: React.FC<RowProps> = ({ title, description, control, disabled }) => {
  const id = useId();
  return (
    <label
      htmlFor={id}
      className={cn(
        "flex items-center justify-between gap-4 px-4 py-3.5 transition-colors",
        disabled
          ? "cursor-not-allowed opacity-55"
          : "cursor-pointer active:bg-muted/60",
      )}
    >
      <span className="min-w-0 space-y-0.5">
        <span className="block text-sm font-medium">{title}</span>
        {description && (
          <span className="block text-xs leading-snug text-muted-foreground">
            {description}
          </span>
        )}
      </span>
      {control(id)}
    </label>
  );
};

const MobileSearchBarSettingsModal: React.FC<Props> = observer(
  ({ onClose }) => {
    const t = useTranslations("Navbar.Configuration");
    const state = useMemo(() => SearchBarState.getInstance(), []);
    const searchAlgorithm = state.algorithm;

    const translationKey = TranslationSearchAlgorithm.getInstance().key;
    const rootKey = RootSearchAlgorithm.getInstance().key;

    const tc = (key: string) =>
      t(`SearchAlgorithms.TranslationSearch.Configuration.Methodology.${key}`);

    const modalContent = (
      <main className="fixed inset-0 z-10000 flex flex-col bg-background font-sans text-foreground animate-in slide-in-from-bottom duration-300">
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
          <h2 className="truncate text-base font-semibold">{t("Header")}</h2>
        </header>

        <div className="min-h-0 flex-1 space-y-7 overflow-y-auto px-4 py-5">
          <section>
            <SectionTitle>{t("Header")}</SectionTitle>
            <RadioGroup
              value={searchAlgorithm.key}
              onValueChange={(val) => {
                state.algorithm =
                  val === translationKey
                    ? TranslationSearchAlgorithm.getInstance()
                    : RootSearchAlgorithm.getInstance();
              }}
              className="gap-0"
            >
              <Group>
                <Row
                  title={t("SearchAlgorithms.TranslationSearch.Header")}
                  description={t(
                    "SearchAlgorithms.TranslationSearch.Description",
                  )}
                  control={(id) => (
                    <RadioGroupItem id={id} value={translationKey} />
                  )}
                />
                <Row
                  disabled
                  title={t("SearchAlgorithms.RootSearch.Header")}
                  description={t("SearchAlgorithms.RootSearch.Description")}
                  control={(id) => (
                    <RadioGroupItem id={id} value={rootKey} disabled />
                  )}
                />
              </Group>
            </RadioGroup>
          </section>

          {searchAlgorithm instanceof TranslationSearchAlgorithm && (
            <>
              <section>
                <SectionTitle>{tc("Header")}</SectionTitle>
                <RadioGroup
                  value={
                    searchAlgorithm.methodology ===
                    TranslationSearchMethodology.TextSearch
                      ? "match"
                      : "semantic"
                  }
                  onValueChange={(val) =>
                    (searchAlgorithm.methodology =
                      val === "match"
                        ? TranslationSearchMethodology.TextSearch
                        : TranslationSearchMethodology.ContextSearch)
                  }
                  className="gap-0"
                >
                  <Group>
                    <Row
                      title={tc("SearchPreference.MatchSearch.Header")}
                      description={tc("SearchPreference.MatchSearch.Description")}
                      control={(id) => (
                        <RadioGroupItem id={id} value="match" />
                      )}
                    />
                    <Row
                      title={tc("SearchPreference.SemanticSearch.Header")}
                      description={tc(
                        "SearchPreference.SemanticSearch.Description",
                      )}
                      control={(id) => (
                        <RadioGroupItem id={id} value="semantic" />
                      )}
                    />
                  </Group>
                </RadioGroup>
              </section>

              <section>
                <SectionTitle>{tc("ResultConfigs.Header")}</SectionTitle>
                <Group>
                  <Row
                    title={tc("ResultConfigs.EmphasizeMatches.Header")}
                    description={tc("ResultConfigs.EmphasizeMatches.Description")}
                    control={(id) => (
                      <Switch
                        id={id}
                        checked={searchAlgorithm.emphasize}
                        onCheckedChange={(v) => (searchAlgorithm.emphasize = v)}
                      />
                    )}
                  />
                  <Row
                    title={tc("ResultConfigs.FilterDuplicates.Header")}
                    description={tc("ResultConfigs.FilterDuplicates.Description")}
                    control={(id) => (
                      <Switch
                        id={id}
                        checked={searchAlgorithm.filterSameVerse}
                        onCheckedChange={(v) =>
                          (searchAlgorithm.filterSameVerse = v)
                        }
                      />
                    )}
                  />
                </Group>
              </section>
            </>
          )}
        </div>

        <footer className="shrink-0 border-t border-border/60 bg-background px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <Button className="h-11 w-full rounded-xl text-sm font-semibold" onClick={onClose}>
            {t("Apply")}
          </Button>
        </footer>
      </main>
    );

    return typeof window !== "undefined"
      ? createPortal(modalContent, document.body)
      : null;
  },
);

export default MobileSearchBarSettingsModal;
