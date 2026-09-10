"use client";

import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { useTranslations } from "next-intl";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { SearchBarState } from "@/components/Navbar/classes/SearchBarState";
import {
  TranslationSearchAlgorithm,
  TranslationSearchMethodology,
} from "@/components/Navbar/classes/TranslationSearchAlgorithm";
import { RootSearchAlgorithm } from "@/components/Navbar/classes/RootSearchAlgorithm";

type Props = {
  state: SearchBarState;
  onApplied: () => void;
};

type SettingsDraft = {
  algorithmKey: string;
  methodology: TranslationSearchMethodology;
  emphasize: boolean;
  filterSameVerse: boolean;
};

function buildDraft(state: SearchBarState): SettingsDraft {
  const translation = TranslationSearchAlgorithm.getInstance();
  return {
    algorithmKey: state.algorithm.key,
    methodology: translation.methodology,
    emphasize: translation.emphasize,
    filterSameVerse: translation.filterSameVerse,
  };
}

const SearchCommandSettings: React.FC<Props> = observer(
  ({ state, onApplied }) => {
    const t = useTranslations("Navbar.Configuration");

    const [draft, setDraft] = useState<SettingsDraft>(() => buildDraft(state));

    const isTranslationSelected =
      draft.algorithmKey === TranslationSearchAlgorithm.getInstance().key;

    const handleApply = () => {
      state.algorithm = isTranslationSelected
        ? TranslationSearchAlgorithm.getInstance()
        : RootSearchAlgorithm.getInstance();

      const translation = TranslationSearchAlgorithm.getInstance();
      translation.methodology = draft.methodology;
      translation.emphasize = draft.emphasize;
      translation.filterSameVerse = draft.filterSameVerse;

      onApplied();
    };

    return (
      <div className="flex flex-col">
        <div className="flex flex-col lg:flex-row items-stretch gap-6 lg:gap-0 p-4 sm:p-6 overflow-y-auto">
          <div className="flex-1 lg:min-w-70">
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-4">
              {t("Header")}
            </h4>
            <RadioGroup
              value={draft.algorithmKey}
              className="space-y-3"
              onValueChange={(value) =>
                setDraft((prev) => ({ ...prev, algorithmKey: value }))
              }
            >
              <FieldLabel
                htmlFor={TranslationSearchAlgorithm.getInstance().key}
                className="cursor-pointer block"
              >
                <Field
                  orientation="horizontal"
                  className="flex gap-2 items-center!"
                >
                  <FieldContent>
                    <FieldTitle className="text-[13px] font-semibold">
                      {t("SearchAlgorithms.TranslationSearch.Header")}
                    </FieldTitle>
                    <FieldDescription className="text-xs leading-tight text-muted-foreground">
                      {t("SearchAlgorithms.TranslationSearch.Description")}
                    </FieldDescription>
                  </FieldContent>
                  <RadioGroupItem
                    value={TranslationSearchAlgorithm.getInstance().key}
                    id={TranslationSearchAlgorithm.getInstance().key}
                  />
                </Field>
              </FieldLabel>

              <FieldLabel
                htmlFor={RootSearchAlgorithm.getInstance().key}
                className="cursor-pointer block"
              >
                <Field
                  orientation="horizontal"
                  className="flex gap-2 items-center!"
                >
                  <FieldContent>
                    <FieldTitle className="text-[13px] font-semibold">
                      {t("SearchAlgorithms.RootSearch.Header")}
                    </FieldTitle>
                    <FieldDescription className="text-xs leading-tight text-muted-foreground">
                      {t("SearchAlgorithms.RootSearch.Description")}
                    </FieldDescription>
                  </FieldContent>
                  <RadioGroupItem
                    disabled
                    value={RootSearchAlgorithm.getInstance().key}
                    id={RootSearchAlgorithm.getInstance().key}
                  />
                </Field>
              </FieldLabel>
            </RadioGroup>
          </div>

          {isTranslationSelected && (
            <>
              <Separator
                orientation="vertical"
                className="hidden lg:block mx-5 bg-border h-auto"
              />
              <Separator className="lg:hidden bg-border" />

              <div className="flex-1 lg:min-w-60 space-y-4">
                <h4 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                  {t(
                    "SearchAlgorithms.TranslationSearch.Configuration.Methodology.Header",
                  )}
                </h4>
                <RadioGroup
                  value={
                    draft.methodology ===
                    TranslationSearchMethodology.TextSearch
                      ? "match"
                      : "semantic"
                  }
                  onValueChange={(val) =>
                    setDraft((prev) => ({
                      ...prev,
                      methodology:
                        val === "match"
                          ? TranslationSearchMethodology.TextSearch
                          : TranslationSearchMethodology.ContextSearch,
                    }))
                  }
                  className="space-y-3"
                >
                  <FieldLabel className="cursor-pointer block">
                    <Field
                      orientation="horizontal"
                      className="flex gap-2 items-center!"
                    >
                      <FieldContent>
                        <FieldTitle className="text-[13px] font-semibold">
                          {t(
                            "SearchAlgorithms.TranslationSearch.Configuration.Methodology.SearchPreference.MatchSearch.Header",
                          )}
                        </FieldTitle>
                        <FieldDescription className="text-xs leading-tight text-muted-foreground">
                          {t(
                            "SearchAlgorithms.TranslationSearch.Configuration.Methodology.SearchPreference.MatchSearch.Description",
                          )}
                        </FieldDescription>
                      </FieldContent>
                      <RadioGroupItem value="match" />
                    </Field>
                  </FieldLabel>
                  <FieldLabel className="cursor-pointer block">
                    <Field
                      orientation="horizontal"
                      className="flex gap-2 items-center!"
                    >
                      <FieldContent>
                        <FieldTitle className="text-[13px] font-semibold">
                          {t(
                            "SearchAlgorithms.TranslationSearch.Configuration.Methodology.SearchPreference.SemanticSearch.Header",
                          )}
                        </FieldTitle>
                        <FieldDescription className="text-xs leading-tight text-muted-foreground">
                          {t(
                            "SearchAlgorithms.TranslationSearch.Configuration.Methodology.SearchPreference.SemanticSearch.Description",
                          )}
                        </FieldDescription>
                      </FieldContent>
                      <RadioGroupItem value="semantic" />
                    </Field>
                  </FieldLabel>
                </RadioGroup>
              </div>

              <Separator
                orientation="vertical"
                className="hidden lg:block mx-5 bg-border h-auto"
              />
              <Separator className="lg:hidden bg-border" />

              <div className="flex-1 w-full space-y-4">
                <h4 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                  {t(
                    "SearchAlgorithms.TranslationSearch.Configuration.Methodology.ResultConfigs.Header",
                  )}
                </h4>
                <div className="space-y-3 pt-1">
                  <div
                    className="flex items-center justify-between gap-3 cursor-pointer select-none rounded-sm transition-colors hover:bg-accent/50 p-3"
                    onClick={() =>
                      setDraft((prev) => ({
                        ...prev,
                        emphasize: !prev.emphasize,
                      }))
                    }
                  >
                    <div className="space-y-0.5">
                      <label className="text-[13px] font-semibold block cursor-pointer">
                        {t(
                          "SearchAlgorithms.TranslationSearch.Configuration.Methodology.ResultConfigs.EmphasizeMatches.Header",
                        )}
                      </label>
                      <p className="text-xs text-muted-foreground leading-tight">
                        {t(
                          "SearchAlgorithms.TranslationSearch.Configuration.Methodology.ResultConfigs.EmphasizeMatches.Description",
                        )}
                      </p>
                    </div>
                    <Switch
                      checked={draft.emphasize}
                      className="scale-75 origin-right pointer-events-none"
                    />
                  </div>

                  <div
                    className="flex items-center justify-between gap-3 cursor-pointer select-none rounded-sm transition-colors hover:bg-accent/50 p-3"
                    onClick={() =>
                      setDraft((prev) => ({
                        ...prev,
                        filterSameVerse: !prev.filterSameVerse,
                      }))
                    }
                  >
                    <div className="space-y-0.5">
                      <label className="text-[13px] font-semibold block cursor-pointer">
                        {t(
                          "SearchAlgorithms.TranslationSearch.Configuration.Methodology.ResultConfigs.FilterDuplicates.Header",
                        )}
                      </label>
                      <p className="text-xs text-muted-foreground leading-tight">
                        {t(
                          "SearchAlgorithms.TranslationSearch.Configuration.Methodology.ResultConfigs.FilterDuplicates.Description",
                        )}
                      </p>
                    </div>
                    <Switch
                      checked={draft.filterSameVerse}
                      className="scale-75 origin-right pointer-events-none"
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-border px-4 py-3 sm:px-6">
          <Button size="sm" onClick={handleApply}>
            Uygula
          </Button>
        </div>
      </div>
    );
  },
);

export default SearchCommandSettings;
