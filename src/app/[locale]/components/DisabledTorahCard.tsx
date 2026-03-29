"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { LuLibrary, LuLock } from "react-icons/lu";
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

const DisabledTorahCard = () => {
    const t = useTranslations("Pages.Home.TorahCard");
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
                                            <LuLibrary size={22} />
                                        </div>
                                        <LuLock size={16} className="text-muted-foreground/40" />
                                    </div>
                                    <CardTitle className="text-xl font-bold">{t("Title")}</CardTitle>
                                    <CardDescription className="text-sm font-medium italic">{t("HebrewTitle")}</CardDescription>
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
                    <TooltipContent className="max-w-[250px] text-center p-3">
                        <p className="text-xs leading-relaxed">{mt("DatabaseIncapability")}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </motion.div>
    );
};

export default DisabledTorahCard;