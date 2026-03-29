"use client";

import React from "react";
import { observer } from "mobx-react-lite";
import { ClientUtils } from "@/util/ClientUtils";
import { RootPlain } from "@/classes/Islam/Quran/Root/Plain";

import AudioPlayButton from "@/app/[locale]/i/q/root/[latin]/components/UtilToolButtons/AudioPlayButton";
import ShareButton from "@/app/[locale]/i/q/root/[latin]/components/UtilToolButtons/ShareButton";
import QuranTranslationChangeButton from "@/app/[locale]/i/q/root/[latin]/components/UtilToolButtons/QuranTranslationChangeButton";
import QuranConfigurationButton from "@/app/[locale]/i/q/root/[latin]/components/UtilToolButtons/QuranConfigurationButton";

type Props = {
    root: RootPlain;
}

const UtilToolButtons: React.FC<Props> = observer(({ root }) => {
    const shareText = ClientUtils.Islam.Quran.Root.createRootShareText(root);

    return (
        <aside className="flex flex-wrap items-center justify-end gap-1 sm:gap-2 rounded-full px-2 py-1 ">
            <AudioPlayButton />
            <ShareButton shareText={shareText} />
            <div className="mx-1 hidden h-4 w-px bg-border sm:block" />
            <QuranTranslationChangeButton />
            <QuranConfigurationButton />
        </aside>
    );
});

export default UtilToolButtons;