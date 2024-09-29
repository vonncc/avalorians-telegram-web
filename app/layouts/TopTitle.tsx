"use client"
import React, { useEffect, useState } from "react";
import TabMenu, {TabItem} from "@/app/components/elements/TabMenu";

interface TopTitleProps{
    activeTab: number;
}

const tabItems: TabItem[] = [
    {
        image: "/assets/images/tabs/Friends.png",
        text: "FRIENDS",
    },
    {
        image: "/assets/images/tabs/Quest.png",
        text: "QUESTS",
    },
    {
        image: "/assets/images/tabs/Airdrop.png",
        text: "AIRDROP",
    },
]

const TopTitle: React.FC<TopTitleProps> = ({activeTab}) => {
    useEffect(() => {
        // Whenever activeTab prop changes, update internal index
        setIndex(activeTab);
    }, [activeTab]);

    const [index, setIndex] = useState(activeTab);

    return (
        <div className="top-container">
            <div className="">
                <img src="/assets/images/ProfilePicture.png" alt="Pika!"/>
            </div>
            <div>
                <p>Van Helsing</p>
                <p>&nbsp;&nbsp;&nbsp;UQCa....d23a<img className="float-right" src="/assets/images/icons/ton.png" alt="ton"/></p>
            </div>
            <div className={`tab-button`}>
            <div className={`top-tab-border`}>
                        <img src={`${tabItems[0].image}`} alt="Icon" width={20} height={20}/>
                    </div>
                    <span className="mt-1 text-[8px]">{tabItems[0].text}</span>
                </div>
                <div className={`tab-button`}>
                    <div className={`top-tab-border`}>
                        <img src={`${tabItems[1].image}`} alt="Icon" width={20} height={20}/>
                    </div>
                    <span className="mt-1 text-[8px]">{tabItems[1].text}</span>
                </div>
                <div className={`tab-button`}>
                    <div className={`top-tab-border`}>
                        <img src={`${tabItems[2].image}`} alt="Icon" width={20} height={20}/>
                    </div>
                    <span className="mt-1 text-[8px]">{tabItems[2].text}</span>
                </div>
        </div>
    );
};

export default TopTitle;
