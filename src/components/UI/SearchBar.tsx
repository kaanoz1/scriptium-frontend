"use client";
import { NextPage } from "next";
import { useState, useCallback } from "react";
import { FaSearch } from "react-icons/fa";
import { Divider } from "@heroui/divider";
import { useRouter } from "next/navigation";
import { fetchQuery } from "@/util/utils";
import { Button } from "@heroui/button";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "./LoadingSpinner";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import SearchBarResultRow from "../SearchBarResultRow";
import { TranslationTextWithVerseUpperMeanDTO } from "@/types/classes/TranslationText";
import { T_ScriptureCode } from "@/types/types";
import { isValidScriptureCode } from "@/util/func";

const SPLIT_REGEX = /[\s:.,|\\/=-]+/g;

const parseQueryToRoute = (query: string): string | null => {
  const parts = query.split(SPLIT_REGEX).filter(Boolean);
  if (parts.length === 0) return null;

  if (parts[0]?.startsWith("@")) {
    const userName = parts[0].slice(1).toLowerCase();
    return `/user/${userName}`;
  }

  const codeCandidate = parts[0]?.toLowerCase();
  if (isValidScriptureCode(codeCandidate ?? "")) {
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
      const trimmedQuery = query.trim();
      if (!trimmedQuery) return;

      const route = parseQueryToRoute(trimmedQuery);

      if (route) router.push(route);
    },
    [router]
  );

  const { data: queryData = [], isLoading } = useQuery<
    Array<TranslationTextWithVerseUpperMeanDTO>
  >({
    queryKey: ["query", searchQuery],
    queryFn: async () => await fetchQuery(searchQuery),
    refetchInterval: Infinity,

    refetchOnWindowFocus: false,
    enabled: searchQuery.length !== 0,
  });

  return (
    <div className="flex-grow w-full h-auto">
      <div className="flex items-center rounded-xl border-2 border-opacity-50 dark:border-neutral-600 dark:hover:ring-neutral-800 border-gray-400 hover:ring-gray-300 hover:ring-2 focus-within:ring-2 dark:focus-within:ring-neutral-900  focus-within:ring-gray-300 transition duration-200 ease-in-out">
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
          {isLoading ? <LoadingSpinner /> : <FaSearch size={16} />}
        </Button>

        <Divider className="w-px h-6 bg-gray-300" orientation="vertical" />

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
          classNames={{ endContentWrapper: "hidden" }}
        >
          {queryData.map((tt) => {
            const scriptureCode: T_ScriptureCode = tt
              .getVerse()
              .getChapter()
              .getSection()
              .getScripture()
              .getCode();

            const sectionNumber: number = tt
              .getVerse()
              .getChapter()
              .getSection()
              .getNumber();
            const chapterNumber: number = tt
              .getVerse()
              .getChapter()
              .getNumber();
            const verseNumber: number = tt.getVerse().getNumber();

            const url: string = `/${scriptureCode}/${sectionNumber}/${chapterNumber}/${verseNumber}`;

            return (
              <AutocompleteItem
                variant="bordered"
                href={url}
                className="w-full"
                textValue={tt.getTranslationText().getText().toLowerCase()}
                aria-label={`label-result-${tt.getVerse().getId()}`}
                key={`result-${tt
                  .getTranslationText()
                  .getTranslation()
                  .getId()}`}
              >
                <SearchBarResultRow
                  translationText={tt}
                  key={`result-${tt.getVerse().getId()}`}
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
