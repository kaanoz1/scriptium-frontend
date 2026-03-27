
"use client"
import {NextPage} from "next";
import {TChapterWithVerses} from "@/dto/Islam/Quran/Chapter/WithVerses";
import {ChapterWithVerses} from "@/classes/Islam/Quran/Chapter/WithVerses";
import Main from "@/app/[locale]/i/q/[chapterNumber]/main";

type Props = {
    chapter: TChapterWithVerses
}

const Page: NextPage<Props> = ({chapter}) => {


    const chapterInstantiated = ChapterWithVerses.fromJson(chapter);



    return <Main chapter={chapterInstantiated}/>;
}

export default Page;