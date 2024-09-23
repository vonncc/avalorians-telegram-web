import localFont from "next/font/local";
import "./globals.css";
import FrontOverlay from "./layouts/BottomTabItems";
// import TopTitle from "./layouts/TopTitle";
// import { useState } from "react";
// import Head from "next/head";
import type { Metadata } from "next";
// import DebugComponent from "./components/elements/DebugCompoment";
import Script from "next/script";
import { Providers } from "./providers";

// import StartScripts from "./components/elements/StartScripts";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "Avalorians Telegram",
    description: "Avalorians Telegram Game App",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            {/* <Head>
                
            </Head> */}
            <head>
                <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />
            </head>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <Providers>
                    {/* <StartScripts></StartScripts> */}
                    {children}
                    <FrontOverlay tab={4} />
                </Providers>
            </body>
        </html>
    );
}
