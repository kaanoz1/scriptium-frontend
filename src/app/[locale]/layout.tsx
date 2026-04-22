import "../globals.css";
import type {Metadata} from "next";
import React from "react";
import Providers from "./providers";
import {EnvGuard} from "@/util/EnvGuard";
import {Geist} from "next/font/google";
import {cn} from "@/lib/utils";
import Navbar from "@/components/Navbar/Navbar";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import Footer from "@/components/Footer/Footer";
import {ClientUtils} from "@/util/ClientUtils";

const geist = Geist({subsets: ['latin'], variable: '--font-sans'});

export const metadata: Metadata = {
    title: "Scriptium",
    description: "Universal theology library",
    icons: [
        {
            rel: 'icon',
            url: ClientUtils.AssetManager.ScriptiumIconDark,
            media: '(prefers-color-scheme: dark)',
        },
        {
            rel: 'icon',
            url: ClientUtils.AssetManager.ScriptiumIconLight,
            media: '(prefers-color-scheme: light)',
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


    // TODO: This will be changed. For now, only English is supported

    if (!locale || !(["en"].includes(locale)))
        notFound();


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