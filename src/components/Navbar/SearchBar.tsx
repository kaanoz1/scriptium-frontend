"use client";

import React, { useMemo, useState } from "react";
import { LuSearch } from "react-icons/lu";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import SearchBarSettings from "@/components/Navbar/SearchBarSettings";
import { SearchAlgorithm } from "@/components/Navbar/classes/SearchAlgorithm";
import { SearchConfiguration } from "@/components/Navbar/classes/SearchConfiguration";
import QuickNavigationInformation from "@/components/Navbar/QuickNavigationInformation";
import SearchBarResults from "./SearchBarResults"; // Ensure this path is correct
import { useTranslations } from "next-intl";
import { toast } from "sonner";

type Props = {
    isCentered?: boolean;
}

const SearchBar: React.FC<Props> = ({ isCentered = true }) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [input, setInput] = useState<string>("");

    const searchConfiguration = useMemo(() => SearchConfiguration.getInstance(), []);
    const [selectedSearchAlgorithm, setSelectedSearchAlgorithm] = useState<SearchAlgorithm<unknown>>(searchConfiguration.algorithm);

    const t = useTranslations('Navbar');

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && input.length >= 2) {
            toast.info("Search started", {
                description: `Searching for "${input}" using ${selectedSearchAlgorithm.key}...`,
                duration: 2000,
            });
        }
    };

    return (
        <div
            className={cn(
                "relative w-full max-w-2xl transition-all",
                isCentered && "fixed z-50 left-1/2 top-5 -translate-x-1/2"
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className={cn(
                "flex items-center rounded-lg border border-input bg-background transition-all",
                "focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/20",
                isFocused && "rounded-b-none border-b-transparent shadow-lg"
            )}>
                <aside className="px-2 ps-3 flex items-center justify-center">
                    <div className="p-1 cursor-pointer text-muted-foreground hover:text-primary transition-colors">
                        <LuSearch size={18} />
                    </div>
                </aside>

                <Separator orientation="vertical" className="h-6 my-auto" />

                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setTimeout(() => setIsFocused(false), 200)} // Delay to allow clicks on results
                    onKeyDown={handleKeyDown}
                    type="text"
                    placeholder={t('Placeholder')}
                    className="flex-1 min-w-[320px] bg-transparent px-3 py-2.5 text-base md:text-sm outline-none placeholder:text-muted-foreground"
                />

                <div className={cn(
                    "flex items-center pr-3 transition-opacity duration-300 text-muted-foreground gap-2",
                    (isHovered || isFocused) ? "opacity-100" : "opacity-0 pointer-events-none"
                )}>
                    <QuickNavigationInformation />
                    <Separator orientation="vertical" className="h-6 my-auto" />
                    <SearchBarSettings
                        selectedSearchAlgorithm={selectedSearchAlgorithm}
                        setSelectedSearchAlgorithm={setSelectedSearchAlgorithm}
                    />
                </div>
            </div>

            <SearchBarResults
                searchAlgorithm={selectedSearchAlgorithm}
                query={input}
                onClose={() => setInput("")}
            />
        </div>
    );
};

export default SearchBar;