"use client"
import React from "react";
import Image from "next/image";
import {TabItem} from "@/app/components/elements/TabMenu";
import {TonConnectButton, TonConnectUIProvider} from "@tonconnect/ui-react";
import {useUserState} from "../context/data.context";

interface TopTitleProps{
    handleTabClick: any;
}

const tabItems: TabItem[] = [
    {
        image: "/assets/images/tabs/Store.png",
        text: "STORE",
    },
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

const TopTitle: React.FC<TopTitleProps> = ({handleTabClick}) => {

    const { userStateData } = useUserState();

    return (
        <TonConnectUIProvider manifestUrl="https://www.avalorians.io/assets/tonconnect-manifest.json">
        <div className="top-container">
            <div className="">
                <img src="/assets/images/ProfilePicture.png" alt="Pika!"/>
            </div>
            <div>
                <p>{userStateData ? userStateData.user.username : "Avalorians User"}</p>
                <TonConnectButton className="p-1"/>
            </div>
            <div className={`tab-button`}>
                <div className={`top-tab-border disabled`} >
                    {/*<img src={`${tabItems[0].image}`} alt="Icon" width={20} height={20}/>*/}
                    <Image src="/assets/images/tabs/Disabled.png" alt="Icon" width={50} height={50}/>
                </div>
                <span className="mt-1 text-[8px] opacity-60">{tabItems[0].text}</span>
            </div>
            <div className={`tab-button`}>
                <div className={`top-tab-border disabled`}>
                    {/*<img src={`${tabItems[1].image}`} alt="Icon" width={20} height={20}/>*/}
                    <Image src="/assets/images/tabs/Disabled.png" alt="Icon" width={50} height={50}/>
                </div>
                <span className="mt-1 text-[8px] opacity-60">{tabItems[1].text}</span>
            </div>
            <div className={`tab-button`}>
                <div className={`top-tab-border`} onClick={() => handleTabClick(7)}>
                    <img src={`${tabItems[2].image}`} alt="Icon" width={20} height={20}/>
                </div>
                <span className="mt-1 text-[8px]">{tabItems[2].text}</span>
            </div>
            <div className={`tab-button`}>
                <div className={`top-tab-border disabled`}>
                    {/*<img src={`${tabItems[3].image}`} alt="Icon" width={20} height={20}/>*/}
                    <Image src="/assets/images/tabs/Disabled.png" alt="Icon" width={50} height={50}/>
                </div>
                <span className="mt-1 text-[#FF3E3E] text-[8px] opacity-60">{tabItems[3].text}</span>
                {/*<span className="text-[8px] absolute top-6 bg-black opacity-70">disabled</span>*/}
            </div>
        </div>
        </TonConnectUIProvider>
    );
};

export default TopTitle;
