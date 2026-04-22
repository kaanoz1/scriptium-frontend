import React, {useEffect, useMemo, useState} from "react";
import {createPortal} from "react-dom";
import {ArrowLeft} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {observer} from "mobx-react-lite";
import {SearchBarState} from "@/components/Navbar/classes/SearchBarState";
import {ErrorResult} from "@/components/Navbar/classes/ErrorResult";
import {Command, CommandGroup, CommandItem, CommandList} from "@/components/ui/command";
import {LuArrowRight, LuBook, LuSearchCode, LuSettings2} from "react-icons/lu";
import {useRouter} from "next/navigation";
import {QuickNavigationResult} from "@/components/Navbar/classes/QuickNavigationResult";
import {VerseTranslationWithVerse} from "@/classes/Islam/Quran/VerseTranslation/WithVerse";
import {RootPlain} from "@/classes/Islam/Quran/Root/Plain";
import {useLocale} from "use-intl";
import MobileSearchBarSettingsModal from "@/components/Navbar/MobileSearchBarSettingsModal";
import {TranslationSearchAlgorithm} from "@/components/Navbar/classes/TranslationSearchAlgorithm";
import {useTranslations} from "next-intl";

type Props = {
    onClose: () => void;
};

const MobileSearchModal: React.FC<Props> = observer(({onClose}) => {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const router = useRouter();
    const locale = useLocale();
    const state = useMemo(() => SearchBarState.getInstance(), []);
    const result = state.result;

    const t = useTranslations("Navbar.QuickNavigation.MobileSearchModal");

    useEffect(() => {
        const originalStyle = window.getComputedStyle(document.body).overflow;
        document.body.style.overflow = 'hidden';

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

    const modalContent = (
        <main className="fixed inset-0 z-9999 bg-background flex flex-col animate-in fade-in duration-200">
            <header className="flex items-center gap-1 p-2 border-b bg-card">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    className="shrink-0 rounded-full h-9 w-9"
                >
                    <ArrowLeft className="h-5 w-5 text-muted-foreground"/>
                </Button>

                <div className="flex-1">
                    <Input
                        autoFocus
                        value={state.query}
                        onChange={(e) => state.query = e.target.value}
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
                    <LuSettings2 size={18} className="text-muted-foreground"/>
                </Button>
            </header>

            <section className="flex-1 overflow-y-auto overflow-x-hidden">
                <Command className="rounded-none border-none h-full bg-transparent">
                    <CommandList className="max-h-full h-full p-4">
                        {result instanceof QuickNavigationResult && (
                            <CommandGroup heading="Quick Navigation">
                                <CommandItem
                                    className="flex items-center gap-3 p-3 cursor-pointer rounded-lg bg-primary/5 border border-primary/20 hover:bg-primary/10 transition-colors"
                                    onSelect={() => {
                                        state.query = "";
                                        router.push(`/${locale}/` + result.url);
                                        onClose();
                                    }}
                                >
                                    <div
                                        className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-sm">
                                        <LuArrowRight size={18}/>
                                    </div>
                                    <div className="flex flex-col flex-1">
                                        <span className="font-bold text-sm text-foreground">
                                            {result.description}
                                        </span>
                                        <span className="text-xs text-muted-foreground">
                                            {t("PressEnterToNavigateDirectly")}
                                        </span>
                                    </div>
                                </CommandItem>
                            </CommandGroup>
                        )}

                        {result instanceof ErrorResult && (
                            <CommandGroup heading="System Error">
                                <CommandItem
                                    className="flex items-center gap-3 p-3 cursor-pointer rounded-lg bg-destructive/5 border border-destructive/20 hover:bg-destructive/10 transition-colors">
                                    <div
                                        className="flex h-8 w-8 items-center justify-center rounded-md bg-destructive text-destructive-foreground shadow-sm">
                                        <LuArrowRight size={18}/>
                                    </div>
                                    <div className="flex flex-col flex-1">
                                        <span className="font-bold text-sm text-foreground">
                                            {result.description}
                                        </span>
                                        <span className="text-xs text-muted-foreground">
                                            {t("IfThisPersistContactUs")}
                                        </span>
                                    </div>
                                </CommandItem>
                            </CommandGroup>
                        )}

                        {!(result instanceof QuickNavigationResult) && !(result instanceof ErrorResult) && result != null && Array.isArray(result) && (
                            <div className="space-y-4">
                                {result.length > 0 ? (
                                    <>
                                        {result[0] instanceof VerseTranslationWithVerse && (
                                            <CommandGroup heading="Translations">
                                                {(() => {
                                                    let displayResults = result as VerseTranslationWithVerse[];

                                                    if (state.algorithm instanceof TranslationSearchAlgorithm && state.algorithm.filterSameVerse) {
                                                        const seenVerses = new Set();
                                                        displayResults = displayResults.filter((item) => {
                                                            const identifier = `${item.verse.chapter.sequence}:${item.verse.sequence}`;
                                                            if (seenVerses.has(identifier)) return false;
                                                            seenVerses.add(identifier);
                                                            return true;
                                                        });
                                                    }

                                                    const highlightText = (text: string, query: string) => {
                                                        if (!(state.algorithm instanceof TranslationSearchAlgorithm) || !state.algorithm.emphasize || !query.trim())
                                                            return text;

                                                        const parts = text.split(new RegExp(`(${query})`, "gi"));
                                                        return parts.map((part, i) =>
                                                            part.toLowerCase() === query.toLowerCase()
                                                                ?
                                                                <b key={i} className="text-primary font-bold">{part}</b>
                                                                : part
                                                        );
                                                    };

                                                    return displayResults.map((item, idx) => {
                                                        const verseItem = item;
                                                        const translationName = verseItem.translation.name;
                                                        const authors = verseItem.translation.authors.map((a) => a.name).join(", ") || "";
                                                        const chapterNumber = verseItem.verse.chapter.sequence;
                                                        const verseNumber = verseItem.verse.sequence;
                                                        const chapterName = verseItem.verse.chapter.name;
                                                        const verseReference = `${chapterNumber}:${verseNumber}`;

                                                        return (
                                                            <CommandItem
                                                                key={idx}
                                                                onSelect={() => {
                                                                    state.query = "";
                                                                    router.push(`/${locale}/i/q/${chapterNumber}/${verseNumber}`);
                                                                    onClose();
                                                                }}
                                                                className="flex flex-col items-start gap-2 p-3 my-1 cursor-pointer rounded-lg border border-transparent hover:border-border transition-colors"
                                                            >
                                                                <div
                                                                    className="flex items-center justify-between w-full">
                                                                    <div className="flex items-center gap-2">
                                                                        <div
                                                                            className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 text-primary">
                                                                            <LuBook size={14}/>
                                                                        </div>
                                                                        <span
                                                                            className="font-semibold text-sm text-foreground">
                                    {chapterName}
                                </span>
                                                                        <span
                                                                            className="text-xs font-medium text-muted-foreground bg-muted px-1.5 py-0.5 rounded-sm">
                                    {verseReference}
                                </span>
                                                                    </div>
                                                                </div>

                                                                <div className="w-full pl-9 pr-2">
                                                                    <p className="text-sm text-foreground leading-relaxed line-clamp-3">
                                                                        {highlightText(verseItem.text, state.query)}
                                                                    </p>
                                                                </div>

                                                                <div
                                                                    className="flex items-center flex-wrap gap-x-2 gap-y-1 w-full pl-9 mt-1 text-[11px] text-muted-foreground">
                            <span className="font-medium text-foreground/80">
                                {translationName}
                            </span>
                                                                    {authors && (
                                                                        <>
                                                                            <span
                                                                                className="w-1 h-1 rounded-full bg-muted-foreground/50"/>
                                                                            <span className="italic">{authors}</span>
                                                                        </>
                                                                    )}
                                                                    {verseItem.translation.language.code && (
                                                                        <>
                                                                            <span
                                                                                className="w-1 h-1 rounded-full bg-muted-foreground/50"/>
                                                                            <span className="uppercase tracking-wider">
                                        {verseItem.translation.language.code === locale ? "Local" : verseItem.translation.language.code}
                                    </span>
                                                                        </>
                                                                    )}
                                                                </div>
                                                            </CommandItem>
                                                        );
                                                    });
                                                })()}
                                            </CommandGroup>
                                        )}

                                        {result[0] instanceof RootPlain && (
                                            <CommandGroup heading="Lexical Roots">
                                                {result.map((item, idx) => {
                                                    const root = item as RootPlain;
                                                    const text = root.text;
                                                    const latin = root.text;
                                                    return (
                                                        <CommandItem
                                                            key={idx}
                                                            onSelect={() => {
                                                                router.push(`/${locale}/i/q/${latin}`);
                                                                onClose();
                                                            }}
                                                            className="flex gap-3 p-3 items-center cursor-pointer rounded-lg border border-transparent hover:border-border transition-colors"
                                                        >
                                                            <div
                                                                className="flex h-9 w-9 items-center justify-center rounded-md bg-indigo-500/10 text-indigo-500">
                                                                <LuSearchCode size={20}/>
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <span
                                                                    className="font-mono text-lg font-bold text-foreground leading-none">
                                                                    {text}
                                                                </span>
                                                                <span className="text-xs text-muted-foreground mt-1">
                                                                    {latin}
                                                                </span>
                                                            </div>
                                                        </CommandItem>
                                                    );
                                                })}
                                            </CommandGroup>
                                        )}
                                    </>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-10 text-center">
                                        <span className="text-sm font-medium text-muted-foreground">
                                            {t("NoResultsFound")}
                                        </span>
                                        <p className="text-xs text-muted-foreground/60">
                                            {t("TryAdjustingYourSearch")}
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}
                    </CommandList>
                </Command>
            </section>

            {isSettingsOpen && (
                <MobileSearchBarSettingsModal onClose={() => setIsSettingsOpen(false)}/>
            )}
        </main>
    );

    return typeof window !== 'undefined'
        ? createPortal(modalContent, document.body)
        : null;
});

export default MobileSearchModal;