"use client";
import {TRootUpToQuran} from "@/dto/Islam/Quran/Root/UpToQuran";
import React from "react";
import {RootUpToQuran} from "@/classes/Islam/Quran/Root/UpToQuran";
import Main from "@/app/[locale]/i/q/root/[latin]/main";

type Props = {
    root: TRootUpToQuran
}


const Client: React.FC<Props> = ({root}) => {

    const rootInstantiated = RootUpToQuran.fromJson(root);

    return <Main root={rootInstantiated}/>;
}

export default Client;