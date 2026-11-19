"use client";

import React, { useEffect } from "react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { RootUpToQuran } from "@/classes/Islam/Quran/Root/UpToQuran";
import RootContainer from "@/app/[locale]/i/q/root/[latin]/components/RootContainer";
import Header from "@/app/[locale]/i/q/root/[latin]/components/Header";
import UtilToolButtons from "@/app/[locale]/i/q/root/[latin]/components/UtilToolButtons";
import Breadcrumbs from "@/app/[locale]/i/q/root/components/Breadcrumbs";
import PageShell from "@/components/Page/PageShell";

type Props = {
  root: RootUpToQuran;
};

const Main: React.FC<Props> = ({ root }) => {
  const t = useTranslations("Pages.Islam.Quran.Root.Messages");
  const occurrences = root.words.length;

  useEffect(() => {
    if (occurrences > 250) {
      toast.warning(t("HighOccurrencesWarningTitle"), {
        description: t("HighOccurrencesWarningDesc"),
        duration: 8000,
      });
    }
  }, [occurrences, t]);

  return (
    <PageShell size="lg">
      <Breadcrumbs current={root.latin} />
      <Header root={root} actions={<UtilToolButtons root={root} />} />
      <RootContainer root={root} />
    </PageShell>
  );
};

export default Main;
