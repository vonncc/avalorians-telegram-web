"use client";
import React, { useEffect, useState } from "react";
import "@/app/styles/pages/hero.css";
import HeroDetails from "../elements/Hero/HeroDetails";
import HeroEquipemt from "../elements/Hero/HeroEquipemt";
import HeroStats from "../elements/Hero/HeroStats";
import HeroSkill from "../elements/Hero/HeroSkill";
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
        <div className="general-hero-container ">
            {userData ? <HeroDetails name={userData.username || "No Username"} /> : <HeroDetails name="Avalorians USer" />}
            <HeroEquipemt />
            <HeroStats />
            <div className="hero-skills-container">
                <HeroSkill slot_number={1} skill_image="/assets/images/Star.png"></HeroSkill>
                <HeroSkill slot_number={2}></HeroSkill>
                <HeroSkill slot_number={3}></HeroSkill>
                <HeroSkill slot_number={4}></HeroSkill>
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
        </div>
    );
};

export default Hero;
