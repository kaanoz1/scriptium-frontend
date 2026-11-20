"use client";

import React, { useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { THadithListItem, TPaged } from "@/dto/Islam/Hadith/ArabicOnly";
import { HadithViewPreferences } from "@/configuration/UserPreferences/Islam/Hadith/HadithViewPreferences";
import PageShell from "@/components/Page/PageShell";
import PageHeader from "@/components/Page/PageHeader";
import LoadingLink from "@/components/LoadingLink";
import HadithBreadcrumbs from "@/app/[locale]/i/h/ao/components/Breadcrumbs";
import HadithList from "@/app/[locale]/i/h/ao/components/HadithList";
import SettingsButton from "@/app/[locale]/i/h/ao/components/SettingsButton";

type Props = { chapter: number; verse: number; hadiths: TPaged<THadithListItem> };

const Client: React.FC<Props> = ({ chapter, verse, hadiths }) => {
  const locale = useLocale();
  const t = useTranslations("Pages.Islam.Hadith.Quran");
  useEffect(() => HadithViewPreferences.getInstance().hydrate(), []);
  return (
    <PageShell size="lg">
      <HadithBreadcrumbs items={[{ label: `${chapter}:${verse}` }]} />
      <PageHeader
        eyebrow={t("Eyebrow")}
        title={t("Title", { ref: `${chapter}:${verse}` })}
        description={t("Description")}
        actions={
          <div className="flex items-center gap-2">
            <SettingsButton showToggles={false} />
            <LoadingLink href={`/${locale}/i/q/${chapter}/${verse}`} className="rounded-xl border border-border/60 px-4 py-2 text-sm hover:bg-muted">
              {t("OpenVerse")} →
            </LoadingLink>
          </div>
        }
      />
      <HadithList page={hadiths} emptyText={t("None")} />
    </PageShell>
  );
};

export default Client;
