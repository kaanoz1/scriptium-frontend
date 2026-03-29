"use client";

import React from "react";
import { RootUpToQuran } from "@/classes/Islam/Quran/Root/UpToQuran";
import { Accordion } from "@/components/ui/accordion";
import RootRow from "@/app/[locale]/i/q/root/[latin]/components/RootRow";
import {observer} from "mobx-react-lite";

type Props = {
    root: RootUpToQuran
}

const RootContainer: React.FC<Props> = observer(({ root }) => {
    return (
        <Accordion type="multiple" className="w-full">
            {root.words.map((word, index) => (
                <RootRow key={index} accordionValue={String(index)} word={word} />
            ))}
        </Accordion>
    );
})

export default RootContainer;