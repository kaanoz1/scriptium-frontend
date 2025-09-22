"use client";
import { NextPage } from "next";
import { useState, useCallback } from "react";
import { FaSearch } from "react-icons/fa";
import { Divider } from "@heroui/divider";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/button";
import { useQuery } from "@tanstack/react-query";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import { fetchQuery } from "@/util/func";
import { useTypewriter } from "react-simple-typewriter";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import { TranslationTextWithVerseUpperMean } from "@/types/classes/model/TranslationText/TranslationText";
import { SearchResult } from "@/types/classes/util/SearchResult/SearchResult";
import QueryResultVerseBar from "./QueryResultVerseBar";
import { DEFAULT_LANG_CODE } from "@/util/constants";
import QueryResultSectionBar from "./QueryResultSectionBar";
import { ScriptureHelperCollection } from "@/types/classes/client/ScriptureHelper/ScriptureHelperCollection";

const SPLIT_REGEX = /[\s:.,|\\/=-]+/g;

const parseQueryToRoute = (query: string): string | null => {
  const parts = query.split(SPLIT_REGEX).filter(Boolean);
  if (parts.length === 0) return null;

  if (parts[0]?.startsWith("@")) {
    const userName = parts[0].slice(1).toLowerCase();
    return `/user/${userName}`;
  }

  const codeCandidate = parts[0]?.toLowerCase();
  if (new ScriptureHelperCollection().isCodeValid(codeCandidate ?? "")) {
    const rest = parts.slice(1);

    if (rest.length > 0) return `/${codeCandidate}/${rest.join("/")}`;
    else return `/${codeCandidate}`;
  }

  return null;
};

const MainPageSearchBar: NextPage = () => {
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

  const { data: queryData = null, isLoading } = useQuery<SearchResult | null>({
    queryKey: ["query", searchQuery],
    queryFn: async () => await fetchQuery(searchQuery),
    refetchInterval: Infinity,

    refetchOnWindowFocus: false,
    enabled: searchQuery.length !== 0,
  });

  const [placeholder] = useTypewriter({
    words: [
      "When God created the heavens...",
      "If I forget you, O Jerusalem...",
      "Let there be light.",
      "Who is like You among the gods?",
    ],
    loop: true,
    delaySpeed: 2000,
  });

  return (
    <div className="flex-grow w-full h-auto relative z-10">
      <div className="flex items-center rounded-xl bg-white dark:bg-dark border-2 border-opacity-50 dark:border-neutral-600 dark:hover:ring-neutral-800 border-gray-400 hover:ring-gray-300 hover:ring-2 focus-within:ring-2 dark:focus-within:ring-neutral-900  focus-within:ring-gray-300 transition duration-200 ease-in-out">
        <Button
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
          placeholder={placeholder}
          isInvalid={searchQuery.length >= 126}
          errorMessage={"Your query must not exceed 126 characters"}
          value={searchQuery}
          onInputChange={(input) => {
            if (input != "") setSearchQuery(input);
          }}
          classNames={{ endContentWrapper: "hidden" }}
        >
          {(queryData?.getSearchResultArray() ?? []).map((row) => {
            //They should be inline implementation since HeroUI utilizes the function of AutoCompleteItem directly which make us have to use them inline.
            if (row instanceof TranslationTextWithVerseUpperMean) {
              const verse = row.getVerse();
              const verseNumber = verse.getNumber();
              const chapter = verse.getChapter();
              const chapterNumber = chapter.getNumber();
              const section = chapter.getSection();
              const sectionNumber = section.getNumber();
              const scripture = section.getScripture();
              const scriptureCode = scripture.getCode();
              const url = `/${scriptureCode}/${sectionNumber}/${chapterNumber}/${verseNumber}`;
              const textValue = row
                .getTranslationText()
                .getText()
                .toLowerCase();

              return (
                <AutocompleteItem
                  key={`result-${row.getVerse().getId()}`}
                  href={url}
                  textValue={textValue}
                  variant="bordered"
                  className="w-full"
                  aria-label={`label-result-${row.getVerse().getId()}`}
                >
                  <QueryResultVerseBar translationText={row} />
                </AutocompleteItem>
              );
            } else {
              const section = row;
              const sectionName = section.getName();
              const sectionNumber = section.getNumber();
              const sectionMeaning =
                section.getMeaningTextOrDefault(DEFAULT_LANG_CODE);
              const scripture = section.getScripture();
              const scriptureName = scripture.getName();
              const scriptureMeaning =
                scripture.getMeaningTextOrDefault(DEFAULT_LANG_CODE);
              const scriptureCode = scripture.getCode();
              const url = `/${scriptureCode}/${sectionNumber}`;
              const rowHeader = `${scriptureMeaning} (${scriptureName}), ${sectionMeaning} (${sectionName})`;

              return (
                <AutocompleteItem
                  key={`result-section-${section.getNumber()}`}
                  href={url}
                  textValue={rowHeader}
                  variant="bordered"
                  className="w-full"
                  aria-label={`Section Result Row-${section.getNumber()}`}
                >
                  <QueryResultSectionBar section={section} />
                </AutocompleteItem>
              );
            }
          })}
        </Autocomplete>
      </div>
    </div>
  );
};

export default MainPageSearchBar;
