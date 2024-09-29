"use client";
import React, { useState } from "react";
import TabMenu, { TabItem } from "../components/elements/TabMenu";
import TopTitle from "./TopTitle";

import Creeps from "../components/Contents/Creeps";
import Hero from "../components/Contents/Hero";
import Kingdom from "../components/Contents/Kingdom";
import Lane from "../components/Contents/Lane";
import Store from "../components/Contents/Store";
import Friends from "@/app/components/Contents/Friends";
import Quests from "@/app/components/Contents/Quests";
import Airdrop from "@/app/components/Contents/Airdrop";

const tabItems: TabItem[] = [
    {
        image: "/assets/images/tabs/Hero.png",
        text: "HERO",
    },
    {
        image: "/assets/images/tabs/Lane.png",
        text: "LANE",
    },
    {
        image: "/assets/images/tabs/Kingdom.png",
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
    <div key="1" className="z-1">
        <Hero />
    </div>,
    <div key="2" className="z-1">
        <Lane />
    </div>,
    <div key="3" className="z-1">
        <Kingdom />
    </div>,
    <div key="4" className="z-1">
        <Creeps />
    </div>,
    <div key="5" className="z-1">
        <Store />
    </div>,
    <div key="6" className="z-1">
        <Friends />
    </div>,
    <div key="7" className="z-1">
        <Quests />
    </div>,
    <div key="8" className="z-1">
        <Airdrop />
    </div>,
];

const FrontOverlay: React.FC<BottomTabDefaults> = ({ tab, currentActiveTab }) => {
    const [activeTab, onActiveTabChange] = useState(tab);
    const [isHeroTab, onHeroTab] = useState(activeTab == 3);

    const handleTabClick = (index: number) => {
        onActiveTabChange(index);
        onHeroTab(index == 1);
        if (currentActiveTab) currentActiveTab(index);

    };

    return (
        <div className="overlay-menu z-45">
            {<TopTitle activeTab={activeTab}/>}
            <div className="details-section">
                <div className="wallet-section grid-cols-2">
                    <div className="curved-box base-text gold-section">
                        GOLD:
                        <div className="right-side">
                            123,456
                            <img src="/assets/images/Coin.png" alt=""></img>
                        </div>
                    </div>
                    <div className="curved-box base-text runes-section">
                        RUNES:
                        <div className="right-side">
                            123
                            <img src="/assets/images/icons/money.png" alt=""></img>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bottom-container">
                <TabMenu tabs={tabItems} onTabChange={handleTabClick} content={contentTabs}/>
            </div>
        </div>
    );
};

export default FrontOverlay;
