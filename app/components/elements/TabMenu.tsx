"use client";
import React, { useState } from "react";
import Image from "next/image";

export interface TabItem {
    image: string;
    text: string;
}
// Define the type for the props
export interface TabProps {
    tabs: TabItem[]; // Array of tab names
    content: React.ReactNode[]; // Array of content for each tab
    activeTab: number;
    handleTabClick: any;
    marginTops: number[];
}

const TabMenu: React.FC<TabProps> = ({ tabs, content, marginTops, activeTab, handleTabClick }) => {

    return (
        <div className="tab-container tab-container-gradient-background z-46">
            <div 
                className={`tab-content z-46 hero`}
                style={{
                    marginTop: marginTops[activeTab]
                }}>
                {content[activeTab]}
            </div>
            <div className="tab-header z-46">
                <div
                    className="w-full object-left-bottom"
                    style={{
                        position: "fixed",
                        left: 0, // Ensures the div starts from the left edge of the screen
                            right: 0, // Ensures the div stretches to the right edge of the screen
                        bottom: 0, // Keeps it aligned to the bottom
                    }}
                >
                    <img 
                        src="/assets/images/BottomBG.png" 
                        className="w-full" 
                        alt=""
                        style={{
                            height: "128px"
                        }}
                    />
                </div>

                {tabs.map((tab, index) => (
                    <div key={index} className={`tab-button`} onClick={() => handleTabClick(index)}>
                        <div className={`z-46 tab-border ${index === activeTab ? "active" : ""}`}>
                            <Image src={`${tab.image}`} alt="Icon" width={20} height={20} />
                        </div>

                        <span className="tab-button-text">{tab.text}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TabMenu;
