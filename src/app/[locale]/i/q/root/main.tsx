"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { LuSearch } from "react-icons/lu";
import { RootWithWordCount } from "@/classes/Islam/Quran/Root/WithWordCount";
import Breadcrumbs from "@/app/[locale]/i/q/root/components/Breadcrumbs";
import Header from "@/app/[locale]/i/q/root/components/Header";
import RootContainer from "@/app/[locale]/i/q/root/components/RootContainer";
import PageShell from "@/components/Page/PageShell";

type Props = {
  roots: RootWithWordCount[];
};

const Main: React.FC<Props> = ({ roots }) => {
  const [val, setVal] = useState("");
  const t = useTranslations("Pages.Islam.Quran.Root.Components.Header");

  return (
    <PageShell size="xl">
      <Breadcrumbs />
      <Header count={roots.length} />

      <label className="sticky top-[calc(var(--navbar-offset,5rem)+1rem)] z-20 block">
        <LuSearch
          size={18}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <input
          className="h-12 w-full rounded-xl border border-border/60 bg-background/80 pl-11 pr-4 text-sm shadow-sm outline-none backdrop-blur transition-all placeholder:text-muted-foreground focus:border-foreground/30 focus:ring-4 focus:ring-foreground/5"
          placeholder={t("SearchPlaceholder")}
          value={val}
          onChange={(e) => setVal(e.target.value)}
        />
      </label>

      <RootContainer filterQuery={val} roots={roots} />
    </PageShell>
  );
};

export default Main;
