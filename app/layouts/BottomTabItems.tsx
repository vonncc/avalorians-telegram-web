"use client";
import { useEffect, useState } from "react";
import TabMenu, { TabItem } from "../components/elements/TabMenu";
import TopTitle from "./TopTitle";
import ProductCard from "../components/ProductCard";
import Quests from "../components/Contents/Quests";


const tabItems: TabItem[] = [
    {
        image: "/assets/images/tabs/tab-btn-friends.png", // Image path or URL
        text: "FRIENDS",
    },
    {
        image: "/assets/images/tabs/tab-btn-quests.png",
        text: "QUESTS",
    },
    {
        image: "/assets/images/tabs/tab-btn-airdrop.png", // Image path or URL
        text: "AIRDROP",
    },
    {
        image: "/assets/images/tabs/tab-btn-store.png",
        text: "STORE",
    },
    {
        image: "/assets/images/tabs/tab-btn-hero.png", // Image path or URL
        text: "HERO",
    },
    {
        image: "/assets/images/tabs/tab-btn-lane.png",
        text: "LANE",
    },
    {
        image: "/assets/images/tabs/tab-btn-kingdom.png", // Image path or URL
        text: "KINGDOM",
    },
    {
        image: "/assets/images/tabs/tab-btn-creeps.png",
        text: "CREEPS",
    },
];

interface BottomTabDefaults {
    tab: number;
    currentActiveTab?: (activeTabIndex: number) => void;
}


const contentTabs = [
    <div key="0" className="z-1"><ProductCard></ProductCard></div>,
    <div key="1" className="z-1"><Quests></Quests></div>,
    <div key="2" className="z-1"><ProductCard></ProductCard></div>
];

const FrontOverlay: React.FC<BottomTabDefaults> = ({ tab, currentActiveTab }) => {
    const [activeTab, onActiveTabChange] = useState(tab);
    console.log(activeTab);
    const handleTabClick = (index: number) => {
        onActiveTabChange(index);
        if (currentActiveTab) currentActiveTab(index);
        console.log(index);
    };
    const [userData, setUserData] = useState(null);

    
    

    return (
        
        <div className="overlay-menu size-full z-10">
            <TopTitle activeTab={activeTab} />
            <div className="bottom-container">
                <TabMenu tabs={tabItems} onTabChange={handleTabClick} content={contentTabs} />
            </div>
        </div>
    );
};

export default FrontOverlay;
