import { Button } from "@nextui-org/button";
import React from "react";
import "@/app/styles/pages/hero.css";
import { AvalorianDesignedSlider } from "../AvaloriansSlider";
import { NextLevelExp } from "@/app/_globals/expereinceTreshhold";
import Image from "next/image";
export interface HeroDetailsProps {
    profilePic?: string;
    rate?: number;
    experience?: number;
    gold?: number;
    runes?: number;
    name?: string;
    level?: number;
}

const HeroDetails: React.FC<HeroDetailsProps> = ({
    profilePic = "/assets/images/Hero/tempProfilePic.png",
    rate = 0,
    experience = 10,
    gold = 0,
    runes = 0,
}) => {
    
    return (
        <div className="details-section">
            <div className="top-section">
                <img src={`${profilePic}`} />
                <div className="profit-section curved-box">
                    <span className="base-text left-side">PROFIT &#40;1H&#41;:</span>
                    <span className="right-side base-text">
                        800
                        <img src="/assets/images/Coin.png" />
                    </span>
                </div>
                <button className="box-button notebook">
                    <img src="/assets/images/Hero/book.png" />
                </button>
                <button className="box-button menu">
                    <img src="/assets/images/Hero/dice.png" />
                </button>
            </div>
            <div className="experience-section">
                <div className="left-side">
                    <AvalorianDesignedSlider experience={experience} level={1} nextLevelExp={NextLevelExp}></AvalorianDesignedSlider>
                </div>
                <div className="right-side">
                    <div className="base-text experience-text">{experience} /100 </div>
                    <Image src="/assets/images/users.png" width={20} height={20} alt="users image icon"></Image>
                </div>
            </div>
            <div className="wallet-section">
                <div className="curved-box base-text gold-section">
                    GOLD:
                    <div className="right-side">
                        {gold}
                        <img src="/assets/images/Coin.png"></img>
                    </div>
                </div>
                <div className="curved-box base-text runes-section">
                    RUNES:
                    <div className="right-side">
                        {gold}
                        <img src="/assets/images/icons/money.png"></img>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroDetails;
