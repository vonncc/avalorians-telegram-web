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
import CharacterCreation from "../components/Contents/cc";

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
    const [freshAccount, setFreshAccount] = useState(true);
    const [equippedData, setEquippedData] = useState("");

    const [wallet, setWallet] = useState(null);

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
        <div key={`quests-${activeTab}`} className="z-1">
            <Quests uniqueId={Date.now()} onUpdateWallet={GetWalet} />
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

        if (!token) 
            return;

        getUserEquipment();
        GetWalet();
    }, [token]); // This will log the token every time it changes

    async function GetWalet(): Promise<void> {
        try {
            console.log("asdadsadsadsdsadaahdsgajhdsag");
            const response = await fetch(API_ENDPOINTS.GET_WALLET, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
            });

            if (!response.ok) {
                console.log("ERRO ERRO EREROR");
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            console.log("PUTANGINA");
            const result = await response.json();

            if (result) {
                console.log("RESULT: assdgsadgsauydgsahdsgajhdsag");
                console.log(response);
                console.log(result.data);
                setWallet(result.data);
                result;
            } else {
                console.log("Response: assdgsadgsauydgsahdsgajhdsag");
                console.log(result.data);
                setWallet(result.data);
            }
        } catch (error) {
            console.error("Error saving data:", error);
        }

        //
    }

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
                    console.log("No existing user sign uo now");
                    signUp();
                    return;
                } else {
                    console.log("No existing user sign up now 2");
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }
            }

            const result = await response.json();
            console.log("Sign in");
            console.log(result.access_token);
            setToken(result.access_token); // Assuming the token is in data.token

            setData(result);
        } catch (err) {
            signUp();
            console.log(err);
            // setError(err.message);
            // setLoading(false);
        } finally {

        }
    };

    const signUp = async () => {
        try {
            if (!userData) {
                console.log("no user how did you get here do nothing and block ");
                return;
            }
            console.log("sign up attempt");
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
            console.log("sign up attempt 1");
            if (!backupResponse.ok) {
                throw new Error("Backup API failed with status: " + backupResponse.status);
            }
            const backupResult = await backupResponse.json();
            console.log("Signing Up");
            console.log(backupResult.access_token);
            setToken(backupResult.access_token); // Assuming the token is in data.token

            setData(backupResult); // Set backup data if successful
        } catch (backupError) {
            console.log("Sign Up Error");
            console.log(backupError );
        }
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
                setFreshAccount(true);
                // Show Character Creation
            } else {
                setFreshAccount(false);

                // Open Kingdom
            }
            // Handle additional result here, e.g., set additional data state
        } catch (error) {
            console.error("Error during additional fetch: ", error);
        } finally {
            setLoading(false);
        }
    };

    const getUserEquipment = async () => {
        try {
            // Perform your additional fetch here
            const additionalResponse = await fetch(API_ENDPOINTS.GET_EQUIP_ITEM_USING_MASTER_ID, {
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

            console.log("additionalResult in Equipment");
            console.log(additionalResponse);
            const additionalResult = await additionalResponse.json();
            console.log(additionalResult.data);

            if (additionalResult.data.gender == "") {
                setFreshAccount(true);
                // Show Character Creation
            } else {
                setEquippedData(JSON.stringify(additionalResult.data));
                setFreshAccount(false);

                // Open Kingdom
            }
            // Handle additional result here, e.g., set additional data state
        } catch (error) {
            console.error("Error during additional fetch: ", error);
        } finally {
            setLoading(false);
        }
    };

    function userDoneEditiin(response: string) {
        console.log(response);
        if (response) {
            setEquippedData(JSON.stringify(response));
            setFreshAccount(false);
        }
    }

    // Second useEffect for fetching data
    useEffect(() => {
        signIn();
    }, [userData]);

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
                        <CharacterCreation jsonData={equippedData} CharacterCreateEvent={userDoneEditiin} />
                    )}
                </>
            ) : (
                <Loading />
            )}
        </div>
    );
};

export default FrontOverlay;
