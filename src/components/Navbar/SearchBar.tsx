"use client";

import React, {useEffect, useMemo, useState} from "react";
import {LuSearch} from "react-icons/lu";
import {Separator} from "@/components/ui/separator";
import {cn} from "@/lib/utils";
import SearchBarSettings from "@/components/Navbar/SearchBarSettings";
import QuickNavigationInformation from "@/components/Navbar/QuickNavigationInformation";
import {useTranslations} from "next-intl";
import {observer} from "mobx-react-lite";
import {SearchBarState} from "@/components/Navbar/classes/SearchBarState";
import MobileSearchModal from "@/components/Navbar/MobileSearchModal";
import {Button} from "@/components/ui/button";

type Props = {
    isCentered?: boolean;
}

const SearchBar: React.FC<Props> = observer(({isCentered = true}) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [isMobileModalOpen, setIsMobileModalOpen] = useState<boolean>(false);

    const searchBarState = useMemo(() => SearchBarState.getInstance(), []);
    const t = useTranslations('Navbar');

    useEffect(() => {
        if (!searchBarState.query.trim()) return;

        const timeoutId = setTimeout(async () => {
            await searchBarState.search();
        }, 1000);

        return () => clearTimeout(timeoutId);
    }, [searchBarState.query, searchBarState]);

    const handleFocus = () => {
        const isDeviceAComputer = typeof window !== 'undefined' && window.innerWidth > 1024;
        if (isDeviceAComputer) {
            setIsFocused(true);
            return;
        }
        setIsMobileModalOpen(true);
    };

    return (
        <>
            <div className="flex lg:hidden items-center justify-end w-full">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleFocus}
                    className="rounded-full h-10 w-10 text-muted-foreground"
                >
                    <LuSearch size={22}/>
                </Button>
            </div>

            <div
                className={cn(
                    "hidden lg:flex items-center transition-all duration-300",
                    isCentered && "fixed z-50 left-1/2 top-5 -translate-x-1/2 w-full max-w-2xl px-0"
                )}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className={cn(
                    "flex w-full items-center rounded-lg border border-input bg-background transition-all",
                    "focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/20",
                    isFocused && "rounded-b-none border-b-transparent shadow-lg"
                )}>
                    <aside className="px-3 flex items-center justify-center shrink-0">
                        <LuSearch size={18} className="text-muted-foreground"/>
                    </aside>

                    <Separator orientation="vertical" className="h-6 my-auto shrink-0"/>

                    <input
                        value={searchBarState.query}
                        onChange={(e) => searchBarState.query = e.target.value}
                        onFocus={handleFocus}
                        onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                        type="text"
                        placeholder={t('Placeholder')}
                        className="flex-1 bg-transparent px-3 py-2.5 text-sm outline-none placeholder:text-muted-foreground"
                    />

                    <div className={cn(
                        "flex items-center pr-3 gap-2 shrink-0 transition-opacity",
                        isHovered || isFocused ? "opacity-100" : "opacity-0 pointer-events-none"
                    )}>
                        <QuickNavigationInformation/>
                        <Separator orientation="vertical" className="h-6"/>
                        <SearchBarSettings/>
                    </div>
                </div>
            </div>

            {isMobileModalOpen && (
                <MobileSearchModal onClose={() => setIsMobileModalOpen(false)}/>
            )}
        </>
    );
});

export default SearchBar;