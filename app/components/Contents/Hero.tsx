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

const heroes = [{
    id: 0,
    name: "Dum Dum",
    image: "/assets/images/Hero/hero1.png",
    stats: { hit_points: 10, armor: 12, attack_speed: 8, splash_damage: 3},
}, {
    id: 1,
    name: "Troll Priest",
    image: "/assets/images/Hero/hero2.png",
    stats: { hit_points: 5, armor: 5, attack_speed: 10, splash_damage: 3},
}];

const Hero = () => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [heroSelect, setHeroSelect] = useState<number>(0);
    const [currentHero, setCurrentHero] = useState<number>(0);

    function handleSelect() {
        setHeroSelect(currentHero);
    }

    function handleNextHero() {
        if (currentHero < heroes.length - 1) {
            setCurrentHero(currentHero + 1);
        } else {
            setCurrentHero(0);
        }
    }

    function handlePreviousHero() {
        if (currentHero >= heroes.length - 1) {
            setCurrentHero(currentHero - 1);
        } else {
            setCurrentHero(heroes.length - 1);
        }
    }


    useEffect(() => {
        console.info("TG_123_Hero: start use effect");

        if (typeof window !== "undefined") {
            if (WebApp.initDataUnsafe.user) {
                console.info("TG_123_Hero: This is initDataUnsafe ");
                console.info(WebApp.initDataUnsafe);
                setUserData(WebApp.initDataUnsafe.user as UserData);
            } else {
                console.info("TG_123_Hero: Web App Not found");
                console.info(WebApp);

                console.info("TG_123_Hero: Init Data only");
                const initData = WebApp.initData;
                console.info("initData:", initData);
            }
        }   
    }, []);

    return (
        <div className="general-hero-container">
            <div className="text-center text-xl font-extrabold pb-4">{`Heroes ${currentHero + 1}/${heroes.length}`}</div>
            <HeroEquipment name={heroes[currentHero].name} heroSelect={heroSelect} currentHero={currentHero} handleNextHero={handleNextHero} handlePrevHero={handlePreviousHero} heroImage={heroes[currentHero].image} />
            <HeroStats stats={heroes[currentHero].stats} heroSelect={heroSelect} currentHero={currentHero} handleSelect={handleSelect} />
        </div>
    );
};

export default Hero;
    