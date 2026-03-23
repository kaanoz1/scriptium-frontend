"use client";

import React, { useMemo } from "react";
import { SerializedResponse, TSerializedResponse } from "@/util/types/SerializedResponse";
import Client from "@/app/test/client";
import { ChapterWithVerseCount } from "@/classes/Islam/Quran/Chapter/WithVerseCount";
import { TChapterWithVerseCount } from "@/dto/Islam/Quran/Chapter/WithVerseCount";

interface MainProps {
    initialResponse: TSerializedResponse<TChapterWithVerseCount[]>;
}

const Main = ({ initialResponse }: MainProps) => {
    const response = useMemo(() => {
        const data = initialResponse?.data ?? [];
        const status = initialResponse?.status ?? 0;
        const ok = initialResponse?.ok ?? false;

        return new SerializedResponse(data, status, ok);
    }, [initialResponse]);

    const chapters = useMemo(() => {
        if (!response.ok || !Array.isArray(response.data)) return [];
        return response.data.map(item => new ChapterWithVerseCount(item));
    }, [response.data, response.ok]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-900 text-white h-screen m-0 overflow-hidden">
            <div className="w-full max-w-4xl overflow-hidden rounded-lg border border-gray-700 bg-gray-800 shadow-xl">
                <table className="w-full text-left border-collapse">
                    <thead>
                    <tr className="bg-gray-700">
                        <th className="p-4 border-b border-gray-600">Property</th>
                        <th className="p-4 border-b border-gray-600">Value</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td className="p-4 border-b border-gray-700 font-semibold text-blue-400">HTTP Status</td>
                        <td className="p-4 border-b border-gray-700 font-mono">{response.status}</td>
                    </tr>
                    <tr>
                        <td className="p-4 border-b border-gray-700 font-semibold text-blue-400">Success (OK)</td>
                        <td className="p-4 border-b border-gray-700">
                            {response.ok ? "✅ True" : "❌ False"}
                        </td>
                    </tr>
                    <tr>
                        <td className="p-4 font-semibold text-blue-400 align-top">JSON Data</td>
                        <td className="p-4">
                            <div className="max-h-64 overflow-auto rounded bg-black p-4 font-mono text-xs text-green-400">
                                <pre>{JSON.stringify(response.data, null, 2)}</pre>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>

            {response.ok && chapters.length > 0 && (
                <div className="mt-12 w-full max-w-4xl border-t border-gray-700 pt-8">
                    <h2 className="mb-4 text-2xl font-bold text-gray-400">Client View:</h2>
                    <Client chapters={chapters} />
                </div>
            )}

            {response.isNetworkError() && (
                <div className="mt-8 text-red-400">
                    Unable to reach the server. Please check your internet connection.
                </div>
            )}

            {!response.ok && !response.isNetworkError() && (
                <div className="mt-8 text-orange-400">
                    An error occurred while fetching data. Status: {response.status}
                </div>
            )}
        </div>
    );
};

export default Main;