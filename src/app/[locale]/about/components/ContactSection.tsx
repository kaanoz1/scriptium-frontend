"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Mail } from "lucide-react";

const ContactSection: React.FC = () => {
  const t = useTranslations("Pages.About.Contact");

  return (
    <div className="group flex h-full flex-col justify-between gap-6 rounded-2xl border border-border/60 bg-card/70 p-6 backdrop-blur-sm transition-colors hover:border-emerald-500/40 md:p-8">
      <div className="flex items-start gap-4">
        <div className="rounded-xl bg-emerald-500/10 p-2.5 text-emerald-600 dark:text-emerald-400">
          <Mail size={20} />
        </div>
        <div>
          <h3 className="text-lg font-semibold">{t("Title")}</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {t("Description")}
          </p>
        </div>
      </div>
      <a
        href="mailto:info@scriptium.net"
        className="w-fit rounded-xl border border-border/60 bg-background/70 px-4 py-2.5 font-mono text-sm transition-colors hover:border-emerald-500/40"
      >
        info@scriptium.net
      </a>
    </div>
  );
};

export default ContactSection;
