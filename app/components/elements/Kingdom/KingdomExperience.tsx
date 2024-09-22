import React, { useState } from "react";
import { Slider } from "@nextui-org/react";
import Image from "next/image";
import { AvalorianSlider } from "../AvaloriansSlider";
import { NextLevelExp } from "@/app/_globals/expereinceTreshhold";

const KingdomExperience = () => {
    const [level, setLevel] = useState(1);
    const [experience, setExperience] = useState(10);
    return (
        <div className="experience-container">
            <div className="experience-section base-text">
                <div className="left-side">LVL. {level}</div>
                <div className="right-side">
                    {experience} &gt;&gt; {NextLevelExp[level - 1]}
                </div>
            </div>
            <div className="slider-section">
                <AvalorianSlider
                    size="md"
                    defaultValue={experience}
                    minValue={level - 1 <= 0 ? 0 : NextLevelExp[level - 1]}
                    maxValue={NextLevelExp[level - 1]}
                    isDisabled
                    classNames={{
                        base: "max-w-md gap-3",
                        track: "border-s-self",
                        // track: "slider-color-start",
                        filler: "slider-color",
                    }}
                    renderThumb={(props) => (
                        <div {...props} className="group p-1 top-1/2  ">
                            <span className="w-10 h-10 block">
                                <Image src="/assets/images/sliderStar.png" width={40} height={40} alt="star icon"></Image>
                            </span>
                        </div>
                    )}
                ></AvalorianSlider>
            </div>
        </div>
    );
};

export default KingdomExperience;
