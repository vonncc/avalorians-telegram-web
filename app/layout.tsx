import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import FrontOverlay from "./layouts/BottomTabItems";
// import TopTitle from "./layouts/TopTitle";
// import { useState } from "react";
// import Head from "next/head";
import Script from "next/script";

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
            <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                {children}
                <FrontOverlay tab={0} />
            </body>
        </html>
    );
}
