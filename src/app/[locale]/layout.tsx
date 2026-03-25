import type {Metadata} from "next";
import "./globals.css";
import React from "react";
import {Utils} from "@/util";
import Providers from "./providers";
import {EnvGuard} from "@/util/EnvGuard";
import {Geist} from "next/font/google";
import {cn} from "@/lib/utils";
import Navbar from "@/components/Navbar/Navbar";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {SUPPORTED_LOCALES} from "@/configuration/Locale/SupportedLocales/_index";

const geist = Geist({subsets: ['latin'], variable: '--font-sans'});

export const metadata: Metadata = {
    title: "Scriptium",
    description: "Universal theology library",
    icons: [
        {
            rel: 'icon',
            url: Utils.AssetManager.ScriptiumIconDark,
            media: '(prefers-color-scheme: light)',
        },
        {
            rel: 'icon',
            url: Utils.AssetManager.ScriptiumIconLight,
            media: '(prefers-color-scheme: dark)',
        },
    ],
};

export default async function RootLayout({
                                             children,
                                             params,
                                         }: Readonly<{
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}>) {
    const {locale} = await params;

    if (!locale || !(locale in SUPPORTED_LOCALES)) {
        notFound();
    }
    const messages = await getMessages();

    return (
        <html
            lang={locale}
            className={cn("h-full antialiased", "font-sans", geist.variable)}
            suppressHydrationWarning={EnvGuard.isDevelopment}
        >
        <body className="h-full" suppressHydrationWarning={EnvGuard.isDevelopment}>
        <NextIntlClientProvider locale={locale} messages={messages}>
            <Providers>
                <Navbar/>
                <main>
                    {children}
                </main>
            </Providers>
        </NextIntlClientProvider>
        </body>
        </html>
    );
}