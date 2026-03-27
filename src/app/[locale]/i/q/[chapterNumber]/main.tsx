"use client"

import {NextPage} from "next";
import {observer} from "mobx-react-lite";
import {ChapterWithVerses} from "@/classes/Islam/Quran/Chapter/WithVerses";
import Breadcrumbs from "@/app/[locale]/i/q/[chapterNumber]/components/Breadcrumbs";
import Header from "@/app/[locale]/i/q/[chapterNumber]/components/Header";
import VerseContainer from "@/app/[locale]/i/q/[chapterNumber]/components/VerseContainer";

type Props = {
    chapter: ChapterWithVerses
}

const Page: NextPage<Props> = observer(({chapter}) => {
    return (
        <main className="min-h-screen px-4 py-8 md:px-8 lg:px-12">
            <div className="mx-auto flex w-full max-w-5xl flex-col gap-10">

                <div className="w-full">
                    <Breadcrumbs chapter={chapter}/>
                </div>

                <div className="w-full">
                    <Header chapter={chapter}/>
                </div>

                <div className="w-full">
                    <VerseContainer chapter={chapter}/>
                </div>

            </div>
        </main>
    );
});

export default Page;