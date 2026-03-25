"use client"
import React from "react";
import { LuInfo, LuTriangleAlert } from "react-icons/lu";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";


const QuickNavigationInformation = () => {
    return (
        <TooltipProvider>
            <Tooltip delayDuration={200}>
                <TooltipTrigger asChild>
                    <div className="cursor-help text-muted-foreground hover:text-foreground transition-colors p-1">
                        <LuInfo size={16} />
                    </div>
                </TooltipTrigger>
                <TooltipContent
                    side="bottom"
                    className="w-80 p-4 border border-border bg-popover text-popover-foreground shadow-md"
                >
                    <div className="space-y-3">
                        <div className="space-y-1">
                            <h4 className="text-[13px] font-bold leading-none tracking-tight">Quick Navigation</h4>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                Bypass server latency by navigating directly to a specific Surah or Verse.
                            </p>
                        </div>

                        <Separator className="opacity-50" />

                        <div className="space-y-1.5">
                            <span className="text-[11px] font-bold uppercase text-muted-foreground tracking-widest">
                                Valid Separators
                            </span>
                            <div className="flex gap-1.5 flex-wrap">
                                <Kbd>Space</Kbd> <Kbd>/</Kbd> <Kbd>.</Kbd> <Kbd>,</Kbd>
                            </div>
                        </div>

                        <div className="space-y-2 pt-1">
                            <span className="text-[11px] font-bold uppercase text-muted-foreground tracking-widest">
                                Examples
                            </span>

                            <div className="grid grid-cols-[1fr_auto] items-center gap-2 text-xs">
                                <div className="flex gap-1"><Kbd>1</Kbd><Kbd>5</Kbd></div>
                                <span className="text-muted-foreground">Surah 1, Verse 5</span>

                                <div className="flex gap-1"><Kbd>2.282</Kbd></div>
                                <span className="text-muted-foreground">Surah 2, Verse 282</span>

                                <div className="flex gap-1"><Kbd>19</Kbd></div>
                                <span className="text-muted-foreground">Go to Surah 19</span>
                            </div>
                        </div>

                        <div className="mt-2 flex items-start gap-2 rounded-md bg-amber-500/10 p-2 text-amber-600 dark:text-amber-400">
                            <LuTriangleAlert size={14} className="mt-0.5 shrink-0" />
                            <p className="text-[10px] leading-tight font-medium">
                                Destination existence is not verified before navigation. Ensure the Surah/Verse exists in the Quran.
                            </p>
                        </div>
                    </div>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}

export default QuickNavigationInformation;

const Kbd = ({ children }: { children: React.ReactNode }) => (
    <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
        {children}
    </kbd>
);
