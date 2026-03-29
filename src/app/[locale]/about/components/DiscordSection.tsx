"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {FaDiscord} from "react-icons/fa";

const DiscordSection: React.FC = () => {
    const t = useTranslations("Pages.About.Discord");

    return (
        <div className="flex flex-col p-6 rounded-2xl bg-card border border-border/50 shadow-sm text-center items-center group hover:border-indigo-500/50 transition-colors relative overflow-hidden">
            <div className="w-12 h-12 bg-indigo-500/10 text-indigo-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FaDiscord size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">{t("Title")}</h3>
            <p className="text-sm text-muted-foreground mb-4 flex-1">
                {t("Description")}
            </p>
            <Badge variant="secondary" className="bg-indigo-500/10 text-indigo-500 hover:bg-indigo-500/20">
                {t("Status")}
            </Badge>
        </div>
    );
};

export default DiscordSection;