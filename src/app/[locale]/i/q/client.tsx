"use client"
import {TChapterWithVerseCount} from "@/dto/Islam/Quran/Chapter/WithVerseCount";
import {ChapterWithVerseCount} from "@/classes/Islam/Quran/Chapter/WithVerseCount";
import {NextPage} from "next";
import Main from "@/app/[locale]/i/q/main";

type Props = {
    chapters: TChapterWithVerseCount[]
}


const Client: NextPage<Props> = ({chapters}) => {


    const chaptersInstantiated = chapters.map(ChapterWithVerseCount.fromJson);


    return <Main chapters={chaptersInstantiated}/>
}

export default Client;