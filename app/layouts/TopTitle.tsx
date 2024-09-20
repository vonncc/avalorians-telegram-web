"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";

interface TabSelect {
    text: string;
    image: string;
}

const tabSelected: TabSelect[] = [
    

    {text: "friends", image: "quests"},
    {text: "quests", image: "quests"},
    {text: "airdrop", image: "airdrop"},
    {text: "store", image: "statue"},
    {text: "hero", image: "quests"},
    {text: "lane", image: "lane"},
    {text: "kingdom", image: "kingdom"},
    {text: "creeps", image: "creeps"},
]

interface TopTitleProps{
    activeTab: number;
}

const TopTitle: React.FC<TopTitleProps> = ({activeTab}) => {
    useEffect(() => {
        // Whenever activeTab prop changes, update internal index
        setIndex(activeTab);
    }, [activeTab]);

    const [index, setIndex] = useState(activeTab);

    return (
        <div className="top-container">
            <div className="left-side">{tabSelected[index].text}</div>
            <div className="right-side"><img src={`/assets/images/top-menu/${tabSelected[index].image}.png`} alt = "Tab Selected Image" /></div>
        </div>
    );
};

export default TopTitle;
