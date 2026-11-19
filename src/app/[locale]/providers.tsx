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
import { LoadingProvider } from "@/context/LoadingContext";
import GlobalLoadingOverlay from "@/components/GlobalLoadingOverlay";

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
      }),
  );

  useEffect(() => {
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
          <LoadingProvider>
            {children}
            {mounted ? (
              <>
                {EnvGuard.isDevelopment && (
                  <ReactQueryDevtools initialIsOpen={false} />
                )}
                <Toaster style={{ fontFamily: "var(--font-sans)" }} />
              </>
            ) : (
              <>
                <div
                  id="boot-cover"
                  className="fixed inset-0 z-[100] bg-background"
                  aria-hidden="true"
                />
                <noscript>
                  <style>{"#boot-cover{display:none}"}</style>
                </noscript>
              </>
            )}
            <GlobalLoadingOverlay />
          </LoadingProvider>
        </QueryClientProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}
