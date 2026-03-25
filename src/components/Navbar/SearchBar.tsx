"use client";

import React, {useMemo, useState} from "react";
import {LuSearch} from "react-icons/lu";
import {Separator} from "@/components/ui/separator";
import {cn} from "@/lib/utils";
import SearchBarSettings from "@/components/Navbar/SearchBarSettings";
import {SearchAlgorithm} from "@/components/Navbar/classes/SearchAlgorithm";
import {SearchConfiguration} from "@/components/Navbar/classes/SearchConfiguration";
import QuickNavigationInformation from "@/components/Navbar/QuickNavigationInformation";

type Props = {
    isCentered?: boolean;
}

const SearchBar: React.FC<Props> = ({isCentered = true}) => {
    const [isHovered, setIsHovered] = React.useState<boolean>(false);
    const [isFocused, setIsFocused] = React.useState<boolean>(false);

    const shouldShowSettings = isHovered || isFocused;

    const searchConfiguration = useMemo(() => SearchConfiguration.getInstance(), []);


    const [selectedSearchAlgorithm, setSelectedSearchAlgorithm] = useState<SearchAlgorithm>(searchConfiguration.algorithm);


    return (
        <div className={cn(
            "flex items-center rounded-lg border border-input bg-background transition-colors",
            "focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50",
            isCentered ? "fixed z-50 left-1/2 top-5 -translate-x-1/2" : "relative"
        )}
             onMouseEnter={() => setIsHovered(true)}
             onMouseLeave={() => setIsHovered(false)}
        >
            <aside className="px-2 ps-3 flex items-center justify-center">
                <div className="p-1 cursor-pointer text-muted-foreground">
                    <LuSearch size={18}/>
                </div>
            </aside>

            <Separator orientation="vertical" className="h-6 my-auto"/>

            <input
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                type="text"
                placeholder="Search..."
                className="w-lg min-w-[320px] bg-transparent px-3 py-2 text-base md:text-sm outline-none placeholder:text-muted-foreground"
            />

            <div className={cn(
                "flex items-center pr-3 transition-opacity duration-300 text-muted-foreground hover:text-foreground cursor-pointer gap-2 justify-between",
                shouldShowSettings ? "opacity-100" : "opacity-0 pointer-events-none"
            )}>


                <QuickNavigationInformation/>

                <Separator orientation="vertical" className="h-6 my-auto"/>

                <SearchBarSettings selectedSearchAlgorithm={selectedSearchAlgorithm}
                                   setSelectedSearchAlgorithm={setSelectedSearchAlgorithm}/>
            </div>
        </div>
    );
};

export default SearchBar;