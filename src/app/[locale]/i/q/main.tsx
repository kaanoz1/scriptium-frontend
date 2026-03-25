"use client"
import { NextPage } from "next";
import { ChapterWithVerseCount } from "@/classes/Islam/Quran/Chapter/WithVerseCount";
import Breadcrumbs from "@/app/[locale]/i/q/components/Breadcrumbs";
import Header from "@/app/[locale]/i/q/components/Header";
import ChapterContainer from "@/app/[locale]/i/q/components/ChapterContainer";

type Props = {
    chapters: ChapterWithVerseCount[]
}

const Page: NextPage<Props> = ({ chapters }) => {
    return (
        <main className="min-h-screen px-4 py-8 md:px-8 lg:px-12">
            <div className="mx-auto flex max-w-7xl flex-col gap-10">
                <div className="w-full">
                    <Breadcrumbs />
                </div>

                <div className="w-full">
                    <Header />
                </div>

                <div className="w-full">
                    <ChapterContainer chapters={chapters} />
                </div>
            </div>
        </main>
    );
}

export default Page;