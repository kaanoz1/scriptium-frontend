"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { FaDiscord } from "react-icons/fa";

const DiscordSection: React.FC = () => {
  const t = useTranslations("Pages.About.Discord");

  return (
    <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-2xl border border-[#5865F2]/25 bg-[#5865F2]/[0.06] p-6 md:p-8">
      <FaDiscord
        aria-hidden
        className="pointer-events-none absolute -bottom-6 -right-6 h-32 w-32 text-[#5865F2]/10"
      />
      <div className="flex items-start gap-4">
        <div className="rounded-xl bg-[#5865F2]/15 p-2.5 text-[#5865F2]">
          <FaDiscord size={20} />
        </div>
        <div>
          <h3 className="text-lg font-semibold">{t("Title")}</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {t("Description")}
          </p>
        </div>
      </div>
      <span className="w-fit rounded-full border border-[#5865F2]/30 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#5865F2]">
        {t("Status")}
      </span>
    </div>
  );
};

export default DiscordSection;
