"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Mail } from "lucide-react";

const ContactSection: React.FC = () => {
    const t = useTranslations("Pages.About.Contact");

    return (
        <div className="flex flex-col p-6 rounded-2xl bg-card border border-border/50 shadow-sm text-center items-center group hover:border-primary/50 transition-colors">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Mail size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">{t("Title")}</h3>
            <p className="text-sm text-muted-foreground mb-4 flex-1">
                {t("Description")}
            </p>
            <a href="mailto:info@scriptium.net" className="text-primary font-medium hover:underline">
                info@scriptium.net
            </a>
        </div>
    );
};

export default ContactSection;