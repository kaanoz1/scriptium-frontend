"use client";

import React from "react";
import {ChapterWithVerseCount} from "@/classes/Islam/Quran/Chapter/WithVerseCount";

type Props = {
    chapters: ChapterWithVerseCount[];
}

const Client: React.FC<Props> = ({chapters}) => {
    const length = chapters.length;

    return (
        <div className="flex flex-col gap-6 p-4">
            <section className="bg-blue-900/20 p-4 rounded-lg border border-blue-500/30">
                <span className="text-xl font-bold text-blue-400">
                    Found: {length} chapters
                </span>
            </section>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {chapters.map((c) => (
                    <div
                        key={c.sequence}
                        className="p-4 bg-gray-800/50 rounded border border-gray-700 hover:border-blue-500 transition-all shadow-sm"
                    >
                        <div className="flex flex-col gap-1">
                            <span className="text-lg font-semibold text-white">
                                {c.name}
                            </span>
                            <span className="text-sm text-gray-400 italic">
                                {c.meanings?.[0]?.text ?? "No meaning available"}
                            </span>
                            <div className="mt-2 text-xs font-mono text-blue-300 uppercase tracking-widest">
                                Verses: {c.verseCount}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Client;