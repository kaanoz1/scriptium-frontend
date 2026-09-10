"use client";

import React, { useEffect, useMemo, useState } from "react";
import { LuSearch } from "react-icons/lu";
import { useTranslations } from "next-intl";
import { observer } from "mobx-react-lite";
import { SearchBarState } from "@/components/Navbar/classes/SearchBarState";
import MobileSearchModal from "@/components/Navbar/MobileSearchModal";
import SearchCommandDialog from "@/components/Navbar/SearchCommandDialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Kbd from "@/components/Navbar/Kbd";

type Props = {
  isCentered?: boolean;
};

const SearchBar: React.FC<Props> = observer(({ isCentered = true }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);

  const searchBarState = useMemo(() => SearchBarState.getInstance(), []);
  const t = useTranslations("Navbar");

  const isComputer = () =>
    typeof window !== "undefined" && window.innerWidth > 1024;

  const handleTriggerClick = () => {
    if (isComputer()) {
      setIsDialogOpen(true);
      return;
    }
    setIsMobileModalOpen(true);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isComputer()) setIsDialogOpen((prev) => !prev);
        else setIsMobileModalOpen((prev) => !prev);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <div className="flex lg:hidden items-center justify-end w-full">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleTriggerClick}
          className="rounded-full h-10 w-10 text-muted-foreground"
        >
          <LuSearch size={22} />
        </Button>
      </div>

      <button
        type="button"
        onClick={handleTriggerClick}
        className={cn(
          "hidden lg:flex items-center w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-muted-foreground transition-all",
          "hover:border-ring/50 hover:bg-accent/30",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/20",
          isCentered && "fixed z-50 left-1/2 top-5 -translate-x-1/2 max-w-2xl",
        )}
      >
        <LuSearch size={18} className="shrink-0" />
        <span className="flex-1 truncate px-3 text-left">
          {searchBarState.query.trim()
            ? searchBarState.query
            : t("Placeholder")}
        </span>
        <Kbd>
          <span>⌘</span>K
        </Kbd>
      </button>

      <SearchCommandDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />

      {isMobileModalOpen && (
        <MobileSearchModal onClose={() => setIsMobileModalOpen(false)} />
      )}
    </>
  );
});

export default SearchBar;
