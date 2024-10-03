"use client";
import React, { useEffect, useState } from "react";
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
import WebApp from "@twa-dev/sdk";
import Loading from "../components/Contents/Loading";
import { TokenProvider, useToken } from "../context/token.context";
import { API_ENDPOINTS } from "../_globals/constants/baseUrl";
import CharacterCreation from "../components/Contents/CharacterCreation";
import CharacterCreationV2 from "../components/Contents/cc";

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

interface UserData {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    language_code?: string;
    is_premium?: boolean;
}

const FrontOverlay = () => {
    const [activeTab, setActiveTab] = useState(2);

    const { setToken, token } = useToken();

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [freshAccount, setFreshAccount] = useState(true);
    const [equippedData, setEquippedData] = useState("");

    const [wallet, setWallet] = useState(null);

    const handleTabClick = (index: number) => {
        setActiveTab(index);
    };

    const [userData, setUserData] = useState<UserData | null>(null);

    useEffect(() => {
        const initializeUserData = () => {
            if (typeof window !== "undefined" && WebApp.initDataUnsafe.user) {
                setUserData(WebApp.initDataUnsafe.user as UserData);
            }
        };
        initializeUserData();
    }, []);

    useEffect(() => {
        if (token) {
            console.info("Updated token:", token);
            getUserEquipment();
            getWallet();
        }
    }, [token]);

    const fetchWithToken = async (url: string, method: string = "GET") => {
        
        const response = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("OOHH");
        console.log(response.json());
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        return response.json();
    };

    const getWallet = async (): Promise<void> => {
        try {
            console.info("Fetching wallet...");
            const result = await fetchWithToken(API_ENDPOINTS.GET_WALLET, "GET");
            console.log("walet is oa");
            setWallet(result.data);
        } catch (error) {
            console.error("Error fetching wallet:", error);
        }
    };

    const signIn = async () => {
        if (!userData) return;

        try {
            console.info(API_ENDPOINTS.POST_PROFILE_SIGNIN);
            console.info("User is trying to sign in");
            console.info(userData.username);
            const response = await fetch(API_ENDPOINTS.POST_PROFILE_SIGNIN, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    first_name: userData.first_name || "telegram firstName",
                    last_name: userData.last_name || "telegram last_name",
                    username: userData.username || "telegram username",
                    is_premium: false,
                    telegram_id: userData.id.toString() || "telegram id temp",
                }),
            });

            if (!response.ok) {
                console.error("No existing user, signing up now.");

                throw new Error("Failed to connect to server");
            }

            const result = await response.json();
            setToken(result.access_token);
            setData(result);
        } catch (error) {
            console.error("Sign In Error:", error);
        }
    };

    const getUserState = async () => {
        try {
            const result = await fetchWithToken(API_ENDPOINTS.GET_USER_STATE);
            console.info(result);

            setFreshAccount(result.data.customCode === "AB001");
            // Add additional handling for user state if needed
        } catch (error) {
            console.error("Error during fetching user state:", error);
        } finally {
            setLoading(false);
        }
    };

    const getUserEquipment = async () => {
        try {
            const result = await fetchWithToken(API_ENDPOINTS.GET_EQUIP_ITEM_USING_MASTER_ID);
            setEquippedData(JSON.stringify(result.data));
            console.log(JSON.stringify(result.data));
            setFreshAccount(result.data.gender === "");
        } catch (error) {
            console.error("Error during fetching user equipment:", error);
        } finally {
            setLoading(false);
        }
    };

    const userDoneEditing = (response: string) => {
        console.info(response);
        if (response) {
            setEquippedData(JSON.stringify(response));
            setFreshAccount(false);
        }
    };

    useEffect(() => {
        signIn();
    }, [userData]);

    const contentTabs = [
        <div key="1" className="z-1">
            <Hero />
        </div>,
        <div key="2" className="z-1">
            <Lane />
        </div>,
        <div key="3" className="z-1">
            <Kingdom handleBuildClick={handleTabClick} />
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
        <div key={`quests-${activeTab}`} className="z-1">
            <Quests uniqueId={Date.now()} onUpdateWallet={getWallet} />
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
            {!loading ? (
                <>
                    {!freshAccount ? (
                        <>
                            <div className="">
                                <TopTitle handleTabClick={handleTabClick} />
                                <div className="details-section">
                                    <div className="wallet-section grid-cols-2">
                                        <div className="curved-box base-text gold-section">
                                            GOLD:
                                            <div className="right-side">
                                                {wallet ? wallet.gold.quantity : "0"}
                                                <img src="/assets/images/Coin.png" alt="" />
                                            </div>
                                        </div>
                                        <div className="curved-box base-text runes-section">
                                            RUNES:
                                            <div className="right-side">
                                                {wallet ? wallet.rune.quantity : "0"}
                                                <img src="/assets/images/icons/money.png" alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bottom-container">
                                <TabMenu tabs={tabItems} handleTabClick={handleTabClick} content={contentTabs} activeTab={activeTab} />
                            </div>
                        </>
                    ) : (
                        <CharacterCreationV2 jsonData={equippedData} CharacterCreateEvent={userDoneEditing} />
                    )}
                </>
            ) : (
                <CharacterCreationV2 jsonData={equippedData} CharacterCreateEvent={userDoneEditing} />
                
            )}
        </div>
    );
};

export default FrontOverlay;
