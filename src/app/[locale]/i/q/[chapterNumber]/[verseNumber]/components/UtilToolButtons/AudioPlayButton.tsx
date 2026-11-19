"use client";

import React from "react";
import {Button} from "@/components/ui/button";
import {IoPlayOutline} from "react-icons/io5";
import {Tooltip, TooltipContent, TooltipTrigger, TooltipProvider} from "@/components/ui/tooltip";
import {useTranslations} from "next-intl";
import {toast} from "sonner";

const AudioPlayButton: React.FC = () => {
    const t = useTranslations("Pages.Islam.Quran.Chapter.Verse.Components.UtilToolButtons.AudioPlayButton");

    // The button is disabled, so taps land on the wrapper. Touch devices have no
    // hover tooltip, so explain on tap instead. A fixed id prevents stacking.
    const showNotActiveToast = () =>
        toast.info(t("NotActiveYet"), {id: "audio-not-active", position: "bottom-right"});

    return (
        <TooltipProvider>
            <Tooltip delayDuration={200}>
                <TooltipTrigger asChild>
                    <span onClick={showNotActiveToast} className="cursor-not-allowed">
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