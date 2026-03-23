import type {Metadata} from "next";
import "./globals.css";
import React from "react";
import {Utils} from "@/util";
import Providers from "./providers";
import {EnvGuard} from "@/util/EnvGuard";

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
            className="h-full antialiased"
            suppressHydrationWarning={EnvGuard.isDevelopment}
        >
        <body className="h-full">
        <Providers>
            {children}
        </Providers>
        </body>
        </html>
    );
}