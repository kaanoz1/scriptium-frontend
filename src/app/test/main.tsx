"use client";

import React, { useMemo } from "react";
import { SerializedResponse, TSerializedResponse } from "@/util/types/SerializedResponse";

interface MainProps {
    initialResponse: TSerializedResponse<unknown>;
}

const Main = ({ initialResponse }: MainProps) => {
    const response = useMemo(() => {
        const data = initialResponse?.data ?? null;
        const status = initialResponse?.status ?? 0;
        const ok = initialResponse?.ok ?? false;

        return new SerializedResponse(data, status, ok);
    }, [initialResponse]);

    return (
        <div className="flex flex-col items-center justify-start min-h-screen p-8 transition-colors duration-200 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans">
            <div className="w-full max-w-5xl space-y-6">

                <header className="flex justify-between items-end border-b border-gray-200 dark:border-gray-800 pb-4">
                    <div className="flex flex-col">
                        <h1 className="text-xl font-mono font-bold text-blue-600 dark:text-blue-400">API_INSPECTOR</h1>
                        <p className="text-xs text-gray-500 uppercase tracking-tighter">Endpoint: Verse.get()</p>
                    </div>
                    <div className="flex gap-6 text-sm font-medium">
                        <span>Status: <b className={response.ok ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}>{response.status}</b></span>
                        <span>Success: <b className={response.ok ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}>{String(response.ok)}</b></span>
                    </div>
                </header>

                <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black overflow-hidden shadow-sm dark:shadow-2xl">
                    <div className="bg-gray-100 dark:bg-gray-900 px-4 py-2 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
                        <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Raw Response Data</span>
                        <div className="flex gap-2">
                            <div className="h-3 w-3 rounded-full bg-red-400/20 border border-red-400/50" />
                            <div className="h-3 w-3 rounded-full bg-yellow-400/20 border border-yellow-400/50" />
                            <div className="h-3 w-3 rounded-full bg-green-400/20 border border-green-400/50" />
                        </div>
                    </div>

                    <div className="p-6 overflow-auto max-h-[75vh]">
                        <pre className="text-sm font-mono leading-relaxed text-indigo-700 dark:text-green-400">
                            {JSON.stringify(response.data, null, 4)}
                        </pre>
                    </div>
                </div>

                {response.isNetworkError() && (
                    <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/50 rounded-lg text-red-700 dark:text-red-400 shadow-sm">
                        <strong>Network connectivity issue:</strong> The server could not be reached.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Main;