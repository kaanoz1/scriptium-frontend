"use client";

import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {useState, ReactNode} from "react";
import {EnvGuard} from "@/util/EnvGuard";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

export default function Providers({children}: { children: ReactNode }) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: 60 * 1000,
                        refetchOnWindowFocus: false,
                    },
                },
            })
    );

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            {EnvGuard.isDevelopment && (
                <ReactQueryDevtools initialIsOpen={false}/>
            )}
        </QueryClientProvider>
    );
}