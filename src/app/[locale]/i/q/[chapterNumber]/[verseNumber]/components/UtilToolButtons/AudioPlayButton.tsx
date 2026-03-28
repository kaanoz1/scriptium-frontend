"use client";

import React from "react";
import {Button} from "@/components/ui/button";
import {IoPlayOutline} from "react-icons/io5";
import {Tooltip, TooltipContent, TooltipTrigger, TooltipProvider} from "@/components/ui/tooltip";
import {useTranslations} from "next-intl";

const AudioPlayButton: React.FC = () => {
    const t = useTranslations("Pages.Islam.Quran.Chapter.Verse.Components.UtilToolButtons.AudioPlayButton");

    return (
        <TooltipProvider>
            <Tooltip delayDuration={200}>
                <TooltipTrigger asChild>
                    <span>
                        <Button disabled variant="ghost" size="icon">
                            <IoPlayOutline size={18}/>
                        </Button>
                    </span>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{t("NotActiveYet")}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}

export default AudioPlayButton;