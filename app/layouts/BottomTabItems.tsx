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
import KingdomBuild from "@/app/components/elements/Kingdom/KingdomBuild";

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
        image: "/assets/images/tabs/store.png",
        text: "STORE",
    },
];

const FrontOverlay = () => {
    const [activeTab, setActiveTab] = useState(2)

    const handleTabClick = (index: number) => {
        setActiveTab(index);
        console.log("in tab menu " + index);
    };

    const contentTabs = [
        <div key="1" className="z-1">
            <Hero />
        </div>,
        <div key="2" className="z-1">
            <Lane />
        </div>,
        <div key="3" className="z-1">
            <Kingdom handleBuildClick={handleTabClick}/>
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
        <div key="9" className="z-1">
            <KingdomBuild />
        </div>,
    ];

    return (
        <div className="overlay-menu z-45">
            <div className="">
                <TopTitle handleTabClick={handleTabClick}/>
                <div className="details-section">
                    <div className="wallet-section grid-cols-2">
                        <div className="curved-box base-text gold-section">
                            GOLD:
                            <div className="right-side">
                                123,456
                                <img src="/assets/images/Coin.png" alt="" />
                            </div>
                        </div>
                        <div className="curved-box base-text runes-section">
                            RUNES:
                            <div className="right-side">
                                123
                                <img src="/assets/images/icons/money.png" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bottom-container">
                <TabMenu tabs={tabItems} handleTabClick={handleTabClick} content={contentTabs} activeTab={activeTab}/>
            </div>
        </div>
    );
};

export default FrontOverlay;
