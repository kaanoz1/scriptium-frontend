"use client"
import React from "react";
import {TVerseBoth} from "@/dto/Islam/Quran/Verse/Both";
import {VerseBoth} from "@/classes/Islam/Quran/Verse/Both";
import Main from "@/app/[locale]/i/q/[chapterNumber]/[verseNumber]/main";

type Props = {
    verse: TVerseBoth
}
const Client: React.FC<Props> = ({verse}) => {

    const verseInstantiated = VerseBoth.fromJson(verse)

    return <Main verse={verseInstantiated}/>;
}

export default Client;