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
import {SUPPORTED_LOCALES} from "@/locale/SupportedLocales/_index";
import Footer from "@/components/Footer/Footer";

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
            className={cn("h-full antialiased", "font-sans", geist.variable, "m-0 p-0")}
            suppressHydrationWarning={EnvGuard.isDevelopment}
        >
        <body className="h-full m-0 p-0" suppressHydrationWarning={EnvGuard.isDevelopment}>
        <NextIntlClientProvider locale={locale} messages={messages}>
            <Providers>
                <Navbar/>
                    {children}
                <Footer/>
            </Providers>
        </NextIntlClientProvider>
        </body>
        </html>
    );
}