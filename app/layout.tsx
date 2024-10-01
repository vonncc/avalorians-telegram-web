import localFont from "next/font/local";
import "./globals.css";
import FrontOverlay from "./layouts/BottomTabItems";
import type { Metadata } from "next";
import Script from "next/script";
import { Providers } from "./providers";


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
            <head>
                <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />
            </head>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <Providers>
                    {children}
                    <FrontOverlay tab={4} />
                </Providers>
            </body>
        </html>
    );
}
