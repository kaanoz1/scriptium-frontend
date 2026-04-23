"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, ReactNode, useEffect } from "react";
import { EnvGuard } from "@/util/EnvGuard";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "@/util/components/ThemeProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";
import { QuranViewPreferences } from "@/configuration/UserPreferences/Islam/Quran/QuranViewPreferences";
import { QuranTranslationPreferences } from "@/configuration/UserPreferences/Islam/Quran/QuranTranslationPreferences";
import { QuranTextVariationPreferences } from "@/configuration/UserPreferences/Islam/Quran/QuranTextVariationPreferences";

export default function Providers({ children }: { children: ReactNode }) {
    const [mounted, setMounted] = useState(false);

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

    useEffect(() => {
        // Hydration for preferences.
        QuranViewPreferences.getInstance().hydrate();
        QuranTranslationPreferences.getInstance().hydrate();
        QuranTextVariationPreferences.getInstance().hydrate();

        const init = async () => {
            try {
                await QuranTranslationPreferences.getInstance().initializeAsync();
            } catch (error) {
                console.error("Initialization failed:", error);
            } finally {
                setMounted(true);
            }
        };

        init();

    }, []);

    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            enableColorScheme={false}
        >
            <TooltipProvider>
                <QueryClientProvider client={queryClient}>

                    {mounted ? (
                        <>
                            {children}
                            {EnvGuard.isDevelopment && (
                                <ReactQueryDevtools initialIsOpen={false} />
                            )}
                            <Toaster />
                        </>
                    ) : (
                        <div className="fixed inset-0 bg-background" aria-hidden="true" />
                    )}
                </QueryClientProvider>
            </TooltipProvider>
        </ThemeProvider>
    );
}