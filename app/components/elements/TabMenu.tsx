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
    onTabChange?: (activeTabIndex: number) => void;
}

const TabMenu: React.FC<TabProps> = ({ tabs, content, onTabChange }) => {
    // Manage the active tab index
    const [activeTab, setActiveTab] = useState(0);
    const handleTabClick = (index: number) => {
        setActiveTab(index);
        console.log("in tabh menu " + index);
        if (onTabChange) {
            onTabChange(index); // Notify parent of the active tab
        }
    };

    return (
        <div>
            <div className="tab-container tab-container-gradient-background">
                <div className="tab-content">{content[activeTab]}</div>
                <div className="tab-header">
                    {tabs.map((tab, index) => (
                        <div key={index} className={`tab-button ${index === activeTab ? "active" : ""}`} onClick={() => handleTabClick(index)}>
                            <img src={`${tab.image}`} alt="Icon" width={50} height={50} />
                            <span className="tab-button-text">{tab.text}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TabMenu;
