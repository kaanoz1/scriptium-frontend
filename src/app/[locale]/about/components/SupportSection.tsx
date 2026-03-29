"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Heart, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const SupportSection: React.FC = () => {
    const t = useTranslations("Pages.About.Support");

    return (
        <div className="flex flex-col p-6 rounded-2xl bg-card border border-border/50 shadow-sm text-center items-center group hover:border-rose-500/50 transition-all duration-300">
            <div className="w-12 h-12 bg-rose-500/10 text-rose-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Heart size={24} />
            </div>

            <h3 className="text-xl font-semibold mb-2">{t("Title")}</h3>
            <p className="text-sm text-muted-foreground mb-6 flex-1">
                {t("Description")}
            </p>

            <div className="w-full flex flex-col gap-2 mt-auto">
                <div className="flex items-center justify-center gap-1.5 mb-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60">
                    <Lock size={10} />
                    <span>{t("DisabledStatus")}</span>
                </div>

                <div className="flex flex-col gap-2">
                    <Button
                        disabled
                        variant="secondary"
                        className="w-full opacity-40 grayscale cursor-not-allowed border-dashed bg-muted/50"
                    >
                        Patreon
                    </Button>
                    <Button
                        disabled
                        variant="secondary"
                        className="w-full opacity-40 grayscale cursor-not-allowed border-dashed bg-muted/50"
                    >
                        PayPal
                    </Button>
                </div>

                <Badge variant="outline" className="mt-3 self-center border-rose-500/20 text-rose-500/40 bg-rose-500/5 px-4 py-1">
                    {t("NotActiveYet")}
                </Badge>
            </div>
        </div>
    );
};

export default SupportSection;