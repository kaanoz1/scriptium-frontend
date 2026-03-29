"use client";

import React, { useEffect } from "react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { RootUpToQuran } from "@/classes/Islam/Quran/Root/UpToQuran";
import RootContainer from "@/app/[locale]/i/q/root/[latin]/components/RootContainer";
import Header from "@/app/[locale]/i/q/root/[latin]/components/Header";
import UtilToolButtons from "@/app/[locale]/i/q/root/[latin]/components/UtilToolButtons";

type Props = {
    root: RootUpToQuran
}

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
        <main className="flex flex-col items-center w-full max-w-480 mx-auto pb-24">

            <div className="w-full px-4 sm:px-8 md:px-12 lg:px-24 xl:px-48 pt-10 pb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-border/40">
                <Header root={root} />
                <div className="flex shrink-0">
                    <UtilToolButtons root={root} />
                </div>
            </div>

            <div className="w-full px-4 sm:px-8 md:px-12 lg:px-24 xl:px-48 pt-12 flex justify-center">
                <div className="w-full max-w-8xl">
                    <RootContainer root={root} />
                </div>
            </div>

        </main>
    );
}

export default Main;