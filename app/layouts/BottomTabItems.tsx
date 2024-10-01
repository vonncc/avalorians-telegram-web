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
    const [loading, setLoading] = useState(true);

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

    const [userData, setUserData] = useState<UserData | null>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            if (WebApp.initDataUnsafe.user) {
                setUserData(WebApp.initDataUnsafe.user as UserData);
            } else {
                const initData = WebApp.initData;
            }
        }
    }, []);

    // Use useEffect to log the token whenever it changes
    useEffect(() => {
        console.log("Updated token:", token);
    }, [token]); // This will log the token every time it changes

    const signIn = async () => {
        try {
            if (!userData) {
                return;
            }

            const response = await fetch(API_ENDPOINTS.POST_PROFILE_SIGNIN, {
                method: "POST", // or 'POST'
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    // Your data here

                    first_name: userData.first_name,
                    last_name: userData.last_name,
                    username: userData.username,
                    is_premium: userData.is_premium,
                    telegram_id: userData.id.toString(),
                }),
            });

            if (!response.ok) {
                if (response.status) {
                    signUp();
                    return;
                } else {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }
            }

            const result = await response.json();
            console.log("asdad");
            console.log(result.access_token);
            setToken(result.access_token); // Assuming the token is in data.token
            
            setData(result);
            getUserState();
        } catch (err) {
            // setError(err.message);
            setLoading(false);
        } finally {
        }
    };

    const signUp = async () => {
        try {
            if (!userData) {
                console.log("no user how did you get here do nothing and block ");
                return;
            }
            console.log("userData");
            console.log(userData);
            const backupResponse = await fetch(API_ENDPOINTS.POST_PROFILE_SIGNUP, {
                method: "POST", // or 'POST'
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    // Your data here

                    first_name: userData.first_name,
                    last_name: userData.last_name,
                    username: userData.username,
                    is_premium: userData.is_premium || false,
                    telegram_id: userData.id.toString(),
                }),
            });

            if (!backupResponse.ok) {
                throw new Error("Backup API failed with status: " + backupResponse.status);
            }
            const backupResult = await backupResponse.json();
            setToken(backupResult.access_token); // Assuming the token is in data.token
            getUserState();
            setData(backupResult); // Set backup data if successful
        } catch (backupError) {}
    };

    // Define the function for the additional fetch
    const getUserState = async () => {
        try {
            // Perform your additional fetch here
            console.log("token " + token);
            const additionalResponse = await fetch(API_ENDPOINTS.GET_USER_STATE, {
                method: "GET", // or 'POST' based on your needs
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
                // body: JSON.stringify({ ... }) // Include body if needed
            });

            if (!additionalResponse.ok) {
                throw new Error("Additional fetch failed with status: " + additionalResponse.status);
            }

            console.log("additionalResult");
            console.log(additionalResponse);
            const additionalResult = await additionalResponse.json();
            console.log(additionalResult);

            if (additionalResult.data.customCode == "AB001") {
                // Show Character Creation
            } else {
                setLoading(false);
                // Open Kingdom
            }
            // Handle additional result here, e.g., set additional data state
            
        } catch (error) {
            console.error("Error during additional fetch: ", error);
        } finally {
        }
    };

    // Second useEffect for fetching data
    useEffect(() => {
        signIn();
    }, [userData]);

    return (
        <div className="overlay-menu z-45">
            {!loading ? (
                <>
                    <div className="">
                        <TopTitle handleTabClick={handleTabClick} />
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
                        <TabMenu tabs={tabItems} handleTabClick={handleTabClick} content={contentTabs} activeTab={activeTab} />
                    </div>
                </>
            ) : (
                <Loading />
            )}
        </div>
    );
};

export default FrontOverlay;
