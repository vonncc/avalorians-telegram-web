"use client";
import { useState } from "react";
import TabMenu, { TabItem } from "../components/elements/TabMenu";
import TopTitle from "./TopTitle";
import ProductCard from "../components/ProductCard";

import Airdrop from "../components/Contents/Airdrop";
import Creeps from "../components/Contents/Creeps";
import Friends from "../components/Contents/Friends";
import Hero from "../components/Contents/Hero";
import Kingdom from "../components/Contents/Kingdom";
import Lane from "../components/Contents/Lane";
import Quests from "../components/Contents/Quests";
import Store from "../components/Contents/Store";
import HeroDetails from "../components/elements/Hero/HeroDetails";

const tabItems: TabItem[] = [
    {
        image: "/assets/images/tabs/Friends.png", // Image path or URL
        text: "FRIENDS",
    },
    {
        image: "/assets/images/tabs/Quest.png",
        text: "QUESTS",
    },
    {
        image: "/assets/images/tabs/Airdrop.png", // Image path or URL
        text: "AIRDROP",
    },
    {
        image: "/assets/images/tabs/Hero.png", // Image path or URL
        text: "HERO",
    },
    {
        image: "/assets/images/tabs/Lane.png",
        text: "LANE",
    },
    {
        image: "/assets/images/tabs/Kingdom.png", // Image path or URL
        text: "KINGDOM",
    },
    {
        image: "/assets/images/tabs/Creeps.png",
        text: "CREEPS",
    },
    {
        image: "/assets/images/tabs/Store.png",
        text: "STORE",
    },
];

interface BottomTabDefaults {
    tab: number;
    currentActiveTab?: (activeTabIndex: number) => void;
}

const contentTabs = [
    <div key="0" className="z-1">
        <Friends></Friends>
    </div>,
    <div key="1" className="z-1">
        <Quests></Quests>
    </div>,
    <div key="2" className="z-1">
        <Airdrop></Airdrop>
    </div>,

    <div key="43" className="z-1">
        <Hero></Hero>
    </div>,
    <div key="4" className="z-1">
        <Lane></Lane>
    </div>,
    <div key="5" className="z-1">
        <Kingdom></Kingdom>
    </div>,
    <div key="6" className="z-1">
        <Store></Store>
    </div>,
    <div key="7" className="z-1">
        <Creeps></Creeps>
    </div>,
];

const FrontOverlay: React.FC<BottomTabDefaults> = ({ tab, currentActiveTab }) => {
    const [activeTab, onActiveTabChange] = useState(tab);
    const [isHeroTab, onHeroTab] = useState(activeTab == 3);

    const handleTabClick = (index: number) => {
        onActiveTabChange(index);
        onHeroTab(index == 3);
        if (currentActiveTab) currentActiveTab(index);

    };
    // const [userData, setUserData] = useState(null);

    return (
        <div className="overlay-menu z-45">
            {isHeroTab ? <HeroDetails /> : <TopTitle activeTab={activeTab} />}
            <div className="bottom-container">
                <TabMenu tabs={tabItems} onTabChange={handleTabClick} content={contentTabs} />
            </div>
        </div>
    );
};

export default FrontOverlay;
