"use client";
import React, { useState } from "react";

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
    const [activeTab, setActiveTab] = useState(0)

    const [_size, onSizeChange] = useState("full");
    const handleTabClick = (index: number) => {
        setActiveTab(index);
        console.log("in tab menu " + index);
        
        if (onTabChange) {
            onTabChange(index); // Notify parent of the active tab
            
            if (index ==3)
                onSizeChange("hero");
            else
                onSizeChange("full");
        }
    };

    return (
        <div className="tab-container tab-container-gradient-background">
            <div className={`tab-content hero`}>{content[activeTab]}</div>
            <div className="tab-header">
                <div
                    className="w-full object-left-bottom"
                    style={{
                        position: "fixed",
                        left: 0, // Ensures the div starts from the left edge of the screen
                            right: 0, // Ensures the div stretches to the right edge of the screen
                        bottom: 0, // Keeps it aligned to the bottom
                    }}
                >
                    <img src="/assets/images/BottomBG.png" className="w-full" alt=""/>
                </div>

                {tabs.map((tab, index) => (
                    <div key={index} className={`tab-button`} onClick={() => handleTabClick(index)}>
                        <div className={`tab-border ${index === activeTab ? "active" : ""}`}>
                            <img src={`${tab.image}`} alt="Icon" width={20} height={20} />
                        </div>

                        <span className="tab-button-text">{tab.text}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TabMenu;
