"use client"

import React from "react";
import NavbarButtons from "@/components/Navbar/NavbarButtons";
import SearchBar from "@/components/Navbar/SearchBar";
import ScriptiumBrand from "@/components/Navbar/ScriptiumBrand";

const Navbar: React.FC = () => {
    return (
        <nav className="sticky top-0 z-40 w-full h-20 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border-b border-border/40">
            <div className="container mx-auto h-full flex items-center justify-between px-4 md:px-8 lg:px-16">
                <ScriptiumBrand />

                <div className="flex-1 flex justify-center max-w-2xl px-8">
                    <SearchBar />
                </div>

                <NavbarButtons />
            </div>
        </nav>
    );
}

export default Navbar;