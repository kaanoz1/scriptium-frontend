"use client";

import { NextPage } from "next";
import { motion, Variants } from "framer-motion";
import HeroSection from "./components/HeroSection";
import QuranCard from "./components/QuranCard";
import DisabledTorahCard from "./components/DisabledTorahCard";
import DisabledBibleCard from "./components/DisabledBibleCard";
import DisabledHinduismCard from "./components/DisabledHindusizmCard";
import DisabledBuddhismCard from "./components/DisabledBuddhismCard";
import SearchBar from "@/components/Navbar/SearchBar";

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { delayChildren: 0.15, staggerChildren: 0.1 }
    }
};

const Page: NextPage = () => {
    return (
        <main
            className="relative flex min-h-[calc(100vh-150px)] flex-col items-center justify-center overflow-hidden px-6 py-12 md:px-8">
            <div
                className="absolute top-1/4 left-1/2 -translate-x-1/2 -z-10 h-75 w-150 rounded-full bg-primary/10 blur-[120px] pointer-events-none" />

            <motion.div
                className="flex w-full max-w-6xl flex-col items-center gap-10 text-center"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <HeroSection />

                <div className="w-full max-w-2xl relative z-20">
                    <div className="relative w-full rounded-xl shadow-2xl shadow-black/5 dark:shadow-black/40">
                        <SearchBar isCentered={false} />
                    </div>
                </div>

                {/* Grid adjusted for 5 cards: 1 col on mobile, 2 on sm/md, 3 on lg/xl */}
                <div className="w-full mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
                    <QuranCard />
                    <DisabledBibleCard />
                    <DisabledTorahCard />
                    <DisabledHinduismCard />
                    <DisabledBuddhismCard />
                </div>
            </motion.div>
        </main>
    );
};

export default Page;