"use client"

import React, {useEffect, useRef} from "react";
import NavbarButtons from "@/components/Navbar/NavbarButtons";
import SearchBar from "@/components/Navbar/SearchBar";
import ScriptiumBrand from "@/components/Navbar/ScriptiumBrand";
import {usePathname} from "next/navigation";
import MobileHamburgerButton from "@/components/Navbar/MobileHamburgerButton";

const Navbar: React.FC = () => {

    const pathname = usePathname();
    const isHomePage = pathname === "/" || pathname === "/en" || pathname === "/tr";

    const navRef = useRef<HTMLElement>(null);

      useEffect(() => {
        const nav = navRef.current;
        if (!nav) return;

        const root = document.documentElement;
        let frame = 0;
        let last = -1;

        const update = () => {
            frame = 0;
            const offset = Math.max(0, Math.round(nav.getBoundingClientRect().bottom));
            if (offset === last) return;
            last = offset;
            root.style.setProperty("--navbar-offset", `${offset}px`);
        };

        const schedule = () => {
            if (!frame) frame = requestAnimationFrame(update);
        };

        update();
        window.addEventListener("scroll", schedule, {passive: true});
        window.addEventListener("resize", schedule);

        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener("scroll", schedule);
            window.removeEventListener("resize", schedule);
            root.style.removeProperty("--navbar-offset");
        };
    }, []);


    return (
        <nav
            ref={navRef}
            className="sticky top-0 z-40 w-full h-20 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border-b border-border/40">
            <div className="container mx-auto h-full flex items-center justify-between px-4 md:px-8 lg:px-16">
                <div className="shrink-0">
                    <ScriptiumBrand/>
                </div>

                {isHomePage || (
                    <div className="flex-1 flex justify-end lg:justify-center px-2 sm:px-8">
                        <SearchBar/>
                    </div>
                )}

                <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                    <div className="hidden md:flex items-center">
                        <NavbarButtons/>
                    </div>

                    <div className="flex md:hidden items-center">
                        <MobileHamburgerButton/>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;