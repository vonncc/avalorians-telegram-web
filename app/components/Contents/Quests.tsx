"use client"
import React, { useEffect, useState } from "react";
import QuestsButton from "../elements/QuestsButton";
import "@/app/styles/pages/quests.css";
import { API_ENDPOINTS } from "@/app/_globals/constants/baseUrl";
import { useToken } from "@/app/context/token.context";

interface Quest {
    id: string; // or number, depending on your data type
    quest_lists: {
        name: string;
        image: string;
        reward: number; // or whatever type this should be
        url_link: string;
    };
    is_done: boolean;
}

interface QuestsProps {
    uniqueId: number; // Ensure uniqueId is a number
    onUpdateWallet: () => void;
}

const Quests: React.FC<QuestsProps> = ({ uniqueId, onUpdateWallet }) => {
    const [data, setData] = useState<any>(null); // State to store fetched data
    const { token } = useToken();
    const [loading, setLoading] = useState(true); // State to handle loading state

    const handleClick = async (element: any) => {
        try {
            logger.info(`${API_ENDPOINTS.PATCH_FINISH_QUESTS}${element.quests_id}`);
            const response = await fetch(`${API_ENDPOINTS.PATCH_FINISH_QUESTS}${element.quests_id}`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                    "Cache-Control": "no-cache",
                    Pragma: "no-cache",
                    Expires: "0",
                },
                body: JSON.stringify({
                    progress: 1, // Your raw body as a JSON object
                }),
            });

            if (!response.ok) {
                logger.info(response);
                throw new Error("Network response was not ok" + response);
            }

            const result = await response.json();
            logger.info(result);
            const link = element.quests_url; // Replace with the desired link
            window.open(link, "_blank"); // Opens in a new tab
            onUpdateWallet();
            // Optionally reload quests after completing an action
        } catch (error) {
            logger.info("ai error" + error);
        }
    };

    const loadQuests = async () => {
        try {
            logger.info("Loading quests...");
            const response = await fetch(`${API_ENDPOINTS.GET_USER_ACTIVE_QUESTS}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                logger.info(response);
                throw new Error("Network response was not ok" + response);
            }

            const result = await response.json();
            logger.info(result);
            setData(result); // Update the state with fetched quests
        } catch (error) {
            logger.info("ai error" + error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(API_ENDPOINTS.POST_GET_AND_SYNC_QUESTS, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                        "Cache-Control": "no-cache",
                        Pragma: "no-cache",
                        Expires: "0",
                    },
                });

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                const ha = await response.json(); // You might not need to store this result if you just need to trigger the loadQuests function
                loadQuests();
            } catch (error) {
                logger.info("Error fetching data: ", error);
            } finally {
                setLoading(false);
            }
        };

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
                                        quest: Quest // Use the Quest type here as well
                                    ) => (
                                        <QuestsButton
                                            onClick={handleClick}
                                            key={quest.id}
                                            text={quest.quest_lists.name}
                                            image={`/assets/images/icons/${quest.quest_lists.image}.png`}
                                            data={{
                                                quests_id: quest.id,
                                                quests_status: quest.is_done,
                                                quests_reward: quest.quest_lists.reward,
                                                quests_url: quest.quest_lists.url_link,
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
                                        quest: Quest // Use the Quest type here as well
                                    ) => (
                                        <QuestsButton
                                            onClick={handleClick}
                                            key={quest.id}
                                            text={quest.quest_lists.name}
                                            image={`/assets/images/icons/${quest.quest_lists.image}.png`}
                                            data={{
                                                quests_id: quest.id,
                                                quests_status: quest.is_done,
                                                quests_reward: quest.quest_lists.reward,
                                                quests_url: quest.quest_lists.url_link,
                                            }}
                                        />
                                    )
                                );
                        })()
                    ) : (
                        <p>No weekly quests available.</p>
                    )}

                    <div className="title">Permanent tasks</div>

                    {data.data.permanentQuests.length > 0 ? (
                        (() => {
                            const uniqueIds = new Set<string>(); // Ensure Set holds strings if your IDs are strings
                            return data.data.permanentQuests
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
                                        quest: Quest // Use the Quest type here as well
                                    ) => (
                                        <QuestsButton
                                            onClick={handleClick}
                                            key={quest.id}
                                            text={quest.quest_lists.name}
                                            image={`/assets/images/icons/${quest.quest_lists.image}.png`}
                                            data={{
                                                quests_id: quest.id,
                                                quests_status: quest.is_done,
                                                quests_reward: quest.quest_lists.reward,
                                                quests_url: quest.quest_lists.url_link,
                                            }}
                                        />
                                    )
                                );
                        })()
                    ) : (
                        <p>No weekly quests available.</p>
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
        </>
    );
};

export default Quests;
