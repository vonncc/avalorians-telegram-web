"use client";
// import Head from "next/head";
// import Image from "next/image";
// import Link from "next/link";
import { useEffect, useState } from "react";
import WebApp from "@twa-dev/sdk";
// import Script from "next/script";

interface UserData {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    language_code?: string;
    is_premium?: boolean;
}
export default function Home() {
    const [userData, setUserData] = useState<UserData | null>(null);
    // const [loadingTelegram, setloadingTelegram] = useState(0);

    // const [someString, setSomeString] = useState('');

    // const incrementLoadingTelegram = () => {
    //     setloadingTelegram(prevLoadingTelegram => prevLoadingTelegram + 1);
    // };

    useEffect(() => {
        console.log("TG_123: start use effect");
        
        if (typeof window !== "undefined") {
            if (WebApp.initDataUnsafe.user) {
                console.log("TG_123: Web App found");
                console.log(WebApp);
                console.log("TG_123: This is initDataUnsafe ");
                console.log(WebApp.initDataUnsafe);
                setUserData(WebApp.initDataUnsafe.user as UserData);
            } else {
                console.log("TG_123: Web App Not found");
                console.log(WebApp);
                
            }
        }
        

        // const checkTelegramLoaded = setInterval(() => {

        //     // console.log('TG_123: Checking Telegram is loaded');
        //     // console.log(window.Telegram.WebApp)
        //     // setSomeString('window.Telegram.WebApp');
        //     // incrementLoadingTelegram();

        //     //console.log(window.Telegram.WebApp);
        //     if (window.Telegram && window.Telegram.WebApp) {
        //         console.log('TG_123: Telegram is loaded');
        //         clearInterval(checkTelegramLoaded);

        //         const tg = window.Telegram.WebApp;
        //         const user = tg.initDataUnsafe.user;

        //         console.log('TG_123: the telegram object');
        //         console.log(tg.initDataUnsafe);
        //         console.log('TG_123: the user');
        //         console.log(user);

        //         console.log('TG_123: this is the user data');
        //         console.log(user.first_name);
        //         setUserData(user);
        //         tg.expand(); // Expand the WebApp
        //     }
        // }, 100); // Check every 100ms until the Telegram WebApp is loaded

        // return () => clearInterval(checkTelegramLoaded);
    }, []);

    return (
        <main>
            {userData ? (
                <div>
                    <h1>Welcome to the Game!</h1>
                    <p>
                        <strong>First Name:</strong> {userData.first_name}
                    </p>
                    <p>
                        <strong>Last Name:</strong> {userData.last_name || "N/A"}
                    </p>
                    <p>
                        <strong>Username:</strong> {userData.username || "N/A"}
                    </p>
                    <p>
                        <strong>User ID:</strong> {userData.id}
                    </p>
                </div>
            ) : (
                <>
                    <p>Loading user {userData ? userData : "null"} data... </p>;
                </>
            )}
        </main>
    );
}
