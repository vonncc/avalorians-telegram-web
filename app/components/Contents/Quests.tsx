"use client";
import React, { useEffect, useRef, useState } from "react";
import QuestsButton from "../elements/QuestsButton";
import "@/app/styles/pages/quests.css";
import { API_ENDPOINTS } from "@/app/_globals/constants/baseUrl";
import { useToken } from "@/app/context/token.context";
import MessageBox from "../elements/MessageBox/MessageBox";

interface Quest {
    id: string; // or number, depending on your data type
    quest_lists: {
        name: string;
        image: string;
        reward: number; // or whatever type this should be
        url_link: string;
    };
    is_done: boolean;
    reward_claimed: boolean;
}

interface QuestsProps {
    uniqueId: number; // Ensure uniqueId is a number
    onUpdateWallet: () => void;
}

enum MessageStatus {
    NORMAL,
    REWARDED,
    CLAIMED,
}

const Quests: React.FC<QuestsProps> = ({ uniqueId, onUpdateWallet }) => {
    const [data, setData] = useState<any>(null); // State to store fetched data
    const [isRewardClaind, setIsRewardClaimed] = useState(false);
    const [tryingToGetData, setTryingToGetData] = useState(true);
    const [isShowMessageBox, setShowMessageBox] = useState(false);
    const { token } = useToken();
    const [loading, setLoading] = useState(true); // State to handle loading state

    const [messageStatus, setMessageStatus] = useState<MessageStatus>(MessageStatus.NORMAL);

    const [dailyQuests, setDailyQuests] = useState<Quest[]>([]);
    const [weeklyQuests, setWeeklyQuests] = useState<Quest[]>([]);
    const [permanentQuests, setPermanentQuests] = useState<Quest[]>([]);
    const selectedQuestsToView = useRef<Quest | null>(null);

    const handleTwitterLogin = async () => {
        // window.location.href = 'https://7882-120-28-179-30.ngrok-free.app/auth/twitter'; // Adjust to your backend URL
        // window.open('https://api.dev.avalorians.io/api/v1/auth/twitter', "_blank");
        // window.location.href = 'http://localhost:3000/api/v1/auth/twitter';
        // window.open('http://localhost:3000/api/v1/auth/twitter', "_blank");
        // window.location.href = 'https://api.dev.avalorians.io/api/v1/auth/twitter';

        const response = await fetch('https://api.dev.avalorians.io/api/v1/auth/twitter', {
            method: 'GET',
            credentials: 'include', // Ensure cookies are included
        });
    
        if (response.redirected) {
            // If the response is a redirect, navigate to the new URL
            window.location.href = response.url;
        }
    };

    const handleClick = async (element: any, index:number, category: string) => {
        try {
            console.info(`${API_ENDPOINTS.PATCH_FINISH_QUESTS}${element.quests_id}`);
            console.info(permanentQuests[index]);
            if (element.is_done) {
                setShowMessageBox(true);

                if (category == "daily") {
                    // setSelectedQuestsToView(dailyQuests[index]);
                    selectedQuestsToView.current = dailyQuests[index];
                } else if (category == "weekly") {
                    // setSelectedQuestsToView(weeklyQuests[index]);
                    selectedQuestsToView.current = weeklyQuests[index];
                } else {
                    // setSelectedQuestsToView(permanentQuests[index]);
                    selectedQuestsToView.current = permanentQuests[index];
                }
                console.log("Cre");
                console.log(selectedQuestsToView);
                // 
            } else {

                if (element.quests_url == "link_twitter") {
                    handleTwitterLogin();
                    return;
                }
                const response = await fetch(`${API_ENDPOINTS.PATCH_FINISH_QUESTS}${element.quests_id}`, {
                    method: "PATCH",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        progress: 1, // Your raw body as a JSON object
                    }),
                });
    
                if (!response.ok) {
                    console.info(response);
                    throw new Error("Network response was not ok" + response);
                }
    
                const result = await response.json();
                console.info(result);
                element.is_done = true;
                const link = element.quests_url; // Replace with the desired link
                window.open(link, "_blank"); // Opens in a new tab
            }

            // Optionally reload quests after completing an action
        } catch (error) {
            console.info("ai error" + error);
            
        }
    };

    const CheckIfVerified = async (messageStatus: MessageStatus) => {
        try {
            console.log("Check if verified");
            console.log(selectedQuestsToView.current.reward_claimed);
            console.log(selectedQuestsToView.current.quest_lists.url_link);
            
            switch(selectedQuestsToView.current.reward_claimed){
                case false:
                    const response = await fetch(`${API_ENDPOINTS.GET_IF_QUEST_FINISHED}${selectedQuestsToView.current.id}`, {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        }
                    });
            
                    if (!response.ok) {
                        console.info(response);
                        throw new Error("Network response was not ok" + response);
                    }
            
                    const result = await response.json();
        
                    if (result.status == 'success') {
                        onUpdateWallet();
                        setIsRewardClaimed(true);
                        selectedQuestsToView.current.reward_claimed = true;
                        setMessageStatus(MessageStatus.REWARDED); 
                    }
                    break;
                case true:
                    setShowMessageBox(false);
                    break;

            }
           
        } catch(error) {
            // setIsRewardClaimed(true);
            // setMessageStatus(MessageStatus.CLAIMED);
        }
        

    }

    // const loadQuests = async () => {
    //     try {
    //         console.info("Loading quests...");
    //         const response = await fetch(`${API_ENDPOINTS.GET_USER_ACTIVE_QUESTS}`, {
    //             method: "GET",
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //                 "Content-Type": "application/json",
    //             },
    //         });

    //         if (!response.ok) {
    //             console.info(response);
    //             throw new Error("Network response was not ok" + response);
    //         }

    //         const result = await response.json();
    //         console.info(result);
    //         setData(result); // Update the state with fetched quests
    //     } catch (error) {
    //         console.info("ai error" + error);
    //     }
    // };

    const fetchData = async () => {
        try {
            console.log("data");
            console.log(data);
            // if (tryingToGetData == true) {
            const response = await fetch(API_ENDPOINTS.POST_GET_AND_SYNC_QUESTS, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const results = await response.json(); // You might not need to store this result if you just need to trigger the loadQuests function
            console.log("LAGI");
            console.log(results);
            setData(results);
            console.log("permanentQuests");
            setDailyQuests(results.data.dailyQuests);
            setWeeklyQuests(results.data.weeklyQuests);
            setPermanentQuests(results.data.permanentQuests);


            // setTryingToGetData(false);
            // loadQuests();
            // }
        } catch (error) {
            console.info("Error fetching data: ", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [token]); // Consider adding other dependencies that affect fetching
    return (
        // <div className="quests-container">
        //     <div className="title">Daily tasks</div>
        //     <QuestsButton text="Watch youtube" image="/assets/images/icons/youtubeIcon.png" data={{ quests_id: "1", quests_status: false }} />
        //     <div className="title">Weekly tasks</div>
        //     <QuestsButton text="Follow us on Twitter" image="/assets/images/icons/Xsocial.png" data={{ quests_id: "2", quests_status: false }} />
        //     <QuestsButton text="Join our Telegram" image="/assets/images/icons/telegram2.png" data={{ quests_id: "4", quests_status: false }} />
        //     <div className="title">Permanent tasks</div>
        //     {/* <QuestsButton text="Follow us on Twitter" image="/assets/images/icons/Xsocial.png" data={{ quests_id: "2", quests_status: false }} />
        //     <QuestsButton text="Join our Telegram" image="/assets/images/icons/telegram2.png" data={{ quests_id: "4", quests_status: false }} /> */}
        //     {data.permanentQuests.map((quest: any) => (
        //         <QuestsButton
        //         key={quest.quests_id}
        //         text={quest.quest_lists.name}
        //         image={`/assets/images/icons/${quest.quest_lists.image}.png`}
        //         data={{
        //             quests_id: quest.quests_id,
        //             quests_status: quest.is_done,
        //         }}
        //         />
        //     ))}
        // </div>
        <>
            {data ? (
                <div className="quests-container">
                    <div className="title">Daily tasks</div>

                    {data.data.dailyQuests.length > 0 ? (
                        (() => {
                            const uniqueIds = new Set<string>(); // Ensure Set holds strings if your IDs are strings
                            return data.data.dailyQuests
                                .filter((quest: Quest) => {
                                    // Use the Quest type here
                                    if (uniqueIds.has(quest.id)) {
                                        return false; // Skip duplicate
                                    } else {
                                        uniqueIds.add(quest.id); // Add to Set
                                        return true; // Include this quest
                                    }
                                })
                                .map(
                                    (
                                        quest: Quest, // Use the Quest type here as well,
                                        index: number
                                    ) => (
                                        <QuestsButton
                                            onClick={handleClick}
                                            key={quest.id}
                                            text={quest.quest_lists.name}
                                            image={`/assets/images/icons/${quest.quest_lists.image}.png`}
                                            index={index}
                                            category="daily"
                                            data={{
                                                quests_id: quest.id,
                                                quests_status: quest.is_done,
                                                quests_reward: quest.quest_lists.reward,
                                                quests_url: quest.quest_lists.url_link,
                                                is_done: quest.is_done,
                                                reward_claimed: quest.reward_claimed
                                            }}
                                        />
                                    )
                                );
                        })()
                    ) : (
                        <p>No weekly quests available.</p>
                    )}

                    {/* Render daily quests here if available */}
                    {/* {data.data.dailyQuests.length > 0 ? (
                        data.data.dailyQuests.map((quest: any) => (
                            <QuestsButton
                                onClick={handleClick}
                                key={quest.quests_id}
                                text={quest.quest_lists.name}
                                image={`/assets/images/icons/${quest.quest_lists.image}.png`}
                                data={{
                                    quests_id: quest.id,
                                    quests_status: quest.is_done,
                                    quests_reward: quest.quest_lists.reward,
                                    quests_url: quest.quest_lists.url_link
                                }}
                            />
                        ))
                    ) : (
                        <p>No daily quests available.</p>
                    )} */}

                    <div className="title">Weekly tasks</div>
                    {/* Render weekly quests if available */}
                    {data.data.weeklyQuests.length > 0 ? (
                        (() => {
                            const uniqueIds = new Set<string>(); // Ensure Set holds strings if your IDs are strings
                            return data.data.weeklyQuests
                                .filter((quest: Quest) => {
                                    // Use the Quest type here
                                    if (uniqueIds.has(quest.id)) {
                                        return false; // Skip duplicate
                                    } else {
                                        uniqueIds.add(quest.id); // Add to Set
                                        return true; // Include this quest
                                    }
                                })
                                .map(
                                    (
                                        quest: Quest, // Use the Quest type here as well
                                        index: number
                                    ) => (
                                        <QuestsButton
                                            onClick={handleClick}
                                            key={quest.id}
                                            text={quest.quest_lists.name}
                                            image={`/assets/images/icons/${quest.quest_lists.image}.png`}
                                            index={index}
                                            category="weekly"
                                            data={{
                                                quests_id: quest.id,
                                                quests_status: quest.is_done,
                                                quests_reward: quest.quest_lists.reward,
                                                quests_url: quest.quest_lists.url_link,
                                                is_done: quest.is_done,
                                                reward_claimed: quest.reward_claimed
                                            }}
                                        />
                                    )
                                );
                        })()
                    ) : (
                        <p>No weekly quests available.</p>
                    )}

                    <div className="title">Permanent tasks</div>

                    {permanentQuests.length > 0 ? (
                        (() => {
                            const uniqueIds = new Set<string>(); // Ensure Set holds strings if your IDs are strings
                            return permanentQuests
                                .filter((quest: Quest) => {
                                    // Use the Quest type here
                                    if (uniqueIds.has(quest.id)) {
                                        return false; // Skip duplicate
                                    } else {
                                        uniqueIds.add(quest.id); // Add to Set
                                        return true; // Include this quest
                                    }
                                })
                                .map(
                                    (
                                        quest: Quest, // Use the Quest type here as well
                                        index: number
                                    ) => (
                                        <QuestsButton
                                            onClick={handleClick}
                                            key={quest.id}
                                            text={quest.quest_lists.name}
                                            image={`/assets/images/icons/${quest.quest_lists.image}.png`}
                                            index={index}
                                            category="permanent"
                                            data={{
                                                quests_id: quest.id,
                                                quests_status: quest.is_done,
                                                quests_reward: quest.quest_lists.reward,
                                                quests_url: quest.quest_lists.url_link,
                                                is_done: quest.is_done,
                                                reward_claimed: quest.reward_claimed,
                                                
                                            }}
                                        />
                                    )
                                );
                        })()
                    ) : (
                        <p>No Permanent quests available.</p>
                    )}

                    {/* Render permanent quests */}
                    {/* {data.data.permanentQuests.length > 0 ? (
                        data.data.permanentQuests.map((quest: any) => (
                            <QuestsButton
                                onClick={handleClick}
                                key={quest.quests_id}
                                text={quest.quest_lists.name}
                                image={`/assets/images/icons/${quest.quest_lists.image}.png`}
                                data={{
                                    quests_id: quest.id,
                                    quests_status: quest.is_done,
                                    quests_reward: quest.quest_lists.reward,
                                    quests_url: quest.quest_lists.url_link
                                }}
                            />
                        ))
                    ) : (
                        <p>No permanent quests available.</p>
                    )} */}
                </div>
            ) : (
                <></>
            )}

            {isShowMessageBox ? (
                <div>
                    {/* <MessageBox  onClick={CheckIfVerified} messageStatus={messageStatus} setMessageStatus={setMessageStatus} ></MessageBox> */}
                </div>
            ) : (
                <></>
            )}
        </>
    );
};

export default Quests;
