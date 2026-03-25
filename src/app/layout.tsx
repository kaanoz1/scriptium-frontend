import type {Metadata} from "next";
import "./globals.css";
import React from "react";
import {Utils} from "@/util";
import Providers from "./providers";
import {EnvGuard} from "@/util/EnvGuard";
import {Geist} from "next/font/google";
import {cn} from "@/lib/utils";
import Navbar from "@/components/Navbar/Navbar";

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

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={cn("h-full antialiased", "font-sans", geist.variable)}
            suppressHydrationWarning={EnvGuard.isDevelopment}
        >
        <body className="h-full">
        <Providers>
            <Navbar/>
            {children}
        </Providers>
        </body>
        </html>
    );
}