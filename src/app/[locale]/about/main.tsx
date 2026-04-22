"use client";

import React from "react";
import WhatIsScriptiumSection from "./components/WhatIsScriptiumSection";
import BetaWarningSection from "./components/BetaWarningSection";
import DataSupplierSection from "./components/DataSupplierSection";
import ContactSection from "./components/ContactSection";
import DiscordSection from "./components/DiscordSection";
import TechnologiesSection from "@/app/[locale]/about/components/TechnologiesSection";

const Main: React.FC = () => {
    return (
        <main className="flex flex-col items-center w-full max-w-480 mx-auto pb-24 overflow-hidden gap-12 sm:gap-16 pt-16">

            <WhatIsScriptiumSection />
            <BetaWarningSection />
            <DataSupplierSection />

            <section className="w-full px-4 sm:px-8 md:px-12 lg:px-24 xl:px-48 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ContactSection />
                    <DiscordSection />
                </div>
            </section>

            <div className="w-full px-4 sm:px-8 md:px-12 lg:px-24 xl:px-48 max-w-7xl mx-auto">
                <TechnologiesSection />
            </div>

        </main>
    );
};

export default Main;