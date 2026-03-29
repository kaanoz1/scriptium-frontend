"use client";
import React from "react";
import {TRootWithWordCount} from "@/dto/Islam/Quran/Root/WithWordCount";
import {RootWithWordCount} from "@/classes/Islam/Quran/Root/WithWordCount";
import Main from "@/app/[locale]/i/q/root/main";

type Props = {
    roots: TRootWithWordCount[]
}

const Client: React.FC<Props> = ({roots}) => {

    const rootsInstantiated = roots.map(RootWithWordCount.fromJson)

    return <Main roots={rootsInstantiated}/>;
}

export default Client;