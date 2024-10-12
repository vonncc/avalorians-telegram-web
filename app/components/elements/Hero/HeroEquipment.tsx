import React from "react";
import { AvalorianDesignedSlider } from "../AvaloriansSlider";
import { NextLevelExp } from "@/app/_globals/expereinceTreshhold";
import { HeroDetailsProps } from "./HeroDetails";
import Image from "next/image";

interface EquipmentProps extends HeroDetailsProps {
    head?: string;
    body?: string;
    pants?: string;
    currentHero: number;
    heroSelect: number;
    handleNextHero: any;
    handlePrevHero: any;
    heroImage: string;
}

const HeroEquipment: React.FC<EquipmentProps> = ({ head = "", body = "", pants = "", currentHero, heroSelect, handleNextHero, handlePrevHero, heroImage, name, level = 1, experience = 0 }) => {
    const heroSelected = currentHero === heroSelect;

    return (
        <div>
            <div className="character-section">
                <button className="hero-selector left" onClick={handlePrevHero}><Image src="/assets/images/icons/vector.png" width={20} height={32} alt="previous"/></button>
                <div className={`character-image ${heroSelected ? 'selected' : ''}`}>
                    <Image src={heroImage} width={150} height={150}
                           alt="character image"/>
                </div>
                <button className="hero-selector right" onClick={handleNextHero}><Image src="/assets/images/icons/vector.png" width={20} height={32} alt="previous"/></button>
                <div className="curved-box user-name">{name}</div>
                <div className="experience-section curved-box">
                    <div className="top-side">
                        <div className="right-side base-text">LVL. {level}</div>
                        <div className="left-side  base-text">
                            {experience} &gt;&gt; {level - 1 < 0 ? 0 : NextLevelExp[level - 1]}
                        </div>
                    </div>
                    <div className="bottom-side">
                        <AvalorianDesignedSlider experience={0} level={1} nextLevelExp={NextLevelExp}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroEquipment;
