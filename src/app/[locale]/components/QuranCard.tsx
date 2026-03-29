"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { LuBookOpen } from "react-icons/lu";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
};

const QuranCard = () => {
    const pathname = usePathname();
    const t = useTranslations("Pages.Home.QuranCard");

    return (
        <motion.div variants={itemVariants}>
            <Link href={pathname + "/i/q"} className="group outline-none block h-full">
                <Card className="h-full transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
                    <CardHeader>
                        <div className="mb-2">
                            <div className="w-fit p-2 rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                                <LuBookOpen size={22} />
                            </div>
                        </div>
                        <CardTitle className="text-xl font-bold">{t("Title")}</CardTitle>
                        <CardDescription className="text-sm font-medium opacity-70 italic">{t("ArabicTitle")}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            {t("Description")}
                        </p>
                    </CardContent>
                </Card>
            </Link>
        </motion.div>
    );
};

export default QuranCard;