"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { LuLock } from "react-icons/lu";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
};

const DisabledBuddhismCard = () => {
    const t = useTranslations("Pages.Home.BuddhismCard");
    const nt = useTranslations("Pages.About.Support");
    const mt = useTranslations("Pages.Home.Messages");

    return (
        <motion.div variants={itemVariants}>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div className="opacity-60 grayscale cursor-help h-full">
                            <Card className="h-full border-dashed border-border/60 bg-muted/5 backdrop-blur-[2px] relative overflow-hidden transition-all hover:bg-muted/10">
                                <CardHeader>
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="p-2 rounded-lg bg-muted text-muted-foreground">
                                            <BuddhismIcon />
                                        </div>
                                        <LuLock size={16} className="text-muted-foreground/40" />
                                    </div>
                                    <CardTitle className="text-xl font-bold">{t("Title")}</CardTitle>
                                    <CardDescription className="text-sm font-medium italic">{t("PaliTitle")}</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {t("Description")}
                                    </p>
                                    <Badge variant="outline" className="font-medium text-[10px] tracking-wider uppercase opacity-70">
                                        {nt("NotActiveYet")}
                                    </Badge>
                                </CardContent>
                            </Card>
                        </div>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-62.5 text-center p-3">
                        <p className="text-xs leading-relaxed">{mt("DatabaseIncapability")}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </motion.div>
    );
};

export default DisabledBuddhismCard;

export const BuddhismIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="2" />
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
);