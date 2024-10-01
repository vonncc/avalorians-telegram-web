import React, { useEffect, useState } from "react";
import QuestsButton from "../elements/QuestsButton";
import "@/app/styles/pages/quests.css";
import { API_ENDPOINTS } from "@/app/_globals/constants/baseUrl";

const Quests = () => {
    const [data, setData] = useState(null); // State to store fetched data
    const [loading, setLoading] = useState(true); // State to handle loading state
    // const [error, setError] = useState(null); // State to handle any errors

    useEffect(() => {
        // Define the fetch function
        const bearer_token = "asdads";
        const fetchData = async () => {
            try {
                const response = await fetch(API_ENDPOINTS.GET_AND_SYNC_QUESTS, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${bearer_token}`
                    }
                });
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const result = await response.json();
                setData(result);
            } catch (error) {
                // setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    return (
        <div className="quests-container">
            <div className="title">Daily tasks</div>
            <QuestsButton text="Watch youtube" image="/assets/images/icons/youtubeIcon.png" data={{ quests_id: "1", quests_status: false }} />
            <div className="title">Weekly tasks</div>
            <QuestsButton text="Follow us on Twitter" image="/assets/images/icons/Xsocial.png" data={{ quests_id: "2", quests_status: false }} />
            <QuestsButton text="Join our Telegram" image="/assets/images/icons/telegram2.png" data={{ quests_id: "4", quests_status: false }} />
            <div className="title">Permanent tasks</div>
            <QuestsButton text="Follow us on Twitter" image="/assets/images/icons/Xsocial.png" data={{ quests_id: "2", quests_status: false }} />
            <QuestsButton text="Join our Telegram" image="/assets/images/icons/telegram2.png" data={{ quests_id: "4", quests_status: false }} />
        </div>
    );
};

export default Quests;
