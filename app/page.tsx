"use client";
// import Head from "next/head";
// import Image from "next/image";
// import Link from "next/link";
import { useEffect, useState } from "react";
// import Script from "next/script";

export default function Home() {
    const [userData, setUserData] = useState(null);
    // const [loadingTelegram, setloadingTelegram] = useState(0);

    // const [someString, setSomeString] = useState('');

    // const incrementLoadingTelegram = () => {
    //     setloadingTelegram(prevLoadingTelegram => prevLoadingTelegram + 1);
    // };

    useEffect(() => {
        console.log('TG_123: start use effect');
        const checkTelegramLoaded = setInterval(() => {

            // console.log('TG_123: Checking Telegram is loaded');
            // console.log(window.Telegram.WebApp)
            // setSomeString('window.Telegram.WebApp');
            // incrementLoadingTelegram();
            console.log(window);
            console.log(window.Telegram);
            //console.log(window.Telegram.WebApp);
            if (window.Telegram && window.Telegram.WebApp) {
                console.log('TG_123: Telegram is loaded');
                clearInterval(checkTelegramLoaded);

                const tg = window.Telegram.WebApp;
                const user = tg.initDataUnsafe.user;

                console.log('TG_123: this is the user data');
                console.log(user);
                setUserData(user);
                tg.expand(); // Expand the WebApp
            }
        }, 100); // Check every 100ms until the Telegram WebApp is loaded

        return () => clearInterval(checkTelegramLoaded);
    }, []);

    if (!userData) return <p>Loading user data...</p>;

    return (
        <main>
    
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
        </main>
    );
}
