"use client";
import React, { useEffect, useState } from "react";
import "@/app/styles/pages/hero.css";
import HeroEquipment from "../elements/Hero/HeroEquipment";
import HeroStats from "../elements/Hero/HeroStats";
import WebApp from "@twa-dev/sdk";

interface UserData {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    language_code?: string;
    is_premium?: boolean;
}

const Hero = () => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [isSelected, setIsSelected] = useState<boolean>(true);

    useEffect(() => {
        console.log("TG_123_Hero: start use effect");

        if (typeof window !== "undefined") {
            if (WebApp.initDataUnsafe.user) {
                console.log("TG_123_Hero: This is initDataUnsafe ");
                console.log(WebApp.initDataUnsafe);
                setUserData(WebApp.initDataUnsafe.user as UserData);
            } else {
                console.log("TG_123_Hero: Web App Not found");
                console.log(WebApp);

                console.log("TG_123_Hero: Init Data only");
                const initData = WebApp.initData;
                console.log("initData:", initData);
            }
        }
    }, []);

    return (
        <div className="general-hero-container">
            <div className="text-center text-xl font-extrabold">Heroes 1/2</div>
            {userData ? <HeroEquipment name={userData.username || "No Username"} /> : <HeroEquipment name="Avalorians User" />}
            <HeroStats isSelected={isSelected} />
        </div>
    );
};

export default Hero;
