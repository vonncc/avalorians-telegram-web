import React from "react";
import { AvalorianDesignedSlider } from "../AvaloriansSlider";
import { NextLevelExp } from "@/app/_globals/expereinceTreshhold";
import { HeroDetailsProps } from "./HeroDetails";
import Image from "next/image";

interface EquipmentProps extends HeroDetailsProps {
    head?: string;
    body?: string;
    pants?: string;
}
const HeroEquipment: React.FC<EquipmentProps> = ({ head = "", body = "", pants = "", name, level = 1, experience = 0 }) => {
    return (
        <div>
            <div className="character-section">
                <div className="character-image">
                    <Image src="/assets/images/Hero/tempCharacterImage.png" width={258} height={279} alt="character image" />
                </div>
                <div className="curved-box user-name">{name}</div>
                <div className="experience-section curved-box">
                    <div className="top-side">
                        <div className="right-side base-text">LVL. {level}</div>
                        <div className="left-side  base-text">
                            {experience} &gt;&gt; {level - 1 < 0 ? 0 : NextLevelExp[level - 1]}
                        </div>
                    </div>
                    <div className="bottom-side">
                        <AvalorianDesignedSlider experience={0} level={1} nextLevelExp={NextLevelExp} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroEquipment;
