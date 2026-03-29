"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { SearchAlgorithm } from "@/components/Navbar/classes/SearchAlgorithm";
import { TranslationSearchAlgorithm } from "@/components/Navbar/classes/TranslationSearchAlgorithm";
import { RootSearchAlgorithm } from "@/components/Navbar/classes/RootSearchAlgorithm";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { LuBook, LuSearchCode, LuArrowRight } from "react-icons/lu";
import { SearchResultPlain } from "@/classes/Shared/SearchResult/Plain";
import { RootPlain } from "@/classes/Islam/Quran/Root/Plain";

type Props = {
    searchAlgorithm: SearchAlgorithm<unknown>;
    query: string;
    onClose: () => void;
};

interface NavigationShortcut {
    url: string;
    chapter: string;
    verse?: string;
}

// CAUTION!!
// Due to time constraints, this component was written by AI.
// CAUTION!!

const SearchBarResults: React.FC<Props> = ({ searchAlgorithm, query, onClose }) => {
    const router = useRouter();
    const locale = useLocale();

    const [results, setResults] = useState<unknown>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [shortcut, setShortcut] = useState<NavigationShortcut | null>(null);

    const executeSearch = useCallback(async (isManual: boolean = false) => {
        if (query.length < 1) return;

        const match = query.match(/^\s*(\d+)(?:[\s:]+(\d+))?\s*$/);

        if (match) {
            const chapter = match[1];
            const verse = match[2];
            const targetUrl = verse ? `/${locale}/i/q/${chapter}/${verse}` : `/${locale}/i/q/${chapter}`;

            if (isManual) {
                router.push(targetUrl);
                onClose();
                return;
            } else {
                setShortcut({ url: targetUrl, chapter, verse });
                setResults(null);
                setIsLoading(false);
                return;
            }
        } else {
            setShortcut(null);
        }

        if (query.length < 2) return;


        setIsLoading(true);
        try {
            const data = await searchAlgorithm.search(query);
            setResults(data);
        } catch (error) {
            console.error("Scriptium Search Error:", error);

        } finally {
            setIsLoading(false);
        }
    }, [query, searchAlgorithm, locale, router, onClose]);

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            if (query.length >= 1) executeSearch(false);
            else {
                setResults(null);
                setShortcut(null);
            }
        }, 300);

        return () => clearTimeout(debounceTimer);
    }, [query, executeSearch]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Enter" && query.length >= 1) {
                executeSearch(true);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [query, executeSearch]);

    if (query.length === 0 || (!results && !isLoading && !shortcut)) return null;

    return (
        <div className={cn(
            "z-50 border border-border bg-popover text-popover-foreground shadow-xl overflow-hidden transition-all",
            "fixed inset-0 w-screen h-screen sm:absolute sm:inset-auto sm:top-full sm:mt-2 sm:w-full sm:h-auto sm:max-h-125 sm:rounded-xl"
        )}>
            <Command className="h-full sm:h-auto bg-transparent">
                <CommandList className="max-h-none sm:max-h-112.5 h-full">
                    <ScrollArea className="h-full">
                        <CommandEmpty className="p-8 text-sm text-center text-muted-foreground">
                            {isLoading ? "Analyzing sources..." : "No results found."}
                        </CommandEmpty>

                        {shortcut && (
                            <CommandGroup heading="Quick Navigation" className="p-2">
                                <CommandItem
                                    className="flex items-center gap-3 p-3 cursor-pointer rounded-lg bg-primary/5 border border-primary/20 hover:bg-primary/10 transition-colors"
                                    onSelect={() => {
                                        router.push(shortcut.url);
                                        onClose();
                                    }}
                                >
                                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-sm">
                                        <LuArrowRight size={18}/>
                                    </div>
                                    <div className="flex flex-col flex-1">
                                        <span className="font-bold text-sm text-foreground">
                                            Go to Chapter {shortcut.chapter} {shortcut.verse ? `Verse ${shortcut.verse}` : ""}
                                        </span>
                                        <span className="text-xs text-muted-foreground">
                                            Press Enter to navigate directly
                                        </span>
                                    </div>
                                </CommandItem>
                            </CommandGroup>
                        )}

                        {searchAlgorithm instanceof TranslationSearchAlgorithm && results !== null && (
                            <CommandGroup heading="Translations" className="p-2">
                                {(results as SearchResultPlain).verses?.map((verseItem, i: number) => {
                                    const translationName = verseItem.translation?.name || "Unknown Translation";
                                    const authors = verseItem.translation?.authors?.map((a) => a.name).join(", ") || "";
                                    const chapterNumber = verseItem.verse?.chapter.sequence;
                                    const verseNumber = verseItem.verse?.sequence;
                                    const chapterName = verseItem.verse?.chapter?.name || `Chapter ${chapterNumber}`;
                                    const verseReference = `${chapterNumber}:${verseNumber}`;

                                    return (
                                        <CommandItem
                                            key={i}
                                            onSelect={() => {
                                                if (chapterNumber && verseNumber) {
                                                    router.push(`/${locale}/i/q/${chapterNumber}/${verseNumber}`);
                                                    onClose();
                                                }
                                            }}
                                            className="flex flex-col items-start gap-2 p-3 my-1 cursor-pointer rounded-lg border border-transparent hover:border-border transition-colors"
                                        >
                                            <div className="flex items-center justify-between w-full">
                                                <div className="flex items-center gap-2">
                                                    <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 text-primary">
                                                        <LuBook size={14}/>
                                                    </div>
                                                    <span className="font-semibold text-sm text-foreground">
                                                        {chapterName}
                                                    </span>
                                                    <span className="text-xs font-medium text-muted-foreground bg-muted px-1.5 py-0.5 rounded-sm">
                                                        {verseReference}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="w-full pl-9 pr-2">
                                                <p className="text-sm text-foreground leading-relaxed line-clamp-3">
                                                    {verseItem.text}
                                                </p>
                                            </div>

                                            <div className="flex items-center flex-wrap gap-x-2 gap-y-1 w-full pl-9 mt-1 text-[11px] text-muted-foreground">
                                                <span className="font-medium text-foreground/80">
                                                    {translationName}
                                                </span>
                                                {authors && (
                                                    <>
                                                        <span className="w-1 h-1 rounded-full bg-muted-foreground/50"/>
                                                        <span className="italic">{authors}</span>
                                                    </>
                                                )}
                                                {verseItem.translation?.language?.code && (
                                                    <>
                                                        <span className="w-1 h-1 rounded-full bg-muted-foreground/50"/>
                                                        <span className="uppercase tracking-wider">
                                                            {verseItem.translation.language.code === locale ? "Local" : verseItem.translation.language.code}
                                                        </span>
                                                    </>
                                                )}
                                            </div>
                                        </CommandItem>
                                    );
                                })}
                            </CommandGroup>
                        )}

                        {searchAlgorithm instanceof RootSearchAlgorithm && results !== null && (
                            <CommandGroup heading="Lexical Roots" className="p-2">
                                {(results as RootPlain[]).map((root, i) => (
                                    <CommandItem
                                        key={i}
                                        onSelect={() => {
                                        }}
                                        className="flex gap-3 p-3 items-center cursor-pointer"
                                    >
                                        <LuSearchCode className="text-indigo-500" size={18}/>
                                        <div className="flex flex-col">
                                            <span className="font-mono text-lg font-bold text-foreground">
                                                {root.text}
                                            </span>
                                            <span className="text-xs text-muted-foreground">
                                                {root.latin}
                                            </span>
                                        </div>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        )}
                    </ScrollArea>
                </CommandList>
            </Command>
        </div>
    );
};

export default SearchBarResults;