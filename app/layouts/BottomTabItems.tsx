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
import CharacterCreationV2 from "../components/Contents/cc";
import King from "@/app/components/Contents/King";
import { useUserState } from "../context/data.context";
import TwitterButton from "../components/elements/TwitterButton";
const tabItems: TabItem[] = [
    {
        image: "/assets/images/tabs/King.png",
        text: "KING",
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
        image: "/assets/images/tabs/Champions.png",
        text: "CHAMPIONS",
    },
    {
        image: "/assets/images/tabs/Creeps.png",
        text: "CREEPS",
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

    const { setToken, token } = useToken();
    const { userStateData, setUserStateData} = useUserState();

    const [activeTab, setActiveTab] = useState(2);

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const [loading, setLoading] = useState(true);
    const [isTelegramWebView, setIsTelegramWebView] = useState(false);
    const [freshAccount, setFreshAccount] = useState(true);

    // Use only for local testing
    // const [loading, setLoading] = useState(false);
    // const [isTelegramWebView, setIsTelegramWebView] = useState(true);
    // const [freshAccount, setFreshAccount] = useState(false);
    
    const [equippedData, setEquippedData] = useState("");

    const [wallet, setWallet] = useState(null);

    const handleTabClick = (index: number) => {
        setActiveTab(index);
    };

    const [userData, setUserData] = useState<UserData | null>(null);

    useEffect(() => {
        const initializeUserData = () => {
            if (typeof window !== "undefined" && WebApp.initDataUnsafe.user) {
                setIsTelegramWebView(true);
                setUserData(WebApp.initDataUnsafe.user as UserData);
            }
        };
        initializeUserData();
    }, []);

    const [sample, setSample] = useState('')

    useEffect(() => {
        if (token) {
            console.info("Updated token:", token);

            // Call getUserState only if token exists
            getUserState();
        } else {
            console.warn("Token is missing or invalid, skipping user state fetch.");
        }
    }, [token]);

    useEffect(() => {
        if (userStateData) {
            console.log("asdadasdsa");
            console.log(userStateData);
        }
    }, [userStateData]);


    const fetchWithToken = async (url: string, method: string = "GET") => {
        const response = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("OOHH");
        const reponseJSON = response.json();
        console.log(reponseJSON);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        return reponseJSON;
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

            console.log("OFFFFFFFF");
            
            const result = await response.json();
            console.log(JSON.stringify(response));
            console.log("Beating");
            console.log(result);
            setToken(result.access_token);
            
            // setData(result);
        } catch (error) {
            console.error("Sign In Error:", error);
        }
    };

    const getUserState = async () => {
        try {
            console.log(API_ENDPOINTS.GET_USER_STATE);
            // window.location.href = API_ENDPOINTS.GET_VERSION;
            const response = await fetch(API_ENDPOINTS.GET_USER_STATE, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }


            console.log("User state 1:", JSON.stringify(response));

            setSample(JSON.stringify(response));
            const responseJSON = await response.json();
            console.log("User state 2:", responseJSON);
            setUserStateData(responseJSON);
            setWallet(responseJSON.wallet);
            // Proceed with other operations only after the awaited code
            setFreshAccount(!responseJSON);
            
            setLoading(false);
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
        // setToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjI0LCJ0ZWxlZ3JhbV9pZCI6Ijc0NjkxNDM3NTgiLCJpZCI6MjQsImlhdCI6MTcyODAyNjA0NywiZXhwIjoxNzI4MDI5NjQ3fQ.rpuUYZZCv1-CWXr7w7WwstAwpXlhNFFDFsBw_y6YfyA");
        // getUserState();
    }, [userData]);

    const contentTabs = [
        <div key="0" className="z-1">
            <King />
        </div>,
        <div key="1" className="z-1 size-full">
            <Lane token={token} />
        </div>,
        <div key="2" className="z-1 size-full">
            <Kingdom token={token} />
        </div>,
        <div key="3" className="z-1">
            <Hero />
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
            {!loading  && isTelegramWebView ? (
                <>
                    {!freshAccount ? (
                        <>
                            <div className="">
                                <TopTitle handleTabClick={handleTabClick} />
                                <TwitterButton></TwitterButton>
                                <div className="details-section">
                                    <div className="wallet-section grid-cols-2">
                                        <div className="curved-box base-text gold-section">
                                            GOLD:
                                            <div className="right-side">
                                                {wallet ? wallet.gold : "0"}
                                                <img src="/assets/images/Coin.png" alt="" />
                                            </div>
                                        </div>
                                        <div className="curved-box base-text runes-section">
                                            RUNES:
                                            <div className="right-side">
                                                {wallet ? wallet.rune : "0"}
                                                <img src="/assets/images/icons/money.png" alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bottom-container z-46">
                                <TabMenu tabs={tabItems} handleTabClick={handleTabClick} content={contentTabs} activeTab={activeTab} />
                            </div>
                        </>
                    ) : (
                        <CharacterCreationV2 jsonData={equippedData} CharacterCreateEvent={userDoneEditing} />
                    )}
                </>
            ) : (
                <Loading />
                // <CharacterCreationV2 jsonData={equippedData} CharacterCreateEvent={userDoneEditing} />
            )}
        </div>
    );
};

export default FrontOverlay;
