"use client"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {LuSettings2} from "react-icons/lu";
import React, {useMemo} from "react";
import {Separator} from "@/components/ui/separator";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Field, FieldContent, FieldDescription, FieldLabel, FieldTitle} from "@/components/ui/field";
import {
    TranslationSearchAlgorithm,
    TranslationSearchMethodology
} from "@/components/Navbar/classes/TranslationSearchAlgorithm";
import {RootSearchAlgorithm} from "@/components/Navbar/classes/RootSearchAlgorithm";
import {Switch} from "@/components/ui/switch";
import {observer} from "mobx-react-lite";
import {useTranslations} from "next-intl";
import {SearchBarState} from "@/components/Navbar/classes/SearchBarState";


const SearchBarSettings: React.FC = observer(() => {

    const t = useTranslations("Navbar.Configuration");


    const state = useMemo(() => SearchBarState.getInstance(), [])
    const searchAlgorithm = state.algorithm;

    const popOverRef = React.useRef<HTMLDivElement | null>(null);

    return <Popover>
        <PopoverTrigger>
            <LuSettings2 size={18}/>
        </PopoverTrigger>
        <PopoverContent
            className="transition-all duration-300 ease-in-out p-4"
            ref={popOverRef}
            style={{width: searchAlgorithm instanceof TranslationSearchAlgorithm ? "1024px" : "350px"}}
        >
            <div className="flex flex-row items-stretch">
                <div className="flex-1 min-w-70">
                    <h4 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-4">{t("Header")}</h4>
                    <RadioGroup
                        defaultValue={searchAlgorithm.key}
                        className="space-y-3"
                        onValueChange={e => {
                            const popOverElement = popOverRef.current;
                            if (!popOverElement) return;

                            switch (e) {
                                case TranslationSearchAlgorithm.getInstance().key:
                                    state.algorithm = TranslationSearchAlgorithm.getInstance();
                                    popOverElement.style.width = "1024px";
                                    break;
                                case RootSearchAlgorithm.getInstance().key:
                                    state.algorithm = RootSearchAlgorithm.getInstance();
                                    popOverElement.style.width = "350px";
                                    break;
                            }
                        }}
                    >
                        <FieldLabel htmlFor={TranslationSearchAlgorithm.getInstance().key}
                                    className="cursor-pointer block">
                            <Field orientation="horizontal" className="flex gap-2 items-center!">
                                <FieldContent>
                                    <FieldTitle
                                        className="text-[13px] font-semibold">{t("SearchAlgorithms.TranslationSearch.Header")}</FieldTitle>
                                    <FieldDescription className="text-xs leading-tight text-muted-foreground">
                                        {t("SearchAlgorithms.TranslationSearch.Description")}
                                    </FieldDescription>
                                </FieldContent>
                                <RadioGroupItem value={TranslationSearchAlgorithm.getInstance().key}
                                                id={TranslationSearchAlgorithm.getInstance().key}/>
                            </Field>
                        </FieldLabel>

                        <FieldLabel htmlFor={RootSearchAlgorithm.getInstance().key} className="cursor-pointer block">
                            <Field orientation="horizontal" className="flex gap-2 items-center!">
                                <FieldContent>
                                    <FieldTitle
                                        className="text-[13px] font-semibold">{t("SearchAlgorithms.RootSearch.Header")}</FieldTitle>
                                    <FieldDescription className="text-xs leading-tight text-muted-foreground">
                                        {t("SearchAlgorithms.RootSearch.Description")}
                                    </FieldDescription>
                                </FieldContent>
                                <RadioGroupItem disabled={true} value={RootSearchAlgorithm.getInstance().key}
                                                id={RootSearchAlgorithm.getInstance().key}/>
                            </Field>
                        </FieldLabel>
                    </RadioGroup>
                </div>

                {searchAlgorithm instanceof TranslationSearchAlgorithm && (
                    <>
                        <Separator orientation="vertical" className="mx-5 bg-border h-auto"/>

                        <div className="flex-1 min-w-60 space-y-4">
                            <h4 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">{t("SearchAlgorithms.TranslationSearch.Configuration.Methodology.Header")}</h4>
                            <RadioGroup
                                value={searchAlgorithm.methodology === TranslationSearchMethodology.TextSearch ? "match" : "semantic"}
                                onValueChange={(val) => searchAlgorithm.methodology = val === "match" ? TranslationSearchMethodology.TextSearch : TranslationSearchMethodology.ContextSearch}
                                className="space-y-3"
                            >
                                <FieldLabel className="cursor-pointer block">
                                    <Field orientation="horizontal" className="flex gap-2 items-center!">
                                        <FieldContent>
                                            <FieldTitle
                                                className="text-[13px] font-semibold">{t("SearchAlgorithms.TranslationSearch.Configuration.Methodology.SearchPreference.MatchSearch.Header")}</FieldTitle>
                                            <FieldDescription
                                                className="text-xs leading-tight text-muted-foreground">{t("SearchAlgorithms.TranslationSearch.Configuration.Methodology.SearchPreference.MatchSearch.Description")}</FieldDescription>
                                        </FieldContent>
                                        <RadioGroupItem value="match"/>
                                    </Field>
                                </FieldLabel>
                                <FieldLabel className="cursor-pointer block">
                                    <Field orientation="horizontal" className="flex gap-2 items-center!">
                                        <FieldContent>
                                            <FieldTitle
                                                className="text-[13px] font-semibold">{t("SearchAlgorithms.TranslationSearch.Configuration.Methodology.SearchPreference.SemanticSearch.Header")}</FieldTitle>
                                            <FieldDescription
                                                className="text-xs leading-tight text-muted-foreground">{t("SearchAlgorithms.TranslationSearch.Configuration.Methodology.SearchPreference.SemanticSearch.Description")}</FieldDescription>
                                        </FieldContent>
                                        <RadioGroupItem value="semantic"/>
                                    </Field>
                                </FieldLabel>
                            </RadioGroup>
                        </div>

                        <Separator orientation="vertical" className="mx-5 bg-border h-auto"/>

                        <div className="flex-1 w-full space-y-4">
                            <h4 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">{t("SearchAlgorithms.TranslationSearch.Configuration.Methodology.ResultConfigs.Header")}</h4>
                            <div className="space-y-3 pt-1 h-full">

                                <div
                                    className="flex items-center justify-between gap-3 cursor-pointer select-none rounded-sm transition-colors hover:bg-accent/50 p-3 group"
                                    onClick={() => searchAlgorithm.emphasize = !searchAlgorithm.emphasize}
                                >
                                    <div className="space-y-0.5">
                                        <label
                                            className="text-[13px] font-semibold block cursor-pointer">{t("SearchAlgorithms.TranslationSearch.Configuration.Methodology.ResultConfigs.EmphasizeMatches.Header")}</label>
                                        <p className="text-xs text-muted-foreground leading-tight">{t("SearchAlgorithms.TranslationSearch.Configuration.Methodology.ResultConfigs.EmphasizeMatches.Description")}</p>
                                    </div>
                                    <Switch checked={searchAlgorithm.emphasize}
                                            className="scale-75 origin-right pointer-events-none"/>
                                </div>

                                <div
                                    className="flex items-center justify-between gap-3 cursor-pointer select-none rounded-sm transition-colors hover:bg-accent/50 p-3 group"
                                    onClick={() => searchAlgorithm.filterSameVerse = !searchAlgorithm.filterSameVerse}
                                >
                                    <div className="space-y-0.5">
                                        <label
                                            className="text-[13px] font-semibold block cursor-pointer">{t("SearchAlgorithms.TranslationSearch.Configuration.Methodology.ResultConfigs.FilterDuplicates.Header")}</label>
                                        <p className="text-xs text-muted-foreground leading-tight">{t("SearchAlgorithms.TranslationSearch.Configuration.Methodology.ResultConfigs.FilterDuplicates.Description")}</p>
                                    </div>
                                    <Switch checked={searchAlgorithm.filterSameVerse}
                                            className="scale-75 origin-right pointer-events-none"/>
                                </div>

                            </div>
                        </div>
                    </>
                )}
            </div>
        </PopoverContent>
    </Popover>
})

export default SearchBarSettings;