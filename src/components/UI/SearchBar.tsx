"use client";
import {NextPage} from "next";
import {useState, useCallback} from "react";
import {FaSearch} from "react-icons/fa";
import {Divider} from "@heroui/divider";
import {useRouter} from "next/navigation";
import {fetchQuery, isAvailableScriptureKey} from "@/util/utils";
import {Button} from "@heroui/button";
import {
    AvailableScriptureKey,
    TranslationTextExtendedVerseDTO,
} from "@/types/types";
import {useQuery} from "@tanstack/react-query";
import LoadingSpinner from "./LoadingSpinner";
import {Autocomplete, AutocompleteItem} from "@heroui/autocomplete";
import SearchBarResultRow from "../SearchBarResultRow";

const SPLIT_REGEX = /[\s:.,|\\/=-]+/g;

const parseQueryToRoute = (query: string): string | null => {
    const parts = query.split(SPLIT_REGEX).filter(Boolean);
    if (parts.length === 0) return null;

    if (parts[0].startsWith("@")) {
        const userName = parts[0].slice(1).toLowerCase();
        return `/user/${userName}`;
    }

    const codeCandidate = parts[0].toLowerCase();
    if (isAvailableScriptureKey(codeCandidate)) {
        const rest = parts.slice(1);

        if (rest.length > 0) return `/${codeCandidate}/${rest.join("/")}`;
        else return `/${codeCandidate}`;
    }

    return null;
};

const SearchBar: NextPage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();

    const handleSearch = useCallback(
        async (query: string) => {
            console.log(query);

            const trimmedQuery = query.trim();
            if (!trimmedQuery) return;

            console.log(trimmedQuery);

            const route = parseQueryToRoute(trimmedQuery);

            if (route) router.push(route);

        },
        [router]
    );

    const {data: queryData = [], isLoading} = useQuery<
        Array<TranslationTextExtendedVerseDTO>
    >({
        queryKey: ["query", searchQuery],
        queryFn: async () => await fetchQuery(searchQuery),
        refetchInterval: Infinity,

        refetchOnWindowFocus: false,
        enabled: searchQuery.length !== 0,
    });

    return (
        <div className="flex-grow w-full h-auto">
            <div
                className="flex items-center rounded-xl border-2 border-opacity-50 dark:border-neutral-600 dark:hover:ring-neutral-800 border-gray-400 hover:ring-gray-300 hover:ring-2 focus-within:ring-2 dark:focus-within:ring-neutral-900  focus-within:ring-gray-300 transition duration-200 ease-in-out">
                <Button
                    onMouseDown={(e) => {
                        // Prevents focus from leaving the Autocomplete input
                        e.preventDefault();
                    }}
                    className={`flex-shrink-0 px-3 py-2 ${
                        isLoading
                            ? "dark:text-gray-100 text-gray-800"
                            : "text-neutral-700 dark:text-gray-400"
                    } ${searchQuery.trim() && !isLoading ? "cursor-pointer" : undefined}`}
                    onPress={() => handleSearch(searchQuery)}
                    isLoading={isLoading}
                    disabled={!searchQuery.trim() || isLoading}
                    isIconOnly
                    variant="light"
                >
                    {isLoading ? <LoadingSpinner/> : <FaSearch size={16}/>}
                </Button>

                <Divider className="w-px h-6 bg-gray-300" orientation="vertical"/>

                <Autocomplete
                    itemHeight={80}
                    defaultFilter={() => true}
                    aria-label="search-query-results"
                    menuTrigger="focus"
                    showScrollIndicators
                    placeholder="Search..."
                    isInvalid={searchQuery.length >= 126}
                    errorMessage={"Your query must not exceed 126 characters"}
                    value={searchQuery}
                    onInputChange={(input) => {
                        if (input != "") setSearchQuery(input);
                    }}
                    classNames={{endContentWrapper: "hidden"}}
                >
                    {queryData.map((tt) => {
                        const scriptureCode: AvailableScriptureKey =
                            tt.verse.chapter.section.scripture.code;
                        const sectionNumber: number = tt.verse.chapter.section.number;
                        const chapterNumber: number = tt.verse.chapter.number;
                        const verseNumber: number = tt.verse.number;

                        const url: string = `/${scriptureCode}/${sectionNumber}/${chapterNumber}/${verseNumber}`;

                        return (
                            <AutocompleteItem
                                variant="bordered"
                                href={url}
                                className="w-full"
                                textValue={tt.text.toLowerCase()}
                                aria-label={`label-result-${tt.verse.id}`}
                                key={`result-${tt.verse.id}`}
                            >
                                <SearchBarResultRow
                                    translationText={tt}
                                    key={`result-${tt.verse.id}`}
                                />
                            </AutocompleteItem>
                        );
                    })}
                </Autocomplete>
            </div>
        </div>
    );
};

export default SearchBar;
