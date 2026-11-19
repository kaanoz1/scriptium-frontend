"use client";

import React from "react";
import WhatIsScriptiumSection from "./components/WhatIsScriptiumSection";
import BetaWarningSection from "./components/BetaWarningSection";
import DataSupplierSection from "./components/DataSupplierSection";
import ContactSection from "./components/ContactSection";
import DiscordSection from "./components/DiscordSection";
import TechnologiesSection from "@/app/[locale]/about/components/TechnologiesSection";
import PageShell from "@/components/Page/PageShell";

const Main: React.FC = () => {
  return (
    <PageShell size="lg" className="gap-6 md:gap-8">
      <WhatIsScriptiumSection />
      <BetaWarningSection />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="md:col-span-3">
          <DataSupplierSection />
        </div>
        <div className="md:col-span-2">
          <ContactSection />
        </div>
        <DiscordSection />
      </div>

      <TechnologiesSection />
    </PageShell>
  );
};

export default Main;
