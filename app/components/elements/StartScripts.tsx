"use client"
import Script from "next/script";
import React from "react";

const StartScripts = () => {
    return (
        <div>
            {/* <Script
                src="https://telegram.org/js/telegram-web-app.js"
                strategy="beforeInteractive"
                onLoad={() => {
                    console.info("Telegram Web App script loaded and integrated");
                    if (window.Telegram) {
                        console.info("Telegram WebApp is ready to use");
                    }
                }}
                onError={(error) => console.error("Failed to load the Telegram Web App script: " + error)}
            /> */}
        </div>
    );
};

export default StartScripts;
