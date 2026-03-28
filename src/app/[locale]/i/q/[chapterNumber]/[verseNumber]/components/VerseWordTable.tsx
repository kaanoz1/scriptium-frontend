"use client";

import React, { useState } from "react";
import Link from "next/link";
import { observer } from "mobx-react-lite";
import { useLocale, useTranslations } from "next-intl";
import { BookOpen } from "lucide-react";
import { WordDown } from "@/classes/Islam/Quran/Word/Down";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { QuranViewPreferences } from "@/configuration/UserPreferences/Islam/Quran/QuranViewPreferences";

export type Props = {
    words: Array<WordDown>
}

const VerseWordTable: React.FC<Props> = observer(({ words }) => {
    const t = useTranslations("Pages.Islam.Quran.Chapter.Verse.Components.VerseWordTable");
    const locale = useLocale();
    const count = words.length;

    // State to track if the table should be sticky and scrollable
    const [isSticky, setIsSticky] = useState(true);

    const arabicFont = QuranViewPreferences.getInstance().selectedArabicFont;

    return (
        <div className={`group rounded-xl border bg-card text-card-foreground shadow-sm flex flex-col transition-all duration-300 ${
            isSticky ? "xl:sticky xl:top-8 xl:max-h-[calc(100vh-4rem)] overflow-hidden" : ""
        }`}>

            <div className="flex shrink-0 items-center justify-between border-b bg-muted/40 px-4 py-3 text-sm font-medium text-muted-foreground z-20 relative">
                <div className="flex items-center gap-2">
                    <BookOpen size={16} className="text-primary" />
                    <span>{count} {t("Words") || "Words"}</span>
                </div>

                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className="flex items-center gap-2 cursor-pointer">
                                <Switch
                                    checked={isSticky}
                                    onCheckedChange={setIsSticky}
                                    aria-label="Toggle sticky mode"
                                />
                            </div>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="max-w-[200px] text-center">
                            <p>
                                {t("StickyToggleInfo") || "Toggle to pin this table to the screen and scroll its contents independently."}
                            </p>
                        </TooltipContent>
                    </Tooltip>
                </div>
            </div>

            <div className={`w-full ${isSticky ? "overflow-y-auto" : ""}`}>
                <Table className="table-fixed w-full relative">
                    <TableHeader className="sticky top-0 z-10 bg-card shadow-[0_1px_0_0_hsl(var(--border))]">
                        <TableRow className="hover:bg-transparent">
                            <TableHead className="w-15 sm:w-20 text-center">Seq</TableHead>
                            <TableHead className="w-[45%] text-right text-base">Text</TableHead>
                            <TableHead className="text-right text-base">Root(s)</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {words.map((word) => (
                            <TableRow key={word.sequence} className="transition-colors hover:bg-muted/50">
                                <TableCell className="text-center font-mono text-sm text-muted-foreground">
                                    {word.sequence}
                                </TableCell>
                                <TableCell className={`text-right text-2xl font-medium break-words ${arabicFont.className}`} dir="rtl">
                                    {word.text}
                                </TableCell>
                                <TableCell className="text-right px-4">
                                    <div className="flex flex-wrap justify-end gap-3">
                                        {word.roots.map((r) => (
                                            <Link
                                                key={r.latin}
                                                href={`/${locale}/i/q/root/${r.latin}`}
                                                className={`cursor-pointer text-xl transition-colors hover:text-blue-500 ${arabicFont.className}`}
                                                dir="rtl"
                                            >
                                                {r.text}
                                            </Link>
                                        ))}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
});

export default VerseWordTable;