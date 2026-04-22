"use client"

import React, {useMemo} from "react";
import {createPortal} from "react-dom";
import {observer} from "mobx-react-lite";
import {useTranslations} from "next-intl";
import {ArrowLeft} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Field, FieldContent, FieldDescription, FieldLabel, FieldTitle} from "@/components/ui/field";
import {Switch} from "@/components/ui/switch";
import {SearchBarState} from "@/components/Navbar/classes/SearchBarState";
import {
    TranslationSearchAlgorithm,
    TranslationSearchMethodology
} from "@/components/Navbar/classes/TranslationSearchAlgorithm";
import {RootSearchAlgorithm} from "@/components/Navbar/classes/RootSearchAlgorithm";

type Props = {
    onClose: () => void;
};

const MobileSearchBarSettingsModal: React.FC<Props> = observer(({onClose}) => {
    const t = useTranslations("Navbar.Configuration");
    const state = useMemo(() => SearchBarState.getInstance(), []);
    const searchAlgorithm = state.algorithm;

    const modalContent = (
        <main
            className="fixed inset-0 z-10000 bg-background flex flex-col animate-in slide-in-from-bottom duration-300">
            <header className="flex items-center gap-4 p-4 border-b bg-card">
                <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
                    <ArrowLeft className="h-5 w-5"/>
                </Button>
                <h2 className="font-bold text-lg">{t("Header")}</h2>
            </header>

            <div className="flex-1 overflow-y-auto p-5 space-y-8">

                <section className="space-y-4">
                    <h4 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                        {t("Header")}
                    </h4>
                    <RadioGroup
                        value={searchAlgorithm.key}
                        className="space-y-4"
                        onValueChange={(val) => {
                            if (val === TranslationSearchAlgorithm.getInstance().key) {
                                state.algorithm = TranslationSearchAlgorithm.getInstance();
                            } else {
                                state.algorithm = RootSearchAlgorithm.getInstance();
                            }
                        }}
                    >
                        <FieldLabel
                            className="cursor-pointer block p-3 rounded-lg border border-transparent bg-accent/30">
                            <Field orientation="horizontal" className="flex justify-between items-center w-full">
                                <FieldContent className="flex-1 pr-4">
                                    <FieldTitle className="text-sm font-semibold">
                                        {t("SearchAlgorithms.TranslationSearch.Header")}
                                    </FieldTitle>
                                    <FieldDescription className="text-xs text-muted-foreground mt-1">
                                        {t("SearchAlgorithms.TranslationSearch.Description")}
                                    </FieldDescription>
                                </FieldContent>
                                <RadioGroupItem value={TranslationSearchAlgorithm.getInstance().key}/>
                            </Field>
                        </FieldLabel>

                        <FieldLabel
                            className="cursor-pointer block p-3 rounded-lg border border-transparent bg-accent/30 opacity-60">
                            <Field orientation="horizontal" className="flex justify-between items-center w-full">
                                <FieldContent className="flex-1 pr-4">
                                    <FieldTitle className="text-sm font-semibold">
                                        {t("SearchAlgorithms.RootSearch.Header")}
                                    </FieldTitle>
                                    <FieldDescription className="text-xs text-muted-foreground mt-1">
                                        {t("SearchAlgorithms.RootSearch.Description")}
                                    </FieldDescription>
                                </FieldContent>
                                <RadioGroupItem disabled value={RootSearchAlgorithm.getInstance().key}/>
                            </Field>
                        </FieldLabel>
                    </RadioGroup>
                </section>

                {searchAlgorithm instanceof TranslationSearchAlgorithm && (
                    <>
                        <Separator/>

                        <section className="space-y-4">
                            <h4 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                                {t("SearchAlgorithms.TranslationSearch.Configuration.Methodology.Header")}
                            </h4>
                            <RadioGroup
                                value={searchAlgorithm.methodology === TranslationSearchMethodology.TextSearch ? "match" : "semantic"}
                                onValueChange={(val) => searchAlgorithm.methodology = val === "match" ? TranslationSearchMethodology.TextSearch : TranslationSearchMethodology.ContextSearch}
                                className="space-y-4"
                            >
                                <FieldLabel
                                    className="cursor-pointer block p-3 rounded-lg border border-transparent bg-accent/30">
                                    <Field orientation="horizontal"
                                           className="flex justify-between items-center w-full">
                                        <FieldContent className="flex-1 pr-4">
                                            <FieldTitle className="text-sm font-semibold">
                                                {t("SearchAlgorithms.TranslationSearch.Configuration.Methodology.SearchPreference.MatchSearch.Header")}
                                            </FieldTitle>
                                        </FieldContent>
                                        <RadioGroupItem value="match"/>
                                    </Field>
                                </FieldLabel>
                                <FieldLabel
                                    className="cursor-pointer block p-3 rounded-lg border border-transparent bg-accent/30">
                                    <Field orientation="horizontal"
                                           className="flex justify-between items-center w-full">
                                        <FieldContent className="flex-1 pr-4">
                                            <FieldTitle className="text-sm font-semibold">
                                                {t("SearchAlgorithms.TranslationSearch.Configuration.Methodology.SearchPreference.SemanticSearch.Header")}
                                            </FieldTitle>
                                        </FieldContent>
                                        <RadioGroupItem value="semantic"/>
                                    </Field>
                                </FieldLabel>
                            </RadioGroup>
                        </section>

                        <Separator/>

                        <section className="space-y-4">
                            <h4 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                                {t("SearchAlgorithms.TranslationSearch.Configuration.Methodology.ResultConfigs.Header")}
                            </h4>
                            <div className="space-y-2">
                                <div
                                    className="flex items-center justify-between p-4 bg-accent/30 rounded-lg"
                                    onClick={() => searchAlgorithm.emphasize = !searchAlgorithm.emphasize}
                                >
                                    <div className="flex-1 pr-4">
                                        <label
                                            className="text-sm font-semibold block">{t("SearchAlgorithms.TranslationSearch.Configuration.Methodology.ResultConfigs.EmphasizeMatches.Header")}</label>
                                        <p className="text-xs text-muted-foreground mt-1">{t("SearchAlgorithms.TranslationSearch.Configuration.Methodology.ResultConfigs.EmphasizeMatches.Description")}</p>
                                    </div>
                                    <Switch checked={searchAlgorithm.emphasize}/>
                                </div>

                                <div
                                    className="flex items-center justify-between p-4 bg-accent/30 rounded-lg"
                                    onClick={() => searchAlgorithm.filterSameVerse = !searchAlgorithm.filterSameVerse}
                                >
                                    <div className="flex-1 pr-4">
                                        <label
                                            className="text-sm font-semibold block">{t("SearchAlgorithms.TranslationSearch.Configuration.Methodology.ResultConfigs.FilterDuplicates.Header")}</label>
                                        <p className="text-xs text-muted-foreground mt-1">{t("SearchAlgorithms.TranslationSearch.Configuration.Methodology.ResultConfigs.FilterDuplicates.Description")}</p>
                                    </div>
                                    <Switch checked={searchAlgorithm.filterSameVerse}/>
                                </div>
                            </div>
                        </section>
                    </>
                )}
            </div>

            <footer className="p-4 border-t bg-card">
                <Button className="w-full h-12 rounded-xl text-base font-bold" onClick={onClose}>
                    Uygula
                </Button>
            </footer>
        </main>
    );

    return typeof window !== "undefined" ? createPortal(modalContent, document.body) : null;
});

export default MobileSearchBarSettingsModal;